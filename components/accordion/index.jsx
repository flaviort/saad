import { useState } from 'react'
import clsx from 'clsx'

// import necessary svgs
import UxAngleDown from '@/assets/svg/ux/angle-down.svg'

// css
import styles from './accordion.module.scss'

export default function Accordion({ question, answer, noMargin }) {

	// toggle effect
	const [isActive, setIsActive] = useState(false)

	const toggle = () => {
		setIsActive((prev) => !prev)
	}

	return (
		<div className={clsx(styles.accordion, isActive && styles.active, noMargin && styles.noMargin)}>

			<div className={styles.question} onClick={toggle}>

				<h4>
					<b>
						{question}
					</b>
				</h4>

				<div className={styles.icon}>
					<UxAngleDown />
				</div>

			</div>

			<div className={styles.answer}>
				<div className={styles.inner}>
					<div dangerouslySetInnerHTML={{__html: answer}} />
				</div>
			</div>

		</div>
	)
}