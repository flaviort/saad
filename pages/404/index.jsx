// libraries
import Link from 'next/link'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

// hooks
import routes from '@/utils/routes'

// components
import Layout from '@/layout'

// svgs
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// css
import styles from './404.module.scss'

export default function FourOhFour() {
    return (
		<Layout
			bodyClass='error-404'
			pageTitle='Page not found'
			pageDescription="Oops! We've searched high and low, but unfortunately, what you're seeking seems to elude us."
		>

			<section className={styles.main}>
				<div className='container'>

					<h3 className='subtitle'>
						Error 404
					</h3>

					<h1 className='text-bigger'>
						Page not <br />
						Found
					</h1>

					<p className={styles.desc}>
						Oops! We've searched high and low, but unfortunately, what you're seeking seems to elude us.
					</p>

					<Link
						scroll={false}
						href={routes.home}
					>
						Back to home
					</Link>

				</div>
			</section>
		</Layout>
    )
}