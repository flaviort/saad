'use client'

// libraries
import { useEffect } from 'react'
import { useTranslations } from 'next-intl'

// i18n
import { Link } from '@/i18n/navigation'

// routes
import routes from '@/utils/routes'

// images
import noise from '@/assets/img/noise.gif'

// css (same look as the 404 page)
import styles from '@/views/not-found/not-found.module.scss'

type ErrorProps = {
	error: Error & { digest?: string }
	reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
	const t = useTranslations('Error')

	// keep the real error visible in the browser console / Vercel logs
	useEffect(() => {
		console.error(error)
	}, [error])

	return (
		<section className={styles.main}>

			<div
				className={styles.bg}
				style={{
					backgroundImage: `url(${noise.src})`
				}}
			></div>

			<div className='container'>
				<div className='grid-container'>
					<div className='grid-md-2-7'>

						<h1 className='font-big-2'>
							{t('title')}
						</h1>

						<p className={styles.desc}>
							{t('message')}
						</p>

						<p>
							<button type='button' onClick={reset} className='hover-underline'>
								{t('retry')}
							</button>
							{' · '}
							<Link href={routes.home} className='hover-underline'>
								{t('home')}
							</Link>
						</p>

					</div>
				</div>
			</div>
		</section>
	)
}
