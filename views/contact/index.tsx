'use client'

// libraries
import clsx from 'clsx'
import { Link } from '@/i18n/navigation'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/dist/SplitText'
gsap.registerPlugin(SplitText)

// i18n
import { useTranslations } from 'next-intl'

// components
import { useSiteEvent } from '@/components/site-events'
import Layout from '@/layout'
import { Form, Input, Select } from '@/components/form'

// svgs
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'
import UxSpinner from '@/assets/svg/ux/spinner.svg'

// css
import styles from './contact.module.scss'
import routes from '@/utils/routes'

export default function Contact() {

	const t = useTranslations('Contact')

	const scope = useRef<HTMLElement>(null)
	const introTimeline = useRef<gsap.core.Timeline>(null)

	const { contextSafe } = useGSAP(() => {
	
		new SplitText('.break-word', {
			type: 'word'
		})

		const tl = gsap.timeline({
			paused: true
		})

		introTimeline.current = tl

		gsap.set('.stagger-0', {
			opacity: 0,
			y: '5vh'
		})

		gsap.set('.stagger-1', {
			opacity: 0,
			y: '5vh'
		})

		gsap.set('.stagger-2', {
			opacity: 0,
			y: '5vh'
		})

		gsap.set('.stagger-3', {
			opacity: 0,
			y: '5vh'
		})

		tl.to('.stagger-0', {
			opacity: 1,
			y: 0,
			stagger: 0.05,
			duration: .6
		})

		tl.to('.stagger-1', {
			opacity: 1,
			y: 0,
			stagger: 0.05,
			duration: .6
		}, '-=.3')

		tl.to('.stagger-2', {
			opacity: 1,
			y: 0,
			stagger: 0.05,
			duration: .6
		}, '-=.3')

		tl.to('.stagger-3', {
			opacity: 1,
			y: 0,
			stagger: 0.05,
			duration: .6
		}, '-=.3')

	}, { scope: scope })

	// reveal the form text after the opening animation or the page curtain
	useSiteEvent('intro-done', () => contextSafe(() => {
		gsap.delayedCall(.5, () => introTimeline.current?.play())
	})())

	useSiteEvent('page-enter', () => {
		introTimeline.current?.play()
	})

    return (
		<Layout>

			<section className={clsx(styles.main, 'padding-top-bigger')} ref={scope}>
				<div className='container'>
					<div className='grid-container'>
						<div className='grid-md-2-7 grid-xl-2-6'>

							<h1 className='font-big-2 stagger-0'>
								{t('title')}
							</h1>

							<Form className={styles.form}>
								
								<div className={clsx(styles.flex, 'stagger-1 font-big-2')}>

									<p className='break-word'>
										{t('Form.text_01')}
									</p>

									<Input
										type='text'
										label='Name'
										placeholder={t('Form.label_01')}
										required
										maxLength={50}
									/>

									<p className='break-word'>
										{t('Form.text_02')}
									</p>

									<Input
										type='text'
										label='Position'
										placeholder={t('Form.label_02')}
										required
										maxLength={50}
									/>

									<p className='break-word'>
										{t('Form.text_03')}
									</p>

									<Input
										type='text'
										label='Company'
										placeholder={t('Form.label_03')}
										required
										maxLength={50}
									/>

									<p className='break-word'>
										{t('Form.text_04')}
									</p>

									<Select
										label='Employees'
										placeholder={t('Form.label_04')}
										required
									>
										<option value='' disabled>{t('Form.label_04')}</option>
										<option value='25'>25</option>
										<option value='26-50'>26-50</option>
										<option value='51-100'>51-100</option>
										<option value='101-250'>101-250</option>
										<option value='250+'>250+</option>
									</Select>

									<p className='break-word'>
										{t('Form.text_05')}
									</p>

									<Input
										type='text'
										label='Service'
										placeholder={t('Form.label_05')}
										required
										maxLength={100}
									/>

									<p className='break-word'>
										.
									</p>

								</div>

								<div className={clsx(styles.flex, 'font-big-2 stagger-2')}>

									<p className='break-word'>
										{t('Form.text_06')}
									</p>

									<Input
										type='email'
										label='Email'
										placeholder={t('Form.label_06')}
										required
										maxLength={50}
										className={styles.noTransform}
									/>

									<p className='break-word'>
										{t('Form.text_07')}
									</p>

									<Input
										type='tel'
										label='Phone'
										placeholder={t('Form.label_07')}
										required
										maxLength={40}
										className={styles.noTransform}
									/>

									<p className='break-word'>
										.
									</p>

								</div>

								<div className={clsx(styles.consent, 'font-small stagger-3')}>
									{t('Form.popup_message')}&nbsp;<Link href={routes.privacy} className='hover-underline-white'>{t('Form.popup_button')}</Link>.
								</div>
								
								<button type='submit' className={styles.submit}>
									
									<span className='submit-text font-big'>
										{t('Form.submit')} <UxArrowRight />
									</span>

									<span className={clsx(styles.spinner, 'spinner')} tabIndex={-1}>
										<UxSpinner />
									</span>

								</button>

							</Form>

						</div>
					</div>
				</div>
			</section>

		</Layout>
    )
}
