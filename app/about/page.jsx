'use client'

// libraries
import { useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// utils
import { services, awards, talks, publications } from '@/utils/about'

// components
import Layout from '@/layout'
import AnimatedLine from '@/components/utils/animated-line'
import FillTitle from '@/components/utils/fill-title'
import { FadeIn } from '@/components/utils/animations'
import ListSection from '@/components/list-section'
import LogosSlider from '@/components/logos-slider'
import ContactMarquee from '@/components/contact-marquee'

// images
import lucas from '@/assets/img/lucas.jpg'

// css
import styles from './about.module.scss'

export default function About() {

	const fadeRef1 = useRef()
	const fadeRef2 = useRef()

	useGSAP(() => {

		const fade1 = fadeRef1.current
		const fade2 = fadeRef2.current
		
		gsap.set(fade1, {
			opacity: 0,
			y: 50
		})

		gsap.set(fade2, {
			opacity: 0,
			y: 50
		})

		const tl = gsap.timeline({
			paused: true
		})

		tl.to(fade1, {
			opacity: 1,
			y: 0,
			duration: .6,
			ease: 'power1.out'
		})

		tl.to(fade2, {
			opacity: 1,
			y: 0,
			duration: .6,
			ease: 'power1.out'
		}, '-=.4')

		document.addEventListener('opening', () => {
			setTimeout(() => {
				tl.play()
			}, 600)
		})

		document.addEventListener('page-transition', () => {
			setTimeout(() => {
				tl.play()
			}, 200)
		})
	})	

    return (
		<Layout
			bodyClass='about'
			pageTitle='About'
			pageDescription='We help visionary leaders drive change and growth inside and outside your organizations in a creative and audacious way.'
		>

			<section className={clsx(styles.topPart, 'padding-top-bigger padding-bottom-big')}>
				<div className='container'>
					<div className='grid-container'>

						<div className='grid-md-2-6'>
							<h2 className='font-big-2' ref={fadeRef1}>
								We help visionary leaders drive change and growth inside and outside their organizations in creative and bold ways.
							</h2>
						</div>

						<div className='grid-md-2-5'>
							<p ref={fadeRef2}>
								We look for the uniqueness of each brand. Your authenticity. What makes you unique. Once we find it, we communicate it to the world through carefully crafted strategies, stories, design and experiences that people won't forget.<br /><br />

								We believe that impactful brands can positively change the world – and we are here to help you build them through the perfect balance between strategy, design and technology, developing unique experiences for visionary brands.
							</p>
						</div>

					</div>
				</div>
			</section>

			<ListSection
				title={services.title}
				infos={services.infos}
				small
			/>

			<LogosSlider />

			<section className={styles.about}>

				<div className={styles.bg}>
					<FadeIn>
						<Image
							src={lucas}
							alt='Lucas Saad'
							fill={true}
							sizes='
								(max-width: 575px) 100vw,
								80vw
							'
						/>
					</FadeIn>
				</div>

				<div className='container relative z2'>
					<div className='grid-container'>
						<div className={clsx(styles.content, 'grid-md-4-7 grid-xl-5-7')}>

							<h2 className='font-big-2'>
								<FillTitle text='Lucas Saad' />
							</h2>

							<p>
								Lucas Saad, founder and director of Saad, has a degree in Design from the Federal University of Santa Maria - RS and a postgraduate degree in Branding Strategic Brand Management from Universidade Positivo in Curitiba - PR, having completed part of his MBA at Brunel University in London . He also has a degree in Global Creative Leadership from THNK - The Amsterdam School of Creative Leadership.<br /><br />

								With more than 15 years of experience in Brazil and abroad, he has participated in projects with companies of the most varied sizes (from small brands to multinationals such as Dow AgroSciences and Brookfield Renewable Energy) and sectors such as technology, pharmaceutical industry, agribusiness, logistics, engineering and industry, energy, marketing and advertising, consumer goods, human resources, among others.
							</p>

						</div>
					</div>
				</div>
			</section>

			<AnimatedLine />

			<ListSection
				title={awards.title}
				infos={awards.infos}
			/>

			<AnimatedLine />

			<ListSection
				title={talks.title}
				infos={talks.infos}
			/>

			<AnimatedLine />

			<ListSection
				title={publications.title}
				infos={publications.infos}
			/>

			<AnimatedLine />

			<ContactMarquee />
			
		</Layout>
    )
}