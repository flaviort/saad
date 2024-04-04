// libraries
import clsx from 'clsx'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, EffectFade } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/effect-fade'

// components
import AnimatedLine from '@/components/utils/animated-line'

// svgs
import UxArrowLeft from '@/assets/svg/ux/arrow-left.svg'
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// css
import styles from './testimonials.module.scss'

export default function Testimonials({ testimonials }) {
    return (
        <section className={clsx(styles.testimonials, 'padding-y')}>
            <div className='container'>
                <div className={clsx(styles.grid, 'grid-container')}>
                    
                    <p className={clsx(styles.left, 'grid-md-1-3')}>
                        Testimonials
                    </p>

                    <div className={clsx(styles.right, 'grid-md-3-7')}>
                        <Swiper
                            modules={[Navigation, EffectFade]}
                            className={styles.slider}
                            spaceBetween={0}
                            loop={true}
                            slidesPerView={1}
                            navigation={{
                                nextEl: '.testimonials-arrow.next',
					            prevEl: '.testimonials-arrow.prev',
                            }}
                            grabCursor={true}
                            effect={'fade'}
                            fadeEffect= {{
                                crossFade: true
                            }}
                        >
                            {testimonials.map((item, i) => (
                                <SwiperSlide key={i} style={{opacity: 0}}>

                                    <p className={styles.company}>
                                        {item.company}
                                    </p>

                                    <p className={clsx(styles.testimonial, 'font-big')}>
                                        {item.testimonial}
                                    </p>

                                    <AnimatedLine opacity={.5} />

                                    <p className={styles.namePosition}>
                                        {item.name}<br />
                                        {item.position}
                                    </p>

                                </SwiperSlide>
                            ))}
                        </Swiper>

                        <div className={styles.arrows}>
                            
                            <button className='testimonials-arrow prev'>
                                <UxArrowLeft />
                            </button>

                            <button className='testimonials-arrow next'>
                                <UxArrowRight />
                            </button>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    )
}