// libraries
import { useEffect } from 'react'
import clsx from 'clsx'

// components
import SeoContainer from '@/components/utils/seo-container'
import AnimatedLink from '@/components/utils/animated-link'
import Fancybox from '@/components/utils/fancybox'
import Counter from '@/components/utils/counter'
import AnimatedLine from '@/components/utils/animated-line'
import FillTitle from '@/components/utils/fill-title'
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

			<section className={clsx(styles.banner, 'padding-bottom')}>
				<div className='container'>

					<div className={styles.firstSection}>
						<Fancybox options={{ dragToClose: false }}>
							<a href='#' data-fancybox='showreel'>
								
							</a>
						</Fancybox>
					</div>

					<h1>
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