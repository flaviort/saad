// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// css
import styles from './animated-line.module.scss'

export default function AnimatedLine({ dark, opacity = 1 }) {
    
    const item = useRef(null)
    const router = useRouter()

	useGSAP(() => {
        const trigger = item.current
        if (!trigger) return

        // Small delay to ensure DOM is ready after route change
        const timer = setTimeout(() => {
            gsap.to(trigger, {
                scaleX: 1,
                duration: 1,
                ease: 'power1.inOut',
                scrollTrigger: {
                    trigger: trigger,
                    scrub: 2,
                    start: 'top 100%',
                    end: 'bottom 90%'
                }
            })
        }, 150) // Slightly longer delay for AnimatedLine

        return () => clearTimeout(timer)
	}, { dependencies: [router.asPath] })

    return (
        <div
			ref={item}
			className={clsx(styles.animatedLine, dark && styles.dark)}
			style={{opacity: opacity}}
		></div>
    )
}