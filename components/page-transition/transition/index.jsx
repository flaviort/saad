// libraries
import { SwitchTransition, Transition } from 'react-transition-group'
import { useLenis } from '@studio-freight/react-lenis'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function TransitionComponent({ children }){

	const lenis = useLenis()
    const router = useRouter()

    return (
		<SwitchTransition>
			<Transition
				key={router.pathname}
				timeout={{
					enter: 0,
					exit: 2000
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
						document.dispatchEvent(new Event('page-transition'))
						window.scrollTo({ top: 0 })
						ScrollTrigger.clearScrollMemory('manual')
						lenis.start()

						setTimeout(() => {
							ScrollTrigger.refresh()	
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
						}
					})

					tl.call(function() {
						lenis.stop()
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

				{children}

			</Transition>
		</SwitchTransition>
    )
}