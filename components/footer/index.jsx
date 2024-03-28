// libraries
import clsx from 'clsx'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// routes / utils
import routes from '@/utils/routes'
import { phone, email } from '@/utils/functions'

// svgs
import Logo from '@/assets/svg/logos/logo.svg'
import UxArrowUp from '@/assets/svg/ux/arrow-up.svg'

// css
import styles from './footer.module.scss'

export default function Footer() {

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
				start: '-10% 100%',
				markers: true
			}
		})
	
		tl.from('#footer-logo svg path', {
			yPercent: 100,
			stagger: .25,
			duration: 1,
			ease: 'power2.out',
		})
	})

	return (
		<footer>
			<section className={styles.top}>
				<div className='container'>
					<div className={clsx(styles.grid, 'grid-container')}>

						<button className={styles.backToTop}>
							<UxArrowUp />
							<UxArrowUp />
						</button>

						<div className={clsx(styles.texts, 'grid-md-3-5 grid-xl-5-6')}>
							{contact_links.map((item, i) => (
								<ul className={item.ulClass} key={i}>
									{item.li.map((subItem, i2) => (
										<li key={i2}>
											<Link
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
								Curitiba, Brazil
							</p>

							<p>
								Saad® @ {new Date().getFullYear()}<br />
								All rights reserved.
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
