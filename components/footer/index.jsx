// libraries
import clsx from 'clsx'
import Link from 'next/link'
import { useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// i18n
import { useMessages } from 'next-intl'

// routes / utils
import routes from '@/utils/routes'
import { phone, email } from '@/utils/functions'

// svgs
import Logo from '@/assets/svg/logos/logo.svg'
import UxArrowUp from '@/assets/svg/ux/arrow-up.svg'

// css
import styles from './footer.module.scss'

export default function Footer() {

	const messages = useMessages()
	const lenis = useLenis()

	const scrollTop = () => {

		lenis.scrollTo(0, {
			lerp: .05
		})

		document.body.classList.add('no-pointer-events')

		setTimeout(() => {
			document.body.classList.remove('no-pointer-events')
		}, 1000)
	}

	// contact links
	const contact_links = [
		{
			ulClass: 'social',
			li: [
				{
					name: 'Linkedin',
					url: routes.linkedin,
					external: true
				},
				{
					name: 'Instagram',
					url: routes.instagram,
					external: true
				}
			]
		},
		{
			ulClass: 'contact',
			li: [
				{
					name: routes.email,
					url: email(routes.email)
				},
				{
					name: routes.phone,
					url: phone(routes.phone)
				}
			]
		}
	]

	useGSAP(() => {
		const tl = gsap.timeline({
			paused: true,
			scrollTrigger: {
				trigger: '#footer-logo',
				toggleActions: 'restart none resume none',
				start: '-10% 100%'
			}
		})
	
		tl.from('#footer-logo svg path', {
			yPercent: 100,
			stagger: .25,
			duration: 1,
			ease: 'power2.out'
		})
	})

	return (
		<footer className={styles.footer}>
			<section className={clsx(styles.top, 'padding-top-smaller')}>
				<div className='container'>
					<div className={clsx(styles.grid, 'grid-container')}>

						<button
							className={styles.backToTop}
							onClick={scrollTop}
						>
							<UxArrowUp />
							<UxArrowUp />
						</button>

						<div className={clsx(styles.texts, 'grid-md-3-5 grid-xl-5-6')}>
							{contact_links.map((item, i) => (
								<ul className={item.ulClass} key={i}>
									{item.li.map((subItem, i2) => (
										<li key={i2}>
											<Link
												scroll={false}
												href={subItem.url}
												target={subItem.external ? '_blank' : null}
												className='hover-underline'
											>
												{subItem.name}
											</Link>
										</li>    
									))}
								</ul>
							))}
						</div>

						<div className={clsx(styles.texts, 'grid-md-5-7 grid-xl-6-7')}>
							
							<p>
								Est. 2011<br />
								Curitiba, {messages.Footer.location}
							</p>

							<p>
								Saad® @ {new Date().getFullYear()}<br />
								{messages.Footer.copyright}
							</p>

						</div>

					</div>
				</div>
			</section>

			<section className={styles.bottom}>
				<div className='container'>
					<div id='footer-logo' className={styles.logo}>
						<Logo />
					</div>
				</div>
			</section>
		</footer>
	)
}
