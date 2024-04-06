// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// fadeIn effect
export function FadeIn({ children }) {

    const image = useRef()

    useGSAP(() => {
        gsap.from(image.current, {
            autoAlpha: 0,
            scrollTrigger: {
                trigger: image.current,
                start: 'top 80%',
                end: 'top 40%',
                scrub: 3
            }
        })

    })

    return (
        <div
            ref={image}
            style={{
                position: 'relative',
                width: '100%',
                height: '100%'
            }}
        >
            {children}
        </div>
    )
}

// scrolling image effect (used for images inside boxes)
export function ScrollingImage({ children }) {

    const item = useRef()

    let calcSize
    let size

    if (typeof window !== 'undefined' && window.innerWidth > 768) {
        calcSize = 'calc(100% + 7rem)'
        size = '-7rem'
    } else {
        calcSize = 'calc(100% + 3rem)'
        size = '-3rem'
    }

    useGSAP(() => {
        const children = item.current.children

        Array.from(children).forEach(child => {
            child.classList.add('cover')
        })

        gsap.set(children, {
            height: calcSize,
            display: 'block'
        })

        gsap.from(children, {
            y: size,
            scrollTrigger: {
                trigger: item.current,
                scrub: 3,
                end: 'bottom top'
            }
        })
	})

    return (
        <div
            ref={item}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            {children}
        </div>
    )
}