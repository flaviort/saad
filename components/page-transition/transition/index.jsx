// libraries
import { SwitchTransition, Transition } from 'react-transition-group'
import { useNextCssRemovalPrevention } from '@madeinhaus/nextjs-page-transition'
import { useLenis } from 'lenis/react'
import { useRouter } from 'next/router'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function TransitionComponent({ children }){

	const lenis = useLenis()
    const router = useRouter()
	const { locale } = useRouter()
	const nodeRef = useRef(null)

	// fix to avoid css removal too soon on page transition (only visible on build)
	const removeExpiredStyles = useNextCssRemovalPrevention()

	// Minimal route change handling - no scroll reset here
	useEffect(() => {
		const handleRouteChangeStart = () => {
			// Just stop Lenis to prevent scroll during transition
			lenis?.stop()
		}

		router.events.on('routeChangeStart', handleRouteChangeStart)

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart)
		}
	}, [lenis, router.events])

    return (
		<SwitchTransition>
			<Transition
				nodeRef={nodeRef}
				key={router.pathname + router.asPath + locale}
				timeout={{ enter: 3000, exit: 2000 }}
				addEndListener={(done) => {
					const node = nodeRef.current
					if (node) {
						node.addEventListener('transitionend', (e) => {
							done(e)
						}, false)
					}
				}}

				onEnter={() => {
					const tl = gsap.timeline({
						paused: true,
						onComplete: () => {
							gsap.set('[data-loader-logo], [data-loader]', {
								clearProps: true
							})
						}
					})

					// Prepare for transition - content is still hidden
					tl.call(function() {
						// Stop Lenis and reset scroll
						lenis.stop()
						window.scrollTo(0, 0)
						document.documentElement.scrollTop = 0
						document.body.scrollTop = 0
						
						if (lenis && lenis.scrollTo) {
							lenis.scrollTo(0, { immediate: true })
						}
						
						// Clear scroll memory
						ScrollTrigger.clearScrollMemory('manual')

						// Dispatch page transition event for components
						document.dispatchEvent(new Event('page-transition'))
					})

					// Exit animation - content is still hidden during this
					tl.to('[data-loader-logo]', {
						y: 50,
						duration: .7,
						ease: 'power2.inOut'
					})

					tl.to('[data-loader]', {
						clipPath: 'inset(100% 0% 0% 0%)',
						duration: .7,
						ease: 'power2.inOut'
					}, '-=.7')

					// NOW the content becomes visible and we setup the new page
					tl.call(function() {
						
						// Start Lenis again
						lenis.start()
						
						// Setup ScrollTrigger for new page
						setTimeout(() => {
							if (window.scrollY !== 0) {
								window.scrollTo(0, 0)
								if (lenis && lenis.scrollTo) {
									lenis.scrollTo(0, { immediate: true })
								}
							}
							
							// Progressive refresh strategy
							ScrollTrigger.refresh()
							
							setTimeout(() => {
								ScrollTrigger.refresh()
							}, 1000)
							
							setTimeout(() => {
								ScrollTrigger.refresh()
							}, 2500)
						}, 50)
					})

					tl.play()
				}}

				onExit={() => {
					const tl = gsap.timeline({
						paused: true,
						onComplete: () => {
							ScrollTrigger.killAll()
							removeExpiredStyles()
							const node = nodeRef.current
							if (node) {
								node.dispatchEvent(new Event('transitionend'))
							}
						}
					})

					// Start loader entrance animation first
					tl.to('[data-loader]', {
						clipPath: 'inset(0% 0% 0% 0%)',
						ease: 'power2.inOut',
						duration: 1
					})
					
					tl.from('[data-loader-logo]', {
						y: -50,
						duration: .7,
						ease: 'power2.inOut',
					}, '-=.8')

					// AFTER loader covers screen, reset scroll (hidden from user)
					tl.call(function() {
						// Now it's safe to reset scroll - user can't see it
						lenis?.stop()
						window.scrollTo(0, 0)
						document.documentElement.scrollTop = 0
						document.body.scrollTop = 0
					})
					
					tl.play()
				}}
			>
				<div ref={nodeRef}>
					{children}
				</div>
			</Transition>
		</SwitchTransition>
    )
}