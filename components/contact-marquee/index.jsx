'use client'

// libraries
import clsx from 'clsx'
import { useLenis } from '@studio-freight/react-lenis'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// components
import AnimatedLink from '@/components/utils/animated-link'

// routes / utils
import routes from '@/utils/routes'
import { debounce } from '@/utils/functions'

// svg
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// css
import styles from './contact-marquee.module.scss'

export default function ContactMarquee() {

    const directionRef = useRef(null)

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
    })

    return (
        <section className={styles.contactMarquee}>
            <div className='container'>
                <AnimatedLink href={routes.contact}>

                    <div className={clsx(styles.marquee, 'uppercase')}>
                        
                        <span className='marquee-span'>
                            Let's create the future of your brand.&nbsp;
                        </span>

                        <span className='marquee-span'>
                            Let's create the future of your brand.&nbsp;
                        </span>

                    </div>

                    <div className={clsx(styles.grid, 'grid-container')}>
                        <p className={clsx(styles.flex, 'grid-md-6-7')}>
                            Contact us
                            <UxArrowRight />
                        </p>
                    </div>

                </AnimatedLink>
            </div>
        </section>
    )
}