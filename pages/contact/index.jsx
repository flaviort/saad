// libraries
import clsx from 'clsx'

// components
import { Form, Input, Select } from '@/components/form'
import SeoContainer from '@/components/utils/seo-container'

// svgs


// css
import styles from './contact.module.scss'

export default function Contact() {

    return (
		<>
			<SeoContainer
				pageTitle='Contact'
				pageDescription='Simple, fast, and efficient. Fill out our form and get in touch with us.'
			/>

			<section className={clsx(styles.main, 'padding-top-bigger padding-bottom')}>
				<div className='container'>
					<div className='grid-container'>
						<div className='grid-md-2-7 grid-xl-2-6'>

							<p className='font-big-2'>
								Olá Saad!
							</p>

							<Form className={styles.form}>
								
								<div className={clsx(styles.flex, 'font-big')}>

									<p>
										My name is
									</p>

									<Input
										type='text'
										label='Person Name'
										placeholder='type your name'
										required
										maxLength={50}
									/>

									<p>
										and I'm currently
									</p>

									<Input
										type='text'
										label='Person Position'
										placeholder='type your position'
										required
										maxLength={50}
									/>

									<p>
										at the company
									</p>

									<Input
										type='text'
										label='Company Name'
										placeholder='company name'
										required
										maxLength={50}
									/>

									<p>
										, we have a total of
									</p>

									<Input
										type='text'
										label='How Many Employees'
										placeholder='quantity'
										required
										maxLength={10}
									/>

									<p>
										employees and my contact is related to an interest in the service of
									</p>

									<Input
										type='text'
										label='Desired Service'
										placeholder='type the service'
										required
										maxLength={30}
									/>

									<p>
										.
									</p>

								</div>

								<div className={clsx(styles.flex, 'font-big')}>

									<p>
										My corporate email is
									</p>

									<Input
										type='email'
										label='Corporate Email'
										placeholder='name@email.com'
										required
										maxLength={50}
									/>

									<p>
										and my phone is
									</p>

									<Input
										type='tel'
										label='Corporate Phone'
										placeholder='+1 (123) 456-7890'
										required
										maxLength={40}
									/>

									<p>
										.
									</p>

								</div>

							</Form>

						</div>
					</div>
				</div>
			</section>

		</>
    )
}