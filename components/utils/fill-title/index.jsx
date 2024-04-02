// libraries
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { SplitText } from 'gsap/dist/SplitText'
gsap.registerPlugin(ScrollTrigger, SplitText)

// css
import styles from './fill-title.module.scss'

export default function FillTitle({ text }) {
    
    const item = useRef(null)

	useGSAP(() => {
        if (item.current) {
            
            const split = new SplitText(item.current, {
                type: 'lines'
            })

			split.lines.forEach((target) => {
				gsap.to(target, {
					backgroundPositionX: 0,
					ease: 'none',
					scrollTrigger: {
						trigger: target,
						scrub: 3,
						start: 'top 80%',
						end: 'bottom 60%'
					}
				})
			})
        }
	}, [])

    return (
        <span ref={item} className={styles.fillTitle}>
            {text}
        </span>
    )
}