'use client'

// libraries
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { SplitText } from 'gsap/dist/SplitText'
gsap.registerPlugin(ScrollTrigger, SplitText)

// css
import styles from './fill-title.module.scss'

type FillTitleProps = {
    text: string
}

export default function FillTitle({ text }: FillTitleProps) {
    
    const item = useRef<HTMLSpanElement>(null)

	useGSAP(() => {
		const split = new SplitText(item.current, {
			type: 'lines'
		})

		gsap.to(split.lines, {
			backgroundPositionX: 0,
			ease: 'none',
			scrollTrigger: {
				trigger: split.lines,
				scrub: 3,
				start: 'top 80%',
				end: 'bottom 60%'
			}
		})
	})

    return (
        <span ref={item} className={styles.fillTitle}>
            {text}
        </span>
    )
}