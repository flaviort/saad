'use client'

// libraries
import { useState, useRef, useCallback, useEffect } from 'react'
import Vimeo, { type VimeoProps } from '@u-wave/react-vimeo'
import { useTranslations } from 'next-intl'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// components
import FollowMouse from '@/components/utils/follow-mouse'

// css
import styles from './video.module.scss'

// the player instance and error shape come from the vimeo wrapper's own types
type VimeoPlayer = Parameters<NonNullable<VimeoProps['onReady']>>[0]
type VimeoError = Parameters<NonNullable<VimeoProps['onError']>>[0]

type Timer = ReturnType<typeof setTimeout>

type VideoProps = {
    id: string
    featured?: boolean
}

// errors vimeo throws during fast play/pause switching, safe to ignore
const isInterruption = (error: unknown) => {
    const { name, message } = (error ?? {}) as { name?: string, message?: string }

    return name === 'PlayInterrupted' ||
        name === 'AbortError' ||
        name === 'NotAllowedError' ||
        Boolean(message?.includes('play() request was interrupted'))
}

export default function Video({
    id,
    featured = false
}: VideoProps) {

    const videoRef = useRef<HTMLDivElement>(null)
    const timeoutRef = useRef<Timer>(null)
    const scrollTriggerRef = useRef<ScrollTrigger>(null)
    const playerRef = useRef<VimeoPlayer>(null)
    const pendingPlayStateRef = useRef<boolean>(null)
    const isTransitioningRef = useRef(false)
    const manualOverrideRef = useRef(false)
    const manualOverrideTimeoutRef = useRef<Timer>(null)
    
    const t = useTranslations('Video')

    const [play, setPlay] = useState(false)
    const [playerError, setPlayerError] = useState(false)
    const [playerReady, setPlayerReady] = useState(false)

    const lenis = useLenis()

    // Latest safeSetPlayState, so queued retries always call the current version
    const safeSetPlayStateRef = useRef<(shouldPlay: boolean) => Promise<void>>(null)

    // Safe play state management to prevent race conditions
    const safeSetPlayState = useCallback(async (shouldPlay: boolean) => {
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
            const name = (error as { name?: string } | null)?.name

            // Handle common Vimeo errors gracefully
            if (name === 'PlayInterrupted' || name === 'AbortError' || name === 'NotAllowedError') {
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
                setTimeout(() => safeSetPlayStateRef.current?.(pendingState), 100)
            }
        }
    }, [play, playerReady, playerError])

    useEffect(() => {
        safeSetPlayStateRef.current = safeSetPlayState
    }, [safeSetPlayState])

    // Debounced play state setter to prevent rapid changes
    const debouncedSetPlay = useCallback((shouldPlay: boolean) => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current)
        }
        
        timeoutRef.current = setTimeout(() => {
            safeSetPlayState(shouldPlay)
        }, 200) // Further increased debounce time for stability
    }, [safeSetPlayState])

    // Global error handler for unhandled promise rejections from Vimeo
    useEffect(() => {
        const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
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

        scrollTriggerRef.current = ScrollTrigger.create({
            trigger: trigger,
            start: '0% 150%',
            end: '100% -50%',
            onEnter: onEnter,
            onLeave: onLeave,
            onEnterBack: onEnter,
            onLeaveBack: onLeave,
            refreshPriority: -1,
            invalidateOnRefresh: true
        })

        // Cleanup
        return () => {
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
    }, { dependencies: [lenis, debouncedSetPlay] })

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
    const handlePlayerReady = useCallback((player: VimeoPlayer) => {
        playerRef.current = player
        setPlayerReady(true)
        setPlayerError(false)
    }, [])

    // Handle Vimeo player errors
    const handlePlayerError = useCallback((error: VimeoError) => {
        // Completely ignore PlayInterrupted and related errors
        if (isInterruption(error)) {
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
                text={play ? t('pause') : t('play')}
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