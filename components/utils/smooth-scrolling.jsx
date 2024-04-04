// libraries
import { useRef } from 'react'
import { ReactLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import { useGSAP } from '@gsap/react'
gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrolling({ children }) {

    const lenisRef = useRef()

    useGSAP(() => {
        lenisRef.current?.lenis?.on('scroll', ScrollTrigger.update)

        gsap.ticker.add((time)=>{
            lenisRef.current?.lenis?.raf(time * 1000)
        })
        
        gsap.ticker.lagSmoothing(0)

        ScrollTrigger.refresh()  
    }, { dependencies: [lenisRef] })

    return (
        <ReactLenis
            root
            ref={lenisRef}
            autoRaf={false}
            options={{
                duration: 2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            }}
        >
            {children}
        </ReactLenis>
    )
}