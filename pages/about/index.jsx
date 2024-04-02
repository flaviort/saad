import Image from 'next/image'
import clsx from 'clsx'

// import routes / services
import routes from '@/utils/routes'

// components
import AnimatedLink from '@/components/utils/animated-link'
import SeoContainer from '@/components/utils/seo-container'
import ContactMarquee from '@/components/contact-marquee'

// css
import styles from './about.module.scss'

export default function About() {

    return (
		<>
			<SeoContainer
				pageTitle='About'
				pageDescription='We help visionary leaders drive change and growth inside and outside your organizations in a creative and audacious way.'
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