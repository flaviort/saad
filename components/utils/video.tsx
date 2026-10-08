'use client'

// libraries
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

type VideoProps = {
    video: string
    poster?: string
    className?: string
}

export default function Video({ video, poster, className }: VideoProps) {

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

    // preload='metadata' leaves the file alone until play() asks for it (half a screen
    // before it shows up), the poster covers the gap
    return (
        <video
            loop
            muted
            playsInline
            preload='metadata'
            poster={poster}
            ref={videoRef}
            className={className}
        >
            <source src={video} type='video/mp4' />
        </video>
    )
}
