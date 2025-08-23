// libraries
import clsx from 'clsx'
import Link from 'next/link'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// i18n
import { useMessages } from 'next-intl'

// routes / utils
import routes from '@/utils/routes'
// css
import styles from './cookies.module.scss'

export default function Cookies() {

	return (
		<aside className={styles.cookies}>
			<div className={styles.wrapper}>

				<p>
					Our website uses cookies to improve your experience. By continuing to use our site, you agree to our <Link href={routes.privacy}>Privacy Policy</Link>.
				</p>

				<div className={styles.buttons}>

					<button>
						Accept
					</button>

					<button>
						Reject
					</button>

				</div>
				
			</div>
		</aside>
	)
}
