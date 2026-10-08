'use client'

// libraries
import { ViewTransition, useEffect, useLayoutEffect, useRef, type ReactNode } from 'react'
import { usePathname } from 'next/navigation'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// components
import { useSiteEvents } from '@/components/site-events'

// css
import styles from './page-transition.module.scss'

// keep in sync with $curtain-in in atoms/view-transitions.scss
const CURTAIN_IN_MS = 1000

// the curtain only plays when the browser runs a view transition
function curtainDelay() {
    const supported = typeof document.startViewTransition === 'function'
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    return supported && !reducedMotion ? CURTAIN_IN_MS : 0
}

// a language switch remounts the whole [locale] layout, so there is no
// <ViewTransition> left for React to animate. The curtain runs by hand instead
// and finishes when the new layout mounts (or after a timeout, as a fallback).
let finishLocaleSwitch: (() => void) | null = null

export function transitionLocaleSwitch(navigate: () => void) {
    if (curtainDelay() === 0) {
        navigate()
        return
    }

    document.startViewTransition(() => new Promise<void>(resolve => {
        const timeout = setTimeout(resolve, 3000)

        finishLocaleSwitch = () => {
            clearTimeout(timeout)
            resolve()
        }

        navigate()
    }))
}

// resets scroll and scroll triggers on every navigation
function RouteEffects({ pathname }: { pathname: string }) {

    const lenis = useLenis()
    const { emit } = useSiteEvents()
    const lastPathname = useRef(pathname)
    const shouldHandOff = useRef(false)

    // disable browser's automatic scroll restoration
    useEffect(() => {
        if ('scrollRestoration' in window.history) {
            window.history.scrollRestoration = 'manual'
        }
    }, [])

    // runs inside the view transition update, before the new page's own effects
    // and before the browser captures the new snapshot, so the reset is never seen
    useLayoutEffect(() => {
        const navigated = lastPathname.current !== pathname
        const switchedLocale = finishLocaleSwitch !== null

        if (!navigated && !switchedLocale) return

        lastPathname.current = pathname
        shouldHandOff.current = true

        // the old page's animations were reverted by its own useGSAP cleanup
        if (lenis) {
            lenis.stop()
            lenis.scrollTo(0, { immediate: true, force: true })
        } else {
            window.scrollTo(0, 0)
        }

        ScrollTrigger.clearScrollMemory('manual')

        if (switchedLocale) {
            finishLocaleSwitch?.()
            finishLocaleSwitch = null
        }
    }, [pathname, lenis])

    // once the curtain covers the screen, hand control back to the new page
    useEffect(() => {
        if (!shouldHandOff.current) return

        const timers: ReturnType<typeof setTimeout>[] = []
        const later = (fn: () => void, ms: number) => timers.push(setTimeout(fn, ms))
        const delay = curtainDelay()

        later(() => {
            shouldHandOff.current = false
            lenis?.start()

            // pages play their entrance animations on this
            emit('page-enter')
        }, delay)

        // later height changes are picked up by ScrollTriggerSync
        later(() => ScrollTrigger.refresh(), delay + 50)

        return () => timers.forEach(clearTimeout)
    }, [pathname, lenis, emit])

    return null
}

export default function PageTransition({ children }: { children: ReactNode }) {

    // includes the locale prefix, so switching language also transitions
    const pathname = usePathname()

    return (
        <>
            <RouteEffects pathname={pathname} />

            {/* the curtain, painted by ::view-transition-group(page-curtain) */}
            <aside
                aria-hidden='true'
                className={styles.loader}
                style={{ viewTransitionName: 'page-curtain' }}
            />

            {/* a new key per route makes the old page exit and the new one enter */}
            <ViewTransition
                key={pathname}
                default='none'
                enter='page-enter'
                exit='page-exit'
            >
                <div>
                    {children}
                </div>
            </ViewTransition>
        </>
    )
}
