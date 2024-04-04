// libraries
import clsx from 'clsx'
import { useLenis } from '@studio-freight/react-lenis'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// css
import styles from './follow-mouse.module.scss'

export default function FollowMouse({ children, text, big, scrollTrigger }) {

    const lenis = useLenis()
    const section = useRef(null)
    const object = useRef(null)

    useGSAP(() => {
        const parent = section.current
        const item = object.current

        const middleX = item.offsetWidth / 2
        const middleY = item.offsetHeight / 2 

        gsap.set(item, {
            top: middleX * -1,
            left: middleY * -1
        })

        function moveCircle(e) {
            gsap.to(item, {
                position: 'fixed',
                x: scrollTrigger ? e.layerX : e.clientX - parent.offsetLeft,
                y: scrollTrigger ? e.layerY : e.clientY - parent.offsetTop,
                ease: 'power2.out',
                duration: .6
            })
        }

        parent.addEventListener('mousemove', moveCircle)
        parent.addEventListener('mousewheel', moveCircle)

        parent.addEventListener('mouseenter', () => {
            setTimeout(() => {
                gsap.to(item, {
                    scale: 1,
                    opacity: 1,
                    duration: .5,
                    ease: 'circ.out'
                })
            }, 100)
        })

        function leave() {
            gsap.to(item, {
                scale: 0,
                opacity: 0,
                duration: .5,
                ease: 'circ.out'
            })
        }

        parent.addEventListener('mouseleave', () => leave())
        document.addEventListener('scrollTop', leave())

    }, { dependencies: [lenis] })

    return (
        <div className={styles.followMouseSection} ref={section}>

            <div className={clsx(styles.followMouse, big && styles.big, 'font-small uppercase')} ref={object}>
                {text}
            </div>

            <div className={styles.content}>
                {children}
            </div>

        </div>
    )
}
