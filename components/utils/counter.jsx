import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Counter({number}) {

    const item = useRef(null)

    useGSAP(() => {
        gsap.from(item.current, {
            textContent: '0',
            duration: 3,
            ease: 'power2.inOut',
            modifiers: {
                textContent: value => formatNumber(value, 0)
            },
            scrollTrigger: {
                trigger: item.current,
                start: 'top 90%',
                toggleActions: 'play none none none'
            }
        })

        // format the number in US standard
        function formatNumber(value) {
            return Math.floor(+value)
        }
	})

    return (
        <span ref={item}>
            {number}
        </span>
    )
}