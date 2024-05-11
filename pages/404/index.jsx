// libraries
import { useRef } from 'react'
import Link from 'next/link'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// i18n
import { useTranslations } from 'next-intl'

// hooks
import routes from '@/utils/routes'

// components
import Layout from '@/layout'
import AnimatedLine from '@/components/utils/animated-line'
import FollowMouse from '@/components/utils/follow-mouse'

//images
import noise from '@/assets/img/noise.gif'

// css
import styles from './404.module.scss'

export default function FourOhFour() {

	const t = useTranslations('NotFound')
	const title = useRef()

	useGSAP(() => {
		const tl = gsap.timeline({
			repeat: -1
		})

		tl.from('span', {
			autoAlpha: 0,
			stagger: .5,
			duration: 2
		})

		tl.to('span', {
			autoAlpha: 0,
			stagger: .5,
			duration: 2
		}, '-=1')

	}, { scope: title })

    return (
		<Layout
			bodyClass='error-404'
			pageTitle={t('title')}
			pageDescription={t('message')}
		>

			<FollowMouse text='404'>
				<section className={styles.main}>

					<div
						className={styles.bg}
						style={{
							backgroundImage: `url(${noise.src})`
						}}
					></div>

					<div className='container'>
						<div className="grid-container">
							<div className="grid-md-2-7">

								<h1 className='font-bigger' ref={title}>
									<span>4</span>
									<span>0</span>
									<span>4</span>
								</h1>

								<p className={styles.desc}>
									<b>Oops!</b><br />
									{t('message')}
								</p>

								<Link
									scroll={false}
									href={routes.home}
									className='hover-underline'
								>
									{t('button')}
								</Link>

							</div>
						</div>
					</div>
				</section>
			</FollowMouse>

			<AnimatedLine />
			
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