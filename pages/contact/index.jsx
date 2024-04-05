// libraries
import clsx from 'clsx'
import { useRef } from 'react'
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

// css
import styles from './contact.module.scss'

export default function Contact() {

	const stagger0 = useRef()
	const stagger1 = useRef()
	const stagger2 = useRef()
	const stagger3 = useRef()

	useGSAP(() => {
		new SplitText('.break-word', {
			type: 'word'
		})

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

		document.addEventListener('opening', () => {
			setTimeout(() => {
				tl.play()	
			}, 500)
		})

		document.addEventListener('page-transition', () => {
			setTimeout(() => {
				tl.play()	
			})
		})
	})

    return (
		<>
			<SeoContainer
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
										label='Person Name'
										placeholder='type your name'
										required
										maxLength={50}
									/>

									<p className='break-word'>
										and I'm currently
									</p>

									<Input
										type='text'
										label='Person Position'
										placeholder='type your position'
										required
										maxLength={50}
									/>

									<p className='break-word'>
										at the company
									</p>

									<Input
										type='text'
										label='Company Name'
										placeholder='company name'
										required
										maxLength={50}
									/>

									<p className='break-word'>
										, we have a total of
									</p>

									<Input
										type='text'
										label='How Many Employees'
										placeholder='quantity'
										required
										maxLength={10}
									/>

									<p className='break-word'>
										employees and my contact is related to an interest in the service of
									</p>

									<Input
										type='text'
										label='Desired Service'
										placeholder='type the service'
										required
										maxLength={30}
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
										label='Corporate Email'
										placeholder='name@email.com'
										required
										maxLength={50}
									/>

									<p className='break-word'>
										and my phone is
									</p>

									<Input
										type='tel'
										label='Corporate Phone'
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
									<span className='font-big'>
										Submit form <UxArrowRight />
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