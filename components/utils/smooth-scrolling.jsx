// libraries
import { useRef } from 'react'
import { ReactLenis } from 'lenis/react'
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

        // Balanced approach - handle lazy loading but with performance in mind
        let refreshTimer
        let refreshCount = 0
        let maxRefreshes = 5 // Limited refreshes per page
        
        const throttledRefresh = () => {
            if (refreshCount >= maxRefreshes) return
            
            clearTimeout(refreshTimer)
            refreshTimer = setTimeout(() => {
                ScrollTrigger.refresh()
                refreshCount++
            }, 500) // Reasonable throttle
        }

        // Reset refresh count on page transitions
        const handlePageTransition = () => {
            refreshCount = 0 // Reset counter for new page
            maxRefreshes = 5 // Reset limit
        }
        
        document.addEventListener('page-transition', handlePageTransition)

        // Handle essential events
        window.addEventListener('resize', throttledRefresh, { passive: true })
        
        // Handle image loads but only listen to significant ones
        const handleImageLoad = (e) => {
            // Only refresh for larger images that likely affect layout
            if (e.target.naturalHeight > 200) {
                throttledRefresh()
            }
        }
        
        document.addEventListener('load', handleImageLoad, true)
        
        // One delayed refresh to catch initial layout settling
        const initialRefresh = setTimeout(() => {
            if (refreshCount < maxRefreshes) {
                ScrollTrigger.refresh()
                refreshCount++
            }
        }, 1500)

        return () => {
            if (refreshTimer) {
                clearTimeout(refreshTimer)
            }
            if (initialRefresh) {
                clearTimeout(initialRefresh)
            }
            window.removeEventListener('resize', throttledRefresh)
            document.removeEventListener('load', handleImageLoad, true)
            document.removeEventListener('page-transition', handlePageTransition)
        }
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