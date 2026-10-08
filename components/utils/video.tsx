'use client'

// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

type VideoProps = {
    video: string
    className?: string
}

export default function Video({ video, className }: VideoProps) {

    const videoRef = useRef<HTMLVideoElement>(null)

    // browsers may refuse to play (power saving, background tab), that's fine
    const play = () => {
        videoRef.current?.play().catch(() => {})
    }

    useGSAP(() => {
        ScrollTrigger.create({
            trigger: videoRef.current,
            start: '0% 150%',
            end: '100% -50%',
            onEnter: () => play(),
            onEnterBack: () => play(),
            onLeave: () => videoRef.current?.pause(),
            onLeaveBack: () => videoRef.current?.pause()
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