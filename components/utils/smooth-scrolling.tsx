'use client'

// libraries
import { useEffect, useRef, type ReactNode } from 'react'
import { ReactLenis, useLenis, type LenisRef } from 'lenis/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// keeps ScrollTrigger in sync with the smooth scroll position
function ScrollTriggerSync() {
    useLenis(ScrollTrigger.update)

    // content height changes (images loading, accordions, fonts) move every
    // trigger, so refresh once the page settles on a new height
    useEffect(() => {
        let lastHeight = document.body.scrollHeight
        let timer: ReturnType<typeof setTimeout> | undefined

        const observer = new ResizeObserver(() => {
            clearTimeout(timer)

            timer = setTimeout(() => {
                const height = document.body.scrollHeight

                if (height !== lastHeight) {
                    lastHeight = height
                    ScrollTrigger.refresh()
                }
            }, 300)
        })

        observer.observe(document.body)

        return () => {
            clearTimeout(timer)
            observer.disconnect()
        }
    }, [])

    return null
}

type SmoothScrollingProps = {
    children: ReactNode
}

export default function SmoothScrolling({ children }: SmoothScrollingProps) {

    const lenisRef = useRef<LenisRef>(null)

    // gsap's ticker drives lenis, so smooth scroll and ScrollTrigger share one clock
    useEffect(() => {
        const update = (time: number) => {
            lenisRef.current?.lenis?.raf(time * 1000)
        }

        gsap.ticker.add(update)
        gsap.ticker.lagSmoothing(0)

        return () => gsap.ticker.remove(update)
    }, [])

    return (
        <ReactLenis
            root
            ref={lenisRef}
            options={{
                autoRaf: false,
                duration: 2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            }}
        >
            <ScrollTriggerSync />
            {children}
        </ReactLenis>
    )
}
