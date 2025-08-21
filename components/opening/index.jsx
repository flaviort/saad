// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// css
import styles from './opening.module.scss'

export default function Opening(){

    const container = useRef()

    useGSAP(() => {
        const tl = gsap.timeline({
            delay: .3
        })

        tl.to('[data-line]', {
            transform: 'scaleX(1) scaleY(.01)',
            duration: 3,
            ease: 'power4.inOut'
        })

        tl.call(function() {
            setTimeout(() => {
                document.dispatchEvent(new Event('opening'))
            }, 600)
        })

        tl.to('[data-line]', {
            transform: 'scaleY(1) scaleX(1)',
            duration: 1,
            ease: 'power2.out'
        }, '+=.3')

        tl.to(container.current, {
            autoAlpha: 0,
            pointerEvents: 'none',
            ease: 'power2.inOut',
            duration: 1,
        }, '-=.3')

    }, { scope: container })

    return (
        <aside className={styles.opening} ref={container}>
            <div className={styles.line} data-line />
        </aside>
    )
}