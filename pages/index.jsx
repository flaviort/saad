// libraries
import { useEffect } from 'react'
import clsx from 'clsx'

// swiper
import { register } from 'swiper/element/bundle'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

// components
import SeoContainer from '@/components/utils/seo-container'

// css
import styles from './home.module.scss'

export default function Home() {

	const services = [
		{ name: '01' },
		{ name: '02' },
		{ name: '03' },
		{ name: '04' }
	]
	
	useEffect(() => {

		// this is needed for swiper
		register()

	}, [])

    return (
		<>

			<SeoContainer
				pageTitle='Home'
				pageDescription='Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda illo quos eius nostrum quas ipsam repellendus molestiae officia sequi est.'
			/>


			<section className={styles.banner}>
				<div className='container'>

				</div>
			</section>

			<section className={styles.services}>
				<div className='container'>
					<Swiper
						className={styles.slider}
						spaceBetween={10}
						slidesPerView={1.3}
						freeMode={true}
						mousewheel={{  
							forceToAxis: true
						}}
					>
						{services.map((item, i) => (
							<SwiperSlide key={i}>
								<div className={styles.box}>
									{ item.name }
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</section>

			<p style={{
				height: '100vh'
			}}>

			</p>

		</>
    )
}