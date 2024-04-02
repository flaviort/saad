// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// css
import styles from './animated-line.module.scss'

export default function AnimatedLine({ dark, opacity = 1 }) {
    
    const item = useRef(null)

	useGSAP(() => {
        gsap.utils.toArray(item.current).forEach(item => {
			gsap.to(item, {
				scaleX: 1,
				duration: 1,
				ease: 'power1.inOut',
				scrollTrigger: {
					trigger: item,
					scrub: 2,
					start: 'top 95%',
					end: 'bottom 70%'
				}
			})
        })
	}, [])

    return (
        <div
			ref={item}
			className={clsx(styles.animatedLine, dark && styles.dark)}
			style={{opacity: opacity}}
		></div>
    )
}