// libraries
import clsx from 'clsx'
import Link from 'next/link'
import { useLenis } from '@studio-freight/react-lenis'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// i18n
import { useMessages } from 'next-intl'

// components
import FollowMouse from '@/components/utils/follow-mouse'

// routes / utils
import routes from '@/utils/routes'
import { debounce } from '@/utils/functions'

// svg
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// css
import styles from './contact-marquee.module.scss'

export default function ContactMarquee() {

    const messages = useMessages()
    const directionRef = useRef()

    const lenis = useLenis(({direction}) => {
        if(direction < 0) {
            debounce(() => {
                gsap.to(directionRef.current, {
                    timeScale: -1
                })    
            }, 300)()
        } else {
            debounce(() => {
                gsap.to(directionRef.current, {
                    timeScale: 1
                })
            }, 300)()
        }
    })

    useGSAP(() => {

        const tl = gsap.to('.marquee-span', {
            xPercent: -100,
            duration: 20,
            ease: 'none',
            repeat: -1
        }).totalProgress(.5)

        directionRef.current = tl

    }, { dependencies: [lenis] })

    return (
        <section className={styles.contactMarquee}>
            <FollowMouse text={messages.Marquee.mouse} big>
                <div className='container padding-y-smaller'>
                    <Link scroll={false} href={routes.contact}>

                        <div className={clsx(styles.marquee, 'uppercase')}>
                            
                            <span className='marquee-span'>
                                {messages.Marquee.message}&nbsp;
                            </span>

                            <span className='marquee-span'>
                                {messages.Marquee.message}&nbsp;
                            </span>

                        </div>

                        <div className={clsx(styles.grid, 'grid-container')}>
                            <p className={clsx(styles.flex, 'grid-md-6-7')}>
                                {messages.Marquee.button}
                                <UxArrowRight />
                            </p>
                        </div>

                    </Link>
                </div>
            </FollowMouse>
        </section>
    )
}