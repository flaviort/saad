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

export default function Video({
    id,
    featured = false
}) {

    const videoRef = useRef()
    const timeoutRef = useRef()
    const scrollTriggerRef = useRef()
    const playerRef = useRef()
    const pendingPlayStateRef = useRef(null)
    const isTransitioningRef = useRef(false)
    const manualOverrideRef = useRef(false)
    const manualOverrideTimeoutRef = useRef()
    
    const [play, setPlay] = useState(false)
    const [playerError, setPlayerError] = useState(false)
    const [playerReady, setPlayerReady] = useState(false)

    const lenis = useLenis()
    const router = useRouter()

    // Safe play state management to prevent race conditions
    const safeSetPlayState = useCallback(async (shouldPlay) => {
        // If we're already transitioning, queue the request
        if (isTransitioningRef.current) {
            pendingPlayStateRef.current = shouldPlay
            return
        }

        // If player isn't ready or there's an error, just update state
        if (!playerReady || playerError || !playerRef.current) {
            setPlay(shouldPlay)
            return
        }

        // If the desired state is already current, do nothing
        if (play === shouldPlay) {
            return
        }

        try {
            isTransitioningRef.current = true
            
            // Get current player state to avoid unnecessary calls
            const currentPaused = await playerRef.current.getPaused()
            
            // Only make the call if the state actually needs to change
            if (shouldPlay && currentPaused) {
                await playerRef.current.play()
            } else if (!shouldPlay && !currentPaused) {
                await playerRef.current.pause()
            }
            
            setPlay(shouldPlay)
        } catch (error) {
            // Handle common Vimeo errors gracefully
            if (error.name === 'PlayInterrupted' || error.name === 'AbortError' || error.name === 'NotAllowedError') {
                // These are expected during rapid state changes, just update our state
                setPlay(shouldPlay)
            } else {
                console.warn('Vimeo player error:', error)
                setPlayerError(true)
            }
        } finally {
            isTransitioningRef.current = false
            
            // Process any pending state change
            if (pendingPlayStateRef.current !== null) {
                const pendingState = pendingPlayStateRef.current
                pendingPlayStateRef.current = null
                setTimeout(() => safeSetPlayState(pendingState), 100)
            }
        }
    }, [play, playerReady, playerError])

    // Debounced play state setter to prevent rapid changes
    const debouncedSetPlay = useCallback((shouldPlay) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        
        timeoutRef.current = setTimeout(() => {
            safeSetPlayState(shouldPlay)
        }, 200) // Further increased debounce time for stability
    }, [safeSetPlayState])

    // Listen for page transition events and reset video state
    useEffect(() => {
        const handlePageTransition = () => {
            // Reset all state and refs on page transition
            setPlay(false)
            setPlayerError(false)
            setPlayerReady(false)
            isTransitioningRef.current = false
            pendingPlayStateRef.current = null
            manualOverrideRef.current = false
            
            // Clear timeouts
            if (manualOverrideTimeoutRef.current) {
                clearTimeout(manualOverrideTimeoutRef.current)
            }
            
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
        setPlayerReady(false)
        isTransitioningRef.current = false
        pendingPlayStateRef.current = null
        manualOverrideRef.current = false
        
        // Clear timeouts
        if (manualOverrideTimeoutRef.current) {
            clearTimeout(manualOverrideTimeoutRef.current)
        }
    }, [router.asPath])

    // Global error handler for unhandled promise rejections from Vimeo
    useEffect(() => {
        const handleUnhandledRejection = (event) => {
            if (event.reason?.name === 'PlayInterrupted' || 
                event.reason?.message?.includes('play() request was interrupted')) {
                event.preventDefault() // Prevent the error from being logged
                return
            }
        }

        window.addEventListener('unhandledrejection', handleUnhandledRejection)
        
        return () => {
            window.removeEventListener('unhandledrejection', handleUnhandledRejection)
        }
    }, [])

    useGSAP(() => {
        const trigger = videoRef.current
        if (!trigger) return

        const onEnter = () => {
            if (!manualOverrideRef.current) {
                debouncedSetPlay(true)
            }
        }
        const onLeave = () => {
            if (!manualOverrideRef.current) {
                debouncedSetPlay(false)
            }
        }

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
                //markers: true,
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
            
            if (manualOverrideTimeoutRef.current) {
                clearTimeout(manualOverrideTimeoutRef.current)
            }
            
            if (scrollTriggerRef.current) {
                scrollTriggerRef.current.kill()
                scrollTriggerRef.current = null
            }
        }
    }, { dependencies: [lenis, debouncedSetPlay, router.asPath] }) // Include router.asPath to recreate on route changes

    // Handle manual play/pause toggle with debouncing
    const handleVideoClick = useCallback(() => {
        // Set manual override to prevent ScrollTrigger interference
        manualOverrideRef.current = true
        
        // Clear any existing timeout
        if (manualOverrideTimeoutRef.current) {
            clearTimeout(manualOverrideTimeoutRef.current)
        }
        
        // Toggle play state
        const newPlayState = !play
        safeSetPlayState(newPlayState)
        
        // Clear manual override after a delay to allow ScrollTrigger to resume control
        manualOverrideTimeoutRef.current = setTimeout(() => {
            manualOverrideRef.current = false
        }, 3000) // 3 seconds of manual control
    }, [play, safeSetPlayState])

    // Handle Vimeo player ready event
    const handlePlayerReady = useCallback((player) => {
        playerRef.current = player
        setPlayerReady(true)
        setPlayerError(false)
    }, [])

    // Handle Vimeo player errors
    const handlePlayerError = useCallback((error) => {
        // Completely ignore PlayInterrupted and related errors
        if (error.name === 'PlayInterrupted' || 
            error.name === 'AbortError' || 
            error.name === 'NotAllowedError' ||
            error.message?.includes('play() request was interrupted')) {
            return
        }
        
        console.warn('Vimeo player error:', error)
        setPlayerError(true)
        setPlayerReady(false)

        // Try to recover by resetting play state after a delay
        setTimeout(() => {
            setPlayerError(false)
            setPlay(false)
        }, 1000)
    }, [])

    return (
        <div className={styles.video}>
            <FollowMouse
                text={play ? 'Pause' : 'Play'}
                soundIcon={featured}
            >
                <div ref={videoRef} onClick={featured ? undefined : handleVideoClick}>
                    {!playerError && (
                        <Vimeo
                            video={id}
                            className={styles.player}
                            autoplay={false}
                            showByline={false}
                            showPortrait={false}
                            showTitle={false}
                            muted={true}
                            loop={true}
                            background={false}
                            controls={false}
                            responsive={true}
                            onReady={handlePlayerReady}
                            onError={handlePlayerError}
                        />
                    )}
                </div>
            </FollowMouse>
        </div>
    )
}