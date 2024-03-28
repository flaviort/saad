import Image from 'next/image'
import clsx from 'clsx'

// import routes / services
import routes from '@/utils/routes'

// components
import AnimatedLink from '@/components/utils/animated-link'
import SeoContainer from '@/components/utils/seo-container'
import MagneticButton from '@/components/utils/magnetic-button'
import ContactMarquee from '@/components/contact-marquee'

// css
import styles from './about.module.scss'

export default function About() {

    return (
		<>
			<SeoContainer
				pageTitle='About us'
				pageDescription="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nihil culpa consectetur totam adipisci deleniti qui."
			/>

			<section>
				<div className='container'>

					<h2 className='text-bigger'>
						About us
					</h2>

					<p style={{
						height: '400vh',
						backgroundColor: '#111'
					}}>
						asdasdasd
					</p>

				</div>
			</section>

			<ContactMarquee />
		</>
    )
}