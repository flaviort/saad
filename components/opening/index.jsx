'use client'

// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// svgs
import Logo from '@/assets/svg/logos/logo.svg'

// css
import styles from './opening.module.scss'

export default function Opening(){

    const container = useRef()

    useGSAP(() => {
        const tl = gsap.timeline({
            delay: .3
        })

        tl.to('svg path', {
            yPercent: -110,
            stagger: .3,
            duration: .6,
            ease: 'power2.out'
        })

        tl.call(function() {
            setTimeout(() => {
                document.dispatchEvent(new Event('opening'))
            }, 600)
        })

        tl.to('svg path', {
            yPercent: -220,
            stagger: .2,
            duration: .6,
            ease: 'power2.in'
        })

        tl.to(container.current, {
            autoAlpha: 0,
            pointerEvents: 'none',
            ease: 'power2.inOut',
            duration: 1,
        }, '-=.3')

    }, { scope: container })

    return (
        <aside className={styles.opening} ref={container}>
            <Logo />
        </aside>
    )
}