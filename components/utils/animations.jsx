// libraries
import { useRef } from 'react'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// fadeIn effect
export function FadeIn({ children }) {

    const image = useRef()
    const router = useRouter()

    useGSAP(() => {
        const trigger = image.current
        if (!trigger) return

        const timer = setTimeout(() => {
            gsap.from(trigger, {
                autoAlpha: 0,
                scrollTrigger: {
                    trigger: trigger,
                    start: 'top 80%',
                    end: 'top 40%',
                    scrub: 3
                }
            })
        }, 100)

        return () => clearTimeout(timer)
    }, { dependencies: [router.asPath] })

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
    const router = useRouter()

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
        const trigger = item.current
        if (!trigger) return

        const timer = setTimeout(() => {
            const children = trigger.children

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
                    trigger: trigger,
                    scrub: 3,
                    end: 'bottom top'
                }
            })
        }, 100)

        return () => clearTimeout(timer)
	}, { dependencies: [router.asPath] })

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