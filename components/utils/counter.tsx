'use client'

// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

type CounterProps = {
    number: string
}

export default function Counter({ number }: CounterProps) {

    const item = useRef<HTMLSpanElement>(null)

    useGSAP(() => {
        gsap.from(item.current, {
            textContent: '0',
            duration: 3,
            ease: 'power2.inOut',
            modifiers: {
                textContent: (value: string) => formatNumber(value)
            },
            scrollTrigger: {
                trigger: item.current,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        })

        // format the number in US standard
        function formatNumber(value: string) {
            return Math.floor(+value)
        }
	})

    return (
        <span ref={item}>
            {number}
        </span>
    )
}