'use client'

// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function Video({ video, className }) {

    const videoRef = useRef()

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: videoRef.current,
            start: '0% 150%',
            end: '100% -50%',
            onEnter: () => videoRef.current.play(),
            onEnterBack: () => videoRef.current.play(),
            onLeave: () => videoRef.current.pause(),
            onLeaveBack: () => videoRef.current.pause()
        })
    })
    
    return (
        <video
            loop
            muted
            playsInline
            ref={videoRef}
            className={className}
        >
            <source src={video} type='video/mp4' />
        </video>
    )
}