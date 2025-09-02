// libraries
import clsx from 'clsx'
import Link from 'next/link'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// components
import FollowMouse from '@/components/utils/follow-mouse'

// i18n
import { useMessages } from 'next-intl'

// routes / utils
import routes from '@/utils/routes'

// svg
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// css
import styles from './contact-marquee.module.scss'

export default function ContactMarquee() {

    const messages = useMessages()
    const directionRef = useRef()

    useGSAP(() => {
        const tl = gsap.to('.marquee-span', {
            xPercent: -100,
            duration: 20,
            ease: 'none',
            repeat: -1
        }).totalProgress(.5)

        directionRef.current = tl

    })

    return (
        <section className={styles.contactMarquee}>
            <FollowMouse text={messages.Marquee.mouse}>
                <div className='container padding-bottom-smaller'>
                    <Link
                        scroll={false}
                        href={routes.contact}
                    >

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