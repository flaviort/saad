// libraries
import clsx from 'clsx'
import { useRef } from 'react'
import { useRouter } from 'next/router'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { SplitText } from 'gsap/dist/SplitText'
gsap.registerPlugin(SplitText)

// components
import SeoContainer from '@/components/utils/seo-container'
import Fancybox from '@/components/utils/fancybox'
import { Form, Input } from '@/components/form'

// svgs
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'
import UxSpinner from '@/assets/svg/ux/spinner.svg'

// css
import styles from './contact.module.scss'

export default function Contact() {

	// define the bodyClass
	const bodyClass = 'contact'

	const stagger0 = useRef()
	const stagger1 = useRef()
	const stagger2 = useRef()
	const stagger3 = useRef()

	useGSAP(() => {
		setTimeout(() => {
			if (document.body.classList.contains(bodyClass)) {
	
				new SplitText('.break-word', {
					type: 'word'
				})

				document.addEventListener('opening', () => {
	
					const children0 = stagger0.current
					const children1 = stagger1.current
					const children2 = stagger2.current
					const children3 = stagger3.current
		
					const tl = gsap.timeline({
						paused: true
					})
			
					gsap.set(children0, {
						opacity: 0,
						y: '25vh'
					})
			
					gsap.set(children1, {
						opacity: 0,
						y: '25vh'
					})
			
					gsap.set(children2, {
						opacity: 0,
						y: '25vh'
					})
			
					gsap.set(children3, {
						opacity: 0,
						y: '25vh'
					})
			
					tl.to(children0, {
						opacity: 1,
						y: 0,
						stagger: 0.05,
						duration: .6
					})
			
					tl.to(children1, {
						opacity: 1,
						y: 0,
						stagger: 0.05,
						duration: .6
					}, '-=.3')
			
					tl.to(children2, {
						opacity: 1,
						y: 0,
						stagger: 0.05,
						duration: .6
					}, '-=.3')
			
					tl.to(children3, {
						opacity: 1,
						y: 0,
						stagger: 0.05,
						duration: .6
					}, '-=.3')
	
					setTimeout(() => {
						tl.play()	
					}, 500)
				})
			}
		}, 1)
	})

    return (
		<>
			<SeoContainer
				bodyClass={bodyClass}
				pageTitle='Contact'
				pageDescription='Simple, fast, and efficient. Fill out our form and get in touch with us.'
			/>

			<section className={clsx(styles.main, 'padding-top-bigger')}>
				<div className='container'>
					<div className='grid-container'>
						<div className='grid-md-2-7 grid-xl-2-6'>

							<p className='font-big-2' ref={stagger0}>
								Olá Saad!
							</p>

							<Form className={styles.form}>
								
								<div className={clsx(styles.flex, 'font-big')} ref={stagger1}>

									<p className='break-word'>
										My name is
									</p>

									<Input
										type='text'
										label='Name'
										placeholder='type your name'
										required
										maxLength={50}
									/>

									<p className='break-word'>
										and I'm currently
									</p>

									<Input
										type='text'
										label='Position'
										placeholder='type your position'
										required
										maxLength={50}
									/>

									<p className='break-word'>
										at the company
									</p>

									<Input
										type='text'
										label='Company'
										placeholder='company name'
										required
										maxLength={50}
									/>

									<p className='break-word'>
										, we have a total of
									</p>

									<Input
										type='text'
										label='Employees'
										placeholder='quantity'
										required
										maxLength={10}
									/>

									<p className='break-word'>
										employees and my contact is related to an interest in the service of
									</p>

									<Input
										type='text'
										label='Service'
										placeholder='type the service'
										required
										maxLength={100}
									/>

									<p className='break-word'>
										.
									</p>

								</div>

								<div className={clsx(styles.flex, 'font-big')} ref={stagger2}>

									<p className='break-word'>
										My corporate email is
									</p>

									<Input
										type='email'
										label='Email'
										placeholder='name@email.com'
										required
										maxLength={50}
									/>

									<p className='break-word'>
										and my phone is
									</p>

									<Input
										type='tel'
										label='Phone'
										placeholder='+1 (123) 456-7890'
										required
										maxLength={40}
									/>

									<p className='break-word'>
										.
									</p>

								</div>

								<div className={clsx(styles.consent, 'font-small')} ref={stagger3}>
									By clicking the “Submit form” button, I agree to&nbsp;<Fancybox><a className='hover-underline-white' href='#' data-fancybox>consent</a></Fancybox>.
								</div>
								
								<button type='submit' className={styles.submit}>
									
									<span className='submit-text font-big'>
										Submit form <UxArrowRight />
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

		</>
    )
}