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

	// Additional safeguard: Reset scroll on route change
	useEffect(() => {
		const handleRouteChangeStart = () => {
			// Immediate scroll reset when route starts changing
			window.scrollTo(0, 0)
			document.documentElement.scrollTop = 0
			document.body.scrollTop = 0
		}

		const handleRouteChangeComplete = () => {
			// Final scroll reset when route change is complete
			setTimeout(() => {
				window.scrollTo(0, 0)
				document.documentElement.scrollTop = 0
				document.body.scrollTop = 0
				
				if (lenis && lenis.scrollTo) {
					lenis.scrollTo(0, { immediate: true })
				}
			}, 100)
		}

		router.events.on('routeChangeStart', handleRouteChangeStart)
		router.events.on('routeChangeComplete', handleRouteChangeComplete)

		return () => {
			router.events.off('routeChangeStart', handleRouteChangeStart)
			router.events.off('routeChangeComplete', handleRouteChangeComplete)
		}
	}, [lenis, router.events])

    return (
		<SwitchTransition>
			<Transition
				nodeRef={nodeRef}
				key={router.pathname + router.asPath + locale}
				//timeout={{ enter: 10, exit: 2500 }}
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

					tl.call(function() {
						// Multiple scroll reset strategies to ensure it always works
						
						// 1. Stop Lenis first to prevent interference
						lenis.stop()
						
						// 2. Force immediate scroll reset
						window.scrollTo(0, 0)
						document.documentElement.scrollTop = 0
						document.body.scrollTop = 0
						
						// 3. Reset Lenis scroll position
						if (lenis && lenis.scrollTo) {
							lenis.scrollTo(0, { immediate: true })
						}
						
						// 4. Clear scroll memory
						ScrollTrigger.clearScrollMemory('manual')
						
						// 5. Dispatch page transition event
						document.dispatchEvent(new Event('page-transition'))
						
						// 6. Start Lenis again after a small delay
						setTimeout(() => {
							lenis.start()
							
							// 7. Final scroll position check and correction
							setTimeout(() => {
								if (window.scrollY !== 0) {
									window.scrollTo(0, 0)
									if (lenis && lenis.scrollTo) {
										lenis.scrollTo(0, { immediate: true })
									}
								}
								
								// Enhanced refresh strategy for new page content
								ScrollTrigger.refresh()
								
								// Additional refresh after content likely loads (for lazy images)
								setTimeout(() => {
									ScrollTrigger.refresh()
								}, 1000)
								
								// Final refresh after images have had time to load
								setTimeout(() => {
									ScrollTrigger.refresh()
								}, 2500)
							}, 50)
						}, 10)
					})

					tl.to('[data-loader-logo', {
						y: 50,
						duration: .7,
						ease: 'power2.inOut'
					})

					tl.to('[data-loader]', {
						clipPath: 'inset(100% 0% 0% 0%)',
						duration: .7,
						ease: 'power2.inOut'
					}, '-=.7')

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

					tl.call(function() {
						// Early scroll reset during exit to prepare for next page
						lenis.stop()
						window.scrollTo(0, 0)
						document.documentElement.scrollTop = 0
						document.body.scrollTop = 0
					})

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