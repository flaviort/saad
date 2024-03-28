import { useRef } from 'react'

// gsap related imports
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ScrollingImage ({ children }) {

    const item = useRef(null)

    useGSAP(() => {
        if (item.current) {
            const children = item.current.children

            Array.from(children).forEach(child => {
                child.classList.add('cover')
            })

            gsap.set(children, {
                height: '115%',
                display: 'block'
            })

            gsap.to(children, {
                yPercent: -10,
                scrollTrigger: {
                    trigger: item.current,
                    scrub: 3,
                    end: 'bottom top'
                }
            })
        }
	})

    return (
        <div ref={item} className='cover'>
            {children}
        </div>
    )
}