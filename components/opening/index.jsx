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

        tl.from('[data-loader-logo] svg path', {
            y: '120%',
            duration: 1,
            ease: 'power4.inOut',
            stagger: .5
        })

        tl.call(function() {
            setTimeout(() => {
                document.dispatchEvent(new Event('opening'))
            }, 100)
        })

        tl.to('[data-loader-logo] svg path', {
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

    return (
        <aside className={styles.opening} ref={container}>
            <div data-loader-logo className={styles.loaderLogo}>
                <Logo />
            </div>
        </aside>
    )
}