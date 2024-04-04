// libraries
import { useRef } from 'react'
import { useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// fadeIn effect
export function FadeIn({ children }) {

    const lenis = useLenis()
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

    }, { dependencies: [lenis] })

    return (
        <div
            ref={image}
            style={{
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
    const lenis = useLenis()

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
	}, { dependencies: [lenis]})

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

// stagger up effect
export function StaggerUp(props) {
    
    const lenis = useLenis()
    const item = useRef()

	useGSAP(() => {
        const children = item.current.children

        gsap.set(children, {
            opacity: 0,
            y: '25vh'
        })

        ScrollTrigger.batch(children, {
            start: '-50% 100%',
            onEnter: elements => {
                gsap.to(elements, {
                    opacity: 1,
                    y: 0,
                    stagger: 0.25,
                    duration: 1
                })
            }
        })
	}, { dependencies: [lenis]})

    return (
        <div ref={item} {...props} data-stagger>
            {props.children}
        </div>
    )
}