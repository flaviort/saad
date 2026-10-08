'use client'

// libraries
import clsx from 'clsx'
import { Link } from '@/i18n/navigation'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// components
import FollowMouse from '@/components/utils/follow-mouse'

// i18n
import { useTranslations } from 'next-intl'

// routes / utils
import routes from '@/utils/routes'

// svg
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// css
import styles from './contact-marquee.module.scss'

export default function ContactMarquee() {

    const t = useTranslations('Marquee')
    const section = useRef<HTMLElement>(null)

    // endless scroll of the two copies, scoped to this section
    useGSAP(() => {
        gsap.to('.marquee-span', {
            xPercent: -100,
            duration: 20,
            ease: 'none',
            repeat: -1
        }).totalProgress(.5)
    }, { scope: section })

    return (
        <section ref={section} className={styles.contactMarquee}>
            <FollowMouse text={t('mouse')}>
                <div className='container padding-bottom-smaller'>
                    <Link
                        scroll={false}
                        href={routes.contact}
                    >

                        <div className={clsx(styles.marquee, 'uppercase')}>
                            
                            <span className='marquee-span'>
                                {t('message')}&nbsp;
                            </span>

                            <span className='marquee-span'>
                                {t('message')}&nbsp;
                            </span>

                        </div>

                        <div className={clsx(styles.grid, 'grid-container')}>
                            <p className={clsx(styles.flex, 'grid-md-6-7')}>
                                {t('button')}
                                <UxArrowRight />
                            </p>
                        </div>

                    </Link>
                </div>
            </FollowMouse>
        </section>
    )
}