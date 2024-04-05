// libraries
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// svgs
import Logo from '@/assets/svg/logos/logo.svg'

// css
import styles from './page-transition.module.scss'

export const PageTransitionAnimation = ({ href }) => {

    const router = useRouter()
    const [hasAnimated, setHasAnimated] = useState(false)

    const lenis = useLenis()

    useEffect(() => {
        const animationWrapper = document.getElementById('loader')
    
        if (animationWrapper && !hasAnimated) {

            const pageOut = gsap.timeline()
            const pageIn = gsap.timeline({
                paused: true,
                onComplete: () => {

                    // clear all props
                    gsap.set('.loader-logo, #loader', {
                        clearProps: true
                    })

                    // restart lenis and remove the 'no-scroll' class from the body
                    lenis.start()
                    document.body.classList.remove('no-scroll')

                    // reset ScrollTrigger
                    ScrollTrigger.clearScrollMemory('manual')
                    ScrollTrigger.refresh()
                }
            })

            // page OUT animation
            pageOut.call(function() {

                // stop lenis and add the class 'no-scroll' to the body
                lenis.stop()
                document.body.classList.add('no-scroll')
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
            })

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
        }
    }, [href, router, hasAnimated, lenis])
    
    return null
}

export default function PageTransition() {

    const router = useRouter()

    useEffect(() => {
        const refreshScrollTrigger = () => {
            document.dispatchEvent(new Event('page-transition'))
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