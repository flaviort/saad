'use client'

// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import NextLink from 'next/link'
import { Link } from '@/i18n/navigation'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// i18n
import { useTranslations } from 'next-intl'

// routes / utils
import routes from '@/utils/routes'

// svgs
import Logo from '@/assets/svg/logos/logo.svg'
import UxArrowUp from '@/assets/svg/ux/arrow-up.svg'

// css
import styles from './footer.module.scss'

export default function Footer() {

	const t = useTranslations('Footer')
	const lenis = useLenis()

	// lock keeps the user from fighting the scroll until it reaches the top
	const scrollTop = () => {
		lenis?.scrollTo(0, {
			lerp: .05,
			lock: true
		})
	}

	// contact links
	const social = [
		{
			name: 'Linkedin',
			url: routes.linkedin
		},
		{
			name: 'Instagram',
			url: routes.instagram
		}
	]

	// logo letters rise in when the footer scrolls into view
	const logoRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		const tl = gsap.timeline({
			paused: true,
			scrollTrigger: {
				trigger: logoRef.current,
				toggleActions: 'restart none resume none',
				start: '-10% 100%'
			}
		})

		// scoped to the logo by useGSAP
		tl.from('svg path', {
			yPercent: 100,
			stagger: .25,
			duration: 1,
			ease: 'power2.out'
		})
	}, { scope: logoRef })

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

							<ul className={styles.social}>
								{social.map((item, i) => (
									<li key={i}>
										<NextLink
											href={item.url}
											target='_blank'
											className='hover-underline'
										>
											{item.name}
										</NextLink>
									</li>    
								))}
							</ul>

							<ul className={styles.contact}>
								<li>
									<Link
										scroll={false}
										href={routes.privacy}
										className='hover-underline'
									>
										{t('privacy')}
									</Link>
								</li>    
							</ul>

						</div>

						<div className={clsx(styles.texts, 'grid-md-5-7 grid-xl-6-7')}>
							
							<p>
								Est. 2011<br />
								Curitiba, {t('location')}
							</p>

							<p>
								Saad® @ {new Date().getFullYear()}<br />
								{t('copyright')}
							</p>

						</div>

					</div>
				</div>
			</section>

			<section className={styles.bottom}>
				<div className='container'>
					<div ref={logoRef} className={styles.logo}>
						<Logo />
					</div>
				</div>
			</section>
		</footer>
	)
}
