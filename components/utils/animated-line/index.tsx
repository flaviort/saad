'use client'

// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// css
import styles from './animated-line.module.scss'

type AnimatedLineProps = {
    dark?: boolean
    opacity?: number
}

export default function AnimatedLine({ dark, opacity = 1 }: AnimatedLineProps) {
    
    const item = useRef<HTMLDivElement>(null)

	useGSAP(() => {
        gsap.to(item.current, {
            scaleX: 1,
            duration: 1,
            ease: 'power1.inOut',
            scrollTrigger: {
                trigger: item.current,
                scrub: 2,
                start: 'top 100%',
                end: 'bottom 90%'
            }
        })
	})

    return (
        <div
			ref={item}
			className={clsx(styles.animatedLine, dark && styles.dark)}
			style={{opacity: opacity}}
		></div>
    )
}