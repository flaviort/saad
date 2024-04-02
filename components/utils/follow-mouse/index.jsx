// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// svgs
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'
import OthersViewProject from '@/assets/svg/others/view-project.svg'

// css
import styles from './follow-mouse.module.scss'

export default function FollowMouse({ children }) {

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
                x: e.clientX - parent.offsetLeft,
                y: e.clientY - parent.offsetTop,
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

        parent.addEventListener('mouseleave', () => {
            gsap.to(item, {
                scale: 0,
                opacity: 0,
                duration: .5,
                ease: 'circ.out'
            })
        })

    })

    return (
        <div className={styles.followMouseSection} ref={section}>

            <div className={clsx(styles.followMouse, 'font-small')} ref={object}>

                <OthersViewProject />

                <div className={styles.inner}>
                    <UxArrowRight />
                </div>

            </div>

            <div className={styles.content}>
                {children}
            </div>

        </div>
    )
}
