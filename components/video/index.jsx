// libraries
import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/router'
import Vimeo from '@u-wave/react-vimeo'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// components
import FollowMouse from '@/components/utils/follow-mouse'

// css
import styles from './video.module.scss'

export default function Video({ id, sound }) {

    const videoRef = useRef()
    const timeoutRef = useRef()
    const scrollTriggerRef = useRef()
    const [play, setPlay] = useState(false)
    const [playerError, setPlayerError] = useState(false)

    const lenis = useLenis()
    const router = useRouter()

    // Debounced play state setter to prevent rapid changes
    const debouncedSetPlay = useCallback((shouldPlay) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        
        timeoutRef.current = setTimeout(() => {
            setPlay(shouldPlay)
            setPlayerError(false) // Reset error state when changing play state
        }, 100) // 100ms debounce
    }, [])

    // Listen for page transition events and reset video state
    useEffect(() => {
        const handlePageTransition = () => {
            // Reset video state on page transition
            setPlay(false)
            setPlayerError(false)
            
            // Kill existing ScrollTrigger if it exists
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill()
                scrollTriggerRef.current = null
            }
        }

        // Listen for the page transition event dispatched by your transition component
        document.addEventListener('page-transition', handlePageTransition)

        return () => {
            document.removeEventListener('page-transition', handlePageTransition)
        }
    }, [])

    // Also handle route changes as backup
    useEffect(() => {
        setPlay(false)
        setPlayerError(false)
    }, [router.asPath])

    useGSAP(() => {
        const trigger = videoRef.current
        if (!trigger) return

        const onEnter = () => debouncedSetPlay(true)
        const onLeave = () => debouncedSetPlay(false)

        // Kill any existing ScrollTrigger for this component
        if (scrollTriggerRef.current) {
            scrollTriggerRef.current.kill()
            scrollTriggerRef.current = null
        }

        // Small delay to ensure DOM is ready after route change
        const createTimer = setTimeout(() => {
            // Create new ScrollTrigger instance
            scrollTriggerRef.current = ScrollTrigger.create({
                trigger: trigger,
                start: '0% 150%',
                end: '100% -50%',
                onEnter: onEnter,
                onLeave: onLeave,
                onEnterBack: onEnter,
                onLeaveBack: onLeave,
                markers: true,
                refreshPriority: -1,
                invalidateOnRefresh: true
            })

            // Force refresh to ensure correct positioning
            ScrollTrigger.refresh()
        }, 100)

        // Cleanup
        return () => {
            clearTimeout(createTimer)
            
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
            }
            
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill()
                scrollTriggerRef.current = null
            }
        }
    }, { dependencies: [lenis, debouncedSetPlay, router.asPath] }) // Include router.asPath to recreate on route changes

    // Handle manual play/pause toggle with debouncing
    const handleVideoClick = useCallback(() => {
        debouncedSetPlay(!play)
    }, [play, debouncedSetPlay])

    // Handle Vimeo player errors
    const handlePlayerError = useCallback((error) => {
        console.warn('Vimeo player error:', error)
        setPlayerError(true)

        // Try to recover by resetting play state after a delay
        setTimeout(() => {
            setPlayerError(false)
            setPlay(false)
        }, 1000)
    }, [])

    const handleSoundClick = useCallback(() => {
        console.log('sound')
    }, [])

    return (
        <div className={styles.video}>
            <FollowMouse text={play ? 'Pause' : 'Play'} >
                <div ref={videoRef} onClick={handleVideoClick}>
                    {!playerError && (
                        <>

                            {sound && (
                                <div className={styles.sound}>
                                    <button onClick={handleSoundClick}>
                                        Enable Sound
                                    </button>
                                </div>
                            )}

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
                                onError={handlePlayerError}
                            />
                        </>
                    )}
                </div>
            </FollowMouse>
        </div>
    )
}