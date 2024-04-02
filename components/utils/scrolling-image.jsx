// libraries
import { useRef } from 'react'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function ScrollingImage ({ children }) {

    const item = useRef(null)

    let calcSize
    let size

    if (typeof window !== 'undefined' && window.innerWidth > 768) {
        calcSize = 'calc(100% + 10rem)'
        size = '-10rem'
    } else {
        calcSize = 'calc(100% + 5rem)'
        size = '-5rem'
    }

    useGSAP(() => {
        if (item.current) {
            const children = item.current.children

            Array.from(children).forEach(child => {
                child.classList.add('cover')
            })

            gsap.set(children, {
                height: calcSize,
                display: 'block'
            })

            gsap.to(children, {
                y: size,
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