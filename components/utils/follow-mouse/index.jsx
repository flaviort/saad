// libraries
import clsx from 'clsx'
import { useLenis } from 'lenis/react'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// css
import styles from './follow-mouse.module.scss'

export default function FollowMouse({
    children,
    text,
    big,
    scrollTrigger,
    soundIcon = false
}) {

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
                {soundIcon ? (
                    <svg width='22' height='18' viewBox='0 0 22 18' xmlns='http://www.w3.org/2000/svg'><path d='M9.08789 0.0106656C9.33734 -0.0198641 9.59044 0.00517665 9.8291 0.0839078L9.94727 0.127853L10.0615 0.179611C10.2861 0.292618 10.4828 0.454268 10.6377 0.652267L10.7119 0.754806L10.7783 0.862228C10.9228 1.11714 10.9995 1.40569 11 1.70012V16.2968L10.9951 16.4228C10.9738 16.7158 10.8777 16.9994 10.7139 17.245C10.5266 17.5257 10.2599 17.7447 9.94824 17.8739C9.63644 18.0032 9.29294 18.0366 8.96191 17.9706C8.6309 17.9047 8.32634 17.7427 8.08789 17.5038L4.7041 14.1181C4.66679 14.0806 4.62214 14.0505 4.57324 14.0302C4.52435 14.0099 4.47186 13.9998 4.41895 13.9999H2C1.46957 13.9999 0.96101 13.7891 0.585938 13.414C0.210873 13.0389 0 12.5304 0 11.9999V5.99992C7.4505e-06 5.4695 0.210871 4.96093 0.585938 4.58586C0.961009 4.2108 1.46957 3.99992 2 3.99992H4.41895C4.47186 4.00008 4.52435 3.9899 4.57324 3.96965C4.62214 3.94939 4.66679 3.9193 4.7041 3.88176L8.09082 0.496017C8.32922 0.258169 8.63258 0.0957767 8.96289 0.0301968L9.08789 0.0106656ZM2 11.9999H4.41602C4.73258 11.9994 5.04639 12.0614 5.33887 12.1825C5.63129 12.3037 5.8967 12.4818 6.12012 12.706L9 15.5859V2.41399L6.12012 5.29387C5.89671 5.51808 5.6313 5.69614 5.33887 5.81731C5.04639 5.93846 4.73258 5.99949 4.41602 5.99895L2 5.99992V11.9999Z M15 8.99995C15 8.13447 14.7195 7.29195 14.2002 6.59956C13.869 6.15774 13.9586 5.53148 14.4004 5.20015C14.8422 4.86891 15.4685 4.95857 15.7998 5.40034C16.5787 6.43889 17 7.7018 17 8.99995C17 10.2981 16.5787 11.561 15.7998 12.5996C15.4685 13.0413 14.8422 13.131 14.4004 12.7998C13.9586 12.4684 13.869 11.8422 14.2002 11.4003C14.7195 10.708 15 9.86543 15 8.99995Z M19.9997 9.00021C19.9997 7.94973 19.7933 6.90922 19.3913 5.93869C18.9893 4.96807 18.3998 4.08585 17.657 3.34298C17.2664 2.95246 17.2664 2.31945 17.657 1.92892C18.0475 1.5384 18.6805 1.5384 19.071 1.92892C19.9996 2.85751 20.7364 3.9598 21.239 5.17306C21.7415 6.38632 21.9997 7.68699 21.9997 9.00021C21.9997 10.3132 21.7414 11.6133 21.239 12.8264C20.7364 14.0396 19.9996 15.1429 19.071 16.0715C18.6806 16.4617 18.0474 16.4617 17.657 16.0715C17.2664 15.681 17.2664 15.047 17.657 14.6565C18.3997 13.9137 18.9893 13.0322 19.3913 12.0617C19.7934 11.0912 19.9997 10.0507 19.9997 9.00021Z'/></svg>
                ) : (
                    text
                )}
            </div>

            <div className={styles.content}>
                {children}
            </div>

        </div>
    )
}
