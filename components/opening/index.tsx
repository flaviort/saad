'use client'

// libraries
import { useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// components
import { useSiteEvents } from '@/components/site-events'

// svgs
import Logo from '@/assets/svg/logos/logo.svg'

// css
import styles from './opening.module.scss'

// the intro plays once per visit, even if the layout remounts (language switch)
let hasPlayed = false

export default function Opening(){

    const container = useRef<HTMLElement>(null)
    const [isDone] = useState(() => hasPlayed)
    const { emit } = useSiteEvents()

    useGSAP(() => {
        if (isDone) return

        hasPlayed = true

        const tl = gsap.timeline({
            delay: .3
        })

        // selector strings are scoped to the container by useGSAP
        tl.from('svg path', {
            y: '120%',
            duration: 1,
            ease: 'power4.inOut',
            stagger: .5
        })

        // let the pages start their entrance a beat after the logo lands
        tl.call(() => {
            gsap.delayedCall(.1, () => emit('intro-done'))
        })

        tl.to('svg path', {
            opacity: 0,
            duration: .3,
            ease: 'power4.inOut',
            stagger: .1
        })

        tl.to(container.current, {
            autoAlpha: 0,
            pointerEvents: 'none',
            ease: 'power2.inOut',
            duration: 1,
        }, '-=.3')

    }, { scope: container })

    if (isDone) return null

    return (
        <aside className={styles.opening} ref={container}>
            <div className={styles.loaderLogo}>
                <Logo />
            </div>
        </aside>
    )
}