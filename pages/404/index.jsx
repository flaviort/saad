// libraries
import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

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
			pageTitle='Page not found'
			pageDescription="Oops! We've searched high and low, but unfortunately, what you're seeking seems to elude us."
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

								<h1 className='text-bigger' ref={title}>
									<span>4</span>
									<span>0</span>
									<span>4</span>
								</h1>

								<p className={styles.desc}>
									Oops! <br />
									We've searched high and low, but unfortunately, what you're seeking seems to elude us.
								</p>

								<Link
									scroll={false}
									href={routes.home}
									className='hover-underline'
								>
									Back home
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