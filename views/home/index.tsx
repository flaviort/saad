'use client'

// libraries
import { useRef } from 'react'
import { Link } from '@/i18n/navigation'
import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// i18n
import { useMessages, useTranslations } from 'next-intl'

// components
import { useSiteEvent } from '@/components/site-events'
import Layout from '@/layout'
import Video from '@/components/utils/video'
import VideoLightbox from '@/components/video-lightbox'
import Counter from '@/components/utils/counter'
import AnimatedLine from '@/components/utils/animated-line'
import FollowMouse from '@/components/utils/follow-mouse'
import Project from '@/components/project'
import StandFor from '@/components/stand-for'
import Testimonials from '@/components/testimonials'
import ContactMarquee from '@/components/contact-marquee'

// routes / utils / hooks
import routes from '@/utils/routes'
import { vh } from '@/utils/functions'
import { slugify } from '@/utils/functions'

// svgs
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'
import OthersImpactfulTailoredBrands from '@/assets/svg/others/impactful-tailored-brands.svg'

// types
import type { ProjectsResponse } from '@/types/wordpress'

// css
import styles from './home.module.scss'

type HomeProps = {
	data: ProjectsResponse
}

export default function Home({ data }: HomeProps) {

	const t = useTranslations('Home')
	const tVideo = useTranslations('Video')

	// scroll trigger pin effect
	const bannerRef = useRef<HTMLElement>(null)
	const videoRef = useRef<HTMLAnchorElement>(null)
	const titleRef = useRef<HTMLHeadingElement>(null)
	
	const { contextSafe } = useGSAP(() => {

		const banner = bannerRef.current
		const video = videoRef.current
		const title = titleRef.current

		ScrollTrigger.create({
			pin: title,
			trigger: banner,
			start: 'top bottom',
			end: '+=' + vh(210), // this value should be the same as the padding-bottom on home.module.scss
			scrub: 3,
			anticipatePin: 1,
			pinSpacing: false // remove the padding-bottom (we need to setup this manually)
		})

		gsap.from(video, {
			scale: .1,
			scrollTrigger: {
				anticipatePin: 1,
				trigger: banner,
				start: 'top bottom',
				end: '+=' + vh(50),
				scrub: 3
			}
		})

	})

	// title entrance after the intro (first visit) or the page curtain (navigation)
	useSiteEvent('intro-done', () => contextSafe(() => {
		gsap.fromTo(titleRef.current, {
			yPercent: 100
		}, {
			yPercent: 0,
			duration: 2,
			ease: 'power2.out'
		})
	})())

	useSiteEvent('page-enter', () => contextSafe(() => {
		gsap.from(titleRef.current, {
			yPercent: 50,
			duration: 1.5,
			ease: 'power2.out'
		})
	})())

	// counters
	const counters = [
		{
			number: '14',
			text: t('Counters.first')
		}, {
			number: '16',
			text: t('Counters.second')
		}, {
			number: '18',
			text: t('Counters.third')
		}, {
			number: '50',
			text: t('Counters.fourth')
		}
	]

	// testimonials live in the message files (Home.Testimonials)
	const { Home: { Testimonials: testimonials } } = useMessages()

    return (
		<Layout>

			<section className={clsx(styles.banner, 'padding-bottom')} ref={bannerRef}>
				<div className='container'>

					<div className={styles.firstSection}>
					
						<VideoLightbox videoId='875961835' label='Showreel' className={styles.video} ref={videoRef}>
							<FollowMouse text={tVideo('play')} scrollTrigger>

								<div className={styles.play}>
									{tVideo('play')}
								</div>

								<Video
									video='/videos/showreel.mp4'
									poster='/videos/showreel-poster.jpg'
									className='cover'
								/>

							</FollowMouse>
						</VideoLightbox>
						
					</div>

					<h1 ref={titleRef}>
						<span className='sr-only'>{t('pageTitle')}</span>
						<OthersImpactfulTailoredBrands aria-hidden='true' />
					</h1>

				</div>
			</section>

			<section className={styles.projects}>
				<FollowMouse text={t('view')}>
					{data && data.edges && data.edges.slice(0, 3).map((edge, i) => (
						<Project
							key={i}
							link={'/work/' + slugify(edge.node.title)}
							image={edge.node.featuredImage?.node?.sourceUrl}
							darkText={edge.node.projects?.darkText || false}
							title={edge.node.projects?.title}
							subtitle={edge.node.projects?.subtitle}
							category={edge.node.projects?.category}
							tags={edge.node.projects?.tags?.map(tag => tag.tag) || []}
						/>
					))}
				</FollowMouse>

				<Link
					scroll={false}
					href={routes.work}
					className={clsx(styles.viewAll, 'padding-y-smaller', 'font-medium')}
				>
					{t('viewAll')} <UxArrowRight />
				</Link>

				<AnimatedLine />

			</section>

			<section className={clsx(styles.counters, 'padding-top')}>
				<div className='container'>
					<div className={clsx(styles.grid, 'grid-container')}>

						<p className={clsx(styles.left, 'grid-md-1-3')}>
							{t('whoWeAre')}
						</p>

						<div className={clsx(styles.right, 'grid-md-3-7')}>
							{counters.map((item, i) => (
								<div className={styles.box} key={i}>
									
									<p className={clsx(styles.number, 'font-biggest')}>
										<Counter number={item.number} />
										{i === counters.length - 1 && (
											<span>+</span>
										)}
									</p>

									<p className={clsx(styles.text, 'font-medium')}>
										{item.text}
									</p>

									<div className={styles.line} />

								</div>
							))}
						</div>

					</div>
				</div>

				<AnimatedLine />
				
			</section>

			<StandFor />

			<Testimonials testimonials={testimonials} />

			<ContactMarquee />

		</Layout>
    )
}
