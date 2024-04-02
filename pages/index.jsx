// libraries
import { useRef } from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// components
import SeoContainer from '@/components/utils/seo-container'
import AnimatedLink from '@/components/utils/animated-link'
import Fancybox from '@/components/utils/fancybox'
import Counter from '@/components/utils/counter'
import AnimatedLine from '@/components/utils/animated-line'
import FollowMouse from '@/components/utils/follow-mouse'
import Project from '@/components/project'
import StandFor from '@/components/stand-for'
import Testimonials from '@/components/testimonials'
import ContactMarquee from '@/components/contact-marquee'

// routes / utils
import projects from '@/utils/projects'
import routes from '@/utils/routes'

// svgs
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'
import OthersImpactfulTailoredBrands from '@/assets/svg/others/impactful-tailored-brands.svg'

// css
import styles from './home.module.scss'

export default function Home() {

	// scrolltrigger pin effect
	const banner = useRef(null)
	const video = useRef(null)
	const title = useRef(null)

	const vh = (coef) => window.innerHeight * (coef/100)
	
	useGSAP(() => {
		ScrollTrigger.create({
			pin: title.current,
			trigger: banner.current,
			start: 'top bottom',
			end: '+=' + vh(210), // this value should be the same as the padding-bottom on home.module.scss
			scrub: 3,
			anticipatePin: 1,
			pinSpacing: false // remove the padding-bottom (we need to setup this manually)
		})

		gsap.from(video.current, {
			scale: .1,
			scrollTrigger: {
				anticipatePin: 1,
				trigger: banner.current,
				start: 'top bottom',
				end: '+=' + vh(50),
				scrub: 3
			}
		})

		document.addEventListener('opening', () => {
			gsap.from(title.current, {
				yPercent: 100,
				duration: 2,
				ease: 'power2.out'
			})
		})
	})

	// counters
	const counters = [
		{
			number: '13',
			text: 'years of branding experience'
		}, {
			number: '16',
			text: 'national and international awards'
		}, {
			number: '18',
			text: 'talks and events in Brazil and abroad'
		}, {
			number: '50',
			text: 'publications online and offline'
		}
	]

    return (
		<>

			<SeoContainer
				pageTitle='Impactful Tailored Brands'
				pageDescription='Saad® is an internationally award-winning boutique brand consultancy specialized in building and transforming the future of businesses.'
			/>

			<section className={clsx(styles.banner, 'padding-bottom')} ref={banner}>
				<div className='container'>

					<div className={styles.firstSection}>
					
						<Fancybox options={{ dragToClose: false }}>
							<a href='https://vimeo.com/875961835' data-fancybox='showreel' className={styles.video} ref={video}>
								<FollowMouse text='Play' big scrollTrigger>

									<div className={styles.play}>
										Play
									</div>

									<video loop muted autoPlay playsInline className='cover'>
										<source src='/videos/showreel.mp4' type='video/mp4' />
									</video>

								</FollowMouse>
							</a>
						</Fancybox>
						
					</div>

					<h1 ref={title}>
						<OthersImpactfulTailoredBrands />
					</h1>

				</div>
			</section>

			<section className={styles.projects}>
				<FollowMouse text='View'>
					{projects.slice(0, 3).map((item, i) => (
						<Project
							key={i}
							link={item.link}
							image={item.image}
							darkText={item.darkText}
							client={item.client}
							title={item.title}
							category={item.category}
							tags={item.tags}
						/>
					))}
				</FollowMouse>

				<AnimatedLink className={clsx(styles.viewAll, 'padding-y-smaller', 'font-medium')} href={routes.work}>
					View all projects <UxArrowRight />
				</AnimatedLink>

				<AnimatedLine />

			</section>

			<section className={clsx(styles.counters, 'padding-top')}>
				<div className='container'>
					<div className={clsx(styles.grid, 'grid-container')}>

						<p className={clsx(styles.left, 'grid-md-1-3')}>
							Who we are
						</p>

						<div className={clsx(styles.right, 'grid-md-3-7')}>
							{counters.map((item, i) => (
								<div className={styles.box} key={i}>
									
									<p className={clsx(styles.number, 'font-biggest')}>
										<Counter number={item.number} />
									</p>

									<p className={clsx(styles.text, 'font-medium')}>
										{item.text}
									</p>

									<AnimatedLine opacity={.5} />

								</div>
							))}
						</div>

					</div>
				</div>
			</section>

			<StandFor />

			<Testimonials />

			<ContactMarquee />

		</>
    )
}