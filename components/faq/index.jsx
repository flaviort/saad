import { useState } from 'react'
import clsx from 'clsx'

// svgs
import UxAngleDown from '@/assets/svg/ux/angle-down.svg'

// css
import styles from './faq.module.scss'

export default function Faq() {

	const questions = [
		{
			question: 'Lorem ipsum dolor sit amet consectetur adipisicing elit?',
			answer: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium illo natus cum odio labore recusandae non molestias sequi consequatur officiis vel voluptatibus corrupti soluta repellendus dolorem deserunt, alias possimus quasi!'
		}, {
			question: 'Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore dignissimos tenetur?',
			answer: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti consequatur repellat magnam tempora porro natus quibusdam velit tempore id quae possimus doloremque iusto perspiciatis corporis nisi, tenetur nobis accusantium non ipsam nihil repudiandae quis est obcaecati. Iusto perferendis non unde.'
		}, {
			question: 'Lorem ipsum dolor sit amet?',
			answer: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Consequatur, fuga modi. Quasi odit eveniet alias aspernatur possimus sed sunt doloribus recusandae placeat dolores voluptatem necessitatibus in rerum cumque, dolor ab.'
		}
	]

	return (
		<section className={styles.faq}>
			<div className='container'>

				<div className={styles.top}>

					<h3 className='subtitle'>
						Faqs
					</h3>

					<h2 className='text-bigger'>
						Frequently Asked Questions
					</h2>

					<p>
						Discover frequently asked questions about our services. For further details, feel free to reach out to us. We're here to streamline your experience.
					</p>

				</div>

				<div className={styles.questions}>
					{questions.map((item, i) => (
						<Question
							key={i}
							question={item.question}
							answer={item.answer}
						/>
					))}
				</div>

			</div>
		</section>
	)
}

export const Question = ({ question, answer }) => {

	const [isActive, setIsActive] = useState(false)

	const toggle = () => {
		setIsActive((prev) => !prev)
	}

	return (
		<div className={clsx(styles.item, isActive && styles.active)}>
							
			<div className={styles.question} onClick={toggle}>

				<div className='text-medium medium'>
					{question}
				</div>

				<UxAngleDown />

			</div>

			<div className={styles.answer}>
				<div>
					<div>
						{answer}
					</div>
				</div>
			</div>

		</div>
	)
}