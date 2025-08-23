// libraries
import { useRef } from 'react'
import Image from 'next/image'
import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// i18n
import { useTranslations } from 'next-intl'

// components
import Layout from '@/layout'
import { FadeIn } from '@/components/utils/animations'
import ListSection from '@/components/list-section'
import LogosSlider from '@/components/logos-slider'
import ContactMarquee from '@/components/contact-marquee'

// images
import lucas from '@/assets/img/lucas.jpg'

// css
import styles from './about.module.scss'

export default function About({ services, awards, talks, publications }) {

	const t = useTranslations('About')
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
			pageTitle={t('pageTitle')}
			pageDescription={t('pageDescription')}
		>

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

								{t('TopSection.text_02')}
							</p>
						</div>

					</div>
				</div>
			</section>

			<ListSection
				title={services.title}
				infos={services.infos}
				small
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

export async function getStaticProps({ locale }) {
	const messages = await import(`../../i18n/${locale}.json`).then(m => m.default)

	const services = {
		title: messages.About.Services.title,
		infos: messages.About.Services.Sub_item.map(category => ({
			subTitle: category.sub_title,
			items: category.items
		}))
	}
  
	const awards = {
		title: messages.About.Awards.title,
		infos: messages.About.Awards.Sub_item.map(category => ({
			subTitle: category.sub_title,
			items: category.items.map(item => ({
				year: item.year,
				text: item.text
			}))
		}))
	}

	const talks = {
		title: messages.About.Talks.title,
		infos: messages.About.Talks.Sub_item.map(category => ({
			subTitle: category.sub_title,
			items: category.items.map(item => ({
				year: item.year,
				text: item.text
			}))
		}))
	}

	const publications = {
		title: messages.About.Publications.title,
		infos: messages.About.Publications.Sub_item.map(category => ({
			subTitle: category.sub_title,
			items: category.items.map(item => ({
				year: item.year,
				text: item.text
			}))
		}))
	}

	return {
		props: {
			messages,
			services,
			awards,
			talks,
			publications
		}
	}
}