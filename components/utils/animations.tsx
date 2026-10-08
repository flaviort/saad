'use client'

// libraries
import { useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

type WrapperProps = {
    children: ReactNode
}

// fadeIn effect
export function FadeIn({ children }: WrapperProps) {

    const image = useRef<HTMLDivElement>(null)

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

// scrolling image effect (used for images inside boxes): the image is taller
// than its box and drifts as the box scrolls through the viewport
export function ScrollingImage({ children }: WrapperProps) {

    const box = useRef<HTMLDivElement>(null)
    const image = useRef<HTMLDivElement>(null)

    useGSAP(() => {
        const mm = gsap.matchMedia()

        mm.add({
            desktop: '(min-width: 769px)',
            mobile: '(max-width: 768px)'
        }, (context) => {
            const offset = context.conditions?.desktop ? '7rem' : '3rem'

            gsap.set(image.current, {
                height: `calc(100% + ${offset})`
            })

            gsap.from(image.current, {
                y: `-${offset}`,
                scrollTrigger: {
                    trigger: box.current,
                    scrub: 3,
                    end: 'bottom top'
                }
            })
        })
    })

    return (
        <div
            ref={box}
            style={{
                width: '100%',
                height: '100%',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <div ref={image} className='cover'>
                {children}
            </div>
        </div>
    )
}
