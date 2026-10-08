'use client'

// libraries
import { useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// i18n
import { useTranslations } from 'next-intl'

// components
import { useSiteEvent } from '@/components/site-events'
import Layout from '@/layout'
import { FadeIn } from '@/components/utils/animations'
import ListSection, { type ListSectionData } from '@/components/list-section'
import LogosSlider from '@/components/logos-slider'
import ContactMarquee from '@/components/contact-marquee'

// images
import lucas from '@/assets/img/lucas.jpg'

// css
import styles from './about.module.scss'

type AboutProps = {
	services: ListSectionData
	awards: ListSectionData
	talks: ListSectionData
	publications: ListSectionData
}

export default function About({ services, awards, talks, publications }: AboutProps) {

	const t = useTranslations('About')
	const fadeRef1 = useRef<HTMLHeadingElement>(null)
	const fadeRef2 = useRef<HTMLParagraphElement>(null)
	const introTimeline = useRef<gsap.core.Timeline>(null)

	const { contextSafe } = useGSAP(() => {

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

		introTimeline.current = tl

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

	})

	// fade the intro text in after the opening animation or the page curtain
	useSiteEvent('intro-done', () => contextSafe(() => {
		gsap.delayedCall(.6, () => introTimeline.current?.play())
	})())

	useSiteEvent('page-enter', () => contextSafe(() => {
		gsap.delayedCall(.2, () => introTimeline.current?.play())
	})())

    return (
		<Layout>

			<section className={clsx(styles.topPart, 'padding-top-bigger padding-bottom-big')}>
				<div className='container'>
					<div className='grid-container'>

						<div className='grid-md-2-6'>
							<h2 className='font-big-2' ref={fadeRef1}>
								{t('TopSection.title')}
							</h2>
						</div>

						<div className='grid-md-2-5'>
							<p ref={fadeRef2}>
								{t('TopSection.text_01')}<br /><br />

								{t('TopSection.text_02')}<br /><br />

								{t('TopSection.text_03')}
							</p>
						</div>

					</div>
				</div>
			</section>

			<ListSection
				title={services.title}
				infos={services.infos}
				noScroll
			/>

			<LogosSlider />

			<section className={styles.about}>

				<div className={styles.bg}>
					<FadeIn>
						<Image
							src={lucas}
							alt='Lucas Saad'
							fill
							sizes='
								(max-width: 575px) 100vw,
								80vw
							'
							quality={90}
						/>
					</FadeIn>
				</div>

				<div className='container relative z2'>
					<div className='grid-container'>
						<div className={clsx(styles.content, 'grid-md-4-7 grid-xl-5-7')}>

							<h2 className='font-big-2'>
								Lucas Saad
							</h2>

							<p>
								{t('About.text_01')}<br /><br />

								{t('About.text_02')}
							</p>

						</div>
					</div>
				</div>
			</section>

			<div className={styles.line} />

			<ListSection
				title={awards.title}
				infos={awards.infos}
				noScroll
			/>

			<div className={styles.line} />

			<ListSection
				title={talks.title}
				infos={talks.infos}
				noScroll
			/>

			<div className={styles.line} />

			<ListSection
				title={publications.title}
				infos={publications.infos}
				noScroll
			/>

			<div className={styles.line} />

			<ContactMarquee />
			
		</Layout>
    )
}
