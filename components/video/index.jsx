// libraries
import { useState, useRef } from 'react'
import Vimeo from '@u-wave/react-vimeo'
import { useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// components
import FollowMouse from '@/components/utils/follow-mouse'

// css
import styles from './video.module.scss'

export default function Video({ id }) {

    const videoRef = useRef()
    const [play, setPlay] = useState(false)

    const lenis = useLenis()

    useGSAP(() => {
        const trigger = videoRef.current
        const onEnter = () => setPlay(true)
        const onLeave = () => setPlay(false)

        ScrollTrigger.create({
            trigger: trigger,
            start: '0% 150%',
            end: '100% -50%',
            onEnter: onEnter,
            onLeave: onLeave,
            onEnterBack: onEnter,
            onLeaveBack: onLeave
        })
    }, { dependencies: [lenis] })

    return (
        <div className={styles.video}>
            <FollowMouse text={play ? 'Pause' : 'Play'} >
                <div ref={videoRef} onClick={() => { setPlay(!play) }}>
                    <Vimeo
                        video={id}
                        className={styles.player}
                        autoplay={false}
                        showByline={false}
                        showPortrait={false}
                        showTitle={false}
                        muted={true}
                        loop={true}
                        paused={!play}
                        background={false}
                        controls={false}
                        responsive={true}
                    />
                </div>
            </FollowMouse>
        </div>
    )
}