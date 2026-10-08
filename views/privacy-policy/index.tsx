'use client'

// libraries
import { useRef, type ReactNode } from 'react'
import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// i18n
import { useLocale, useTranslations, type Locale } from 'next-intl'

// components
import { useSiteEvent } from '@/components/site-events'
import Layout from '@/layout'
import ContactMarquee from '@/components/contact-marquee'

// content
import PrivacyPolicyEn from './content/en'
import PrivacyPolicyPt from './content/pt'

// css
import styles from './privacy-policy.module.scss'

// the legal text for each language
const policyText: Record<Locale, () => ReactNode> = {
	en: PrivacyPolicyEn,
	pt: PrivacyPolicyPt
}

export default function PrivacyPolicy() {

	const t = useTranslations('PrivacyPolicy')
	const locale = useLocale()
	const PolicyText = policyText[locale]
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
								{t('TopSection.text')}
							</p>
						</div>

					</div>
				</div>
			</section>

			<section className={styles.mainContent}>
				<div className='container padding-top padding-bottom-big'>
					<div className='grid-container'>
						<div className='grid-md-2-6'>

							<div className={styles.content}>
								<PolicyText />
							</div>
						</div>
					</div>
				</div>
			</section>

			<div className={styles.line} />

			<ContactMarquee />
			
		</Layout>
    )
}
