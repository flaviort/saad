// libraries
import clsx from 'clsx'
import Link from 'next/link'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/dist/SplitText'
gsap.registerPlugin(SplitText)

// i18n
import { useTranslations } from 'next-intl'

// components
import Layout from '@/layout'
import Fancybox from '@/components/utils/fancybox'
import { Form, Input, Select } from '@/components/form'

// svgs
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'
import UxSpinner from '@/assets/svg/ux/spinner.svg'

// css
import styles from './contact.module.scss'
import routes from '@/utils/routes'

export default function Contact() {

	const t = useTranslations('Contact')

	const scope = useRef()

	useGSAP(() => {
	
		new SplitText('.break-word', {
			type: 'word'
		})

		const tl = gsap.timeline({
			paused: true
		})

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

		document.addEventListener('opening', () => {
			setTimeout(() => {
				tl.play()	
			}, 500)
		})

		document.addEventListener('page-transition', () => {
			tl.play()	
		})
	}, { scope: scope })

    return (
		<Layout
			bodyClass='contact'
			pageTitle={t('pageTitle')}
			pageDescription={t('pageDescription')}
		>

			<section className={clsx(styles.main, 'padding-top-bigger')} ref={scope}>
				<div className='container'>
					<div className='grid-container'>
						<div className='grid-md-2-7 grid-xl-2-6'>

							<p className='font-big-2 stagger-0'>
								{t('title')}
							</p>

							<Form className={styles.form}>
								
								<div className={clsx(styles.flex, 'stagger-1 font-big')}>

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
										required
									>
										<option value='' disabled>{t('Form.label_04')}</option>
										<option value='1-10'>1-10</option>
										<option value='10-25'>10-25</option>
										<option value='25-50'>25-50</option>
										<option value='50-100'>50-100</option>
										<option value='100+'>100+</option>
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

								<div className={clsx(styles.flex, 'font-big stagger-2')}>

									<p className='break-word'>
										{t('Form.text_06')}
									</p>

									<Input
										type='email'
										label='Email'
										placeholder={t('Form.label_06')}
										required
										maxLength={50}
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

export async function getStaticProps({ locale }) {
	return {
	  	props: {
			messages: (await import(`../../i18n/${locale}.json`)).default
	  	}
	}
}