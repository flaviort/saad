// libraries
import { useRef } from 'react'
import { useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

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