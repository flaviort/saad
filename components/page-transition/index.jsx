// libraries
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useRecoilState } from 'recoil'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// routes / utils
import { pageTransitionState } from '@/utils/atoms'

// svgs
import Logo from '@/assets/svg/logos/logo.svg'

// css
import styles from './page-transition.module.scss'

export const PageTransitionAnimation = ({ href }) => {

    const router = useRouter()
    const [hasAnimated, setHasAnimated] = useState(false)
    const [pageTransition, setPageTransition] = useRecoilState(pageTransitionState)

    useEffect(() => {
        const animationWrapper = document.getElementById('loader')
    
        if (animationWrapper && !hasAnimated) {

            const pageOut = gsap.timeline()
            const pageIn = gsap.timeline({
                paused: true,
                onComplete: () => {

                    // clear all props
                    gsap.set('.loader-logo, #loader, #website-wrapper', {
                        clearProps: true
                    })

                    // restart lennis and remove the 'no-scroll' class from the body
                    setPageTransition(false)

                    // reset ScrollTrigger
                    ScrollTrigger.clearScrollMemory('manual')
                    ScrollTrigger.refresh()
                }
            })

            // page OUT animation
            pageOut.call(function() {

                // stop lennis and add the class 'no-scroll' to the body
                setPageTransition(true)
            })

            pageOut.to('#website-wrapper', {
                y: 50,
                duration: 1,
                ease: 'power1.inOut',
            })

            pageOut.to('#loader', {
                clipPath: 'inset(0% 0% 0% 0%)',
                ease: 'power2.inOut',
                duration: 1,
                onComplete: () => {
                    router.push(href) // navigate to the next page

                    // wait for the route change to happen before doing something
                    router.events.on('routeChangeComplete', () => {
                        window.scrollTo({ top: 0 }) // always scroll to the top of the page
                        pageIn.play() // play the animation in
                    })
                }
            }, '-=1')

            pageOut.from('.loader-logo', {
                y: -50,
                duration: .7,
                ease: 'power2.inOut',
            }, '-=.8')

            // page IN animation
            pageIn.to('.loader-logo', {
                y: 50,
                duration: .7,
                ease: 'power2.inOut',
            })

            pageIn.to('#loader', {
                clipPath: 'inset(100% 0% 0% 0%)',
                duration: .7,
                ease: 'power2.inOut',
                onComplete: () => {
                    setHasAnimated(true) // restart the animation
                }
            }, '-=.7')

            pageIn.from('#website-wrapper', {
                y: -70,
                duration: 1,
                ease: 'power2.inOut',
            }, '-=.9')

        }
    }, [href, router, hasAnimated, setPageTransition])
    
    return null
}

export default function PageTransition() {

    const router = useRouter()

    useEffect(() => {
        const refreshScrollTrigger = () => {
            ScrollTrigger.refresh()
        }

        router.events.on('routeChangeComplete', refreshScrollTrigger);

        return () => {
            router.events.off('routeChangeComplete', refreshScrollTrigger);
        };    
    }, [router])

    return (
        <aside id='loader' className={styles.loader}>
    
            <div className={clsx(styles.loaderBg, 'loader-bg')}></div>

            <div className={clsx(styles.loaderLogo, 'loader-logo')}>
                <Logo />
            </div>

        </aside>
    )
}