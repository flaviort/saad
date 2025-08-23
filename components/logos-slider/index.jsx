// libraries
import clsx from 'clsx'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'

// css
import styles from './logos-slider.module.scss'

export default function LogosSlider() {

    const logos = [
        {
            src: '/img/clients/9-6.svg',
            alt: '9-6'
        }, {
            src: '/img/clients/belas-shopping.svg',
            alt: 'Belas Shopping'
        }, {
            src: '/img/clients/braskem.svg',
            alt: 'Braskem'
        }, {
            src: '/img/clients/brookfield.svg',
            alt: 'Brookfield'
        }, {
            src: '/img/clients/coca-cola.svg',
            alt: 'Coca Cola'
        }, {
            src: '/img/clients/dow.svg',
            alt: 'Dow'
        }, {
            src: '/img/clients/governo-de-angola.svg',
            alt: 'Governo de Angola'
        }, {
            src: '/img/clients/governo-de-mato-grosso-do-sul.svg',
            alt: 'Governo de Mato Grosso'
        }, {
            src: '/img/clients/liquigas.svg',
            alt: 'Liquigás | Petrobrás'
        }, {
            src: '/img/clients/maianga-filmes.svg',
            alt: 'Maianga Filmes'
        }, {
            src: '/img/clients/ministerio-da-agricultura.svg',
            alt: 'Ministério da Agricultura'
        }, {
            src: '/img/clients/ministerio-da-saude.svg',
            alt: 'Ministério da Saúde'
        }, {
            src: '/img/clients/nastek.svg',
            alt: 'Nastek'
        }, {
            src: '/img/clients/ogilvy.svg',
            alt: 'Ogilvy'
        }, {
            src: '/img/clients/oigo.svg',
            alt: 'Oigo'
        }, {
            src: '/img/clients/parana.svg',
            alt: 'Paraná | Governo do Estado'
        }, {
            src: '/img/clients/privia.svg',
            alt: 'Privia'
        }, {
            src: '/img/clients/re.svg',
            alt: 'RE | Rethink'
        }, {
            src: '/img/clients/sementes-ipiranga.svg',
            alt: 'Sementes Ipiranga'
        }, {
            src: '/img/clients/vuelo.svg',
            alt: 'Vuelo'
        }
    ]

    return (
        <section className={clsx(styles.logosSlider, 'padding-bottom')}>
            <div className='container'>
                <div className='grid-container'>
                    <div className='grid-md-2-7'>
                        <Swiper
                            modules={[FreeMode, Autoplay]}
                            className={styles.slider}
                            spaceBetween={40}
                            slidesPerView={3}
                            allowTouchMove={true}
                            loop={true}
                            grabCursor={true}
                            freeMode={true}
                            autoplay={{ delay: 3000, disableOnInteraction: false }}
                            speed={600}
                            breakpoints={{
                                575: {
                                    slidesPerView: 3,
                                    spaceBetween: 40
                                }, 768: {
                                    slidesPerView: 4,
                                    spaceBetween: 40
                                },
                                992: {
                                    slidesPerView: 4,
                                    spaceBetween: 50
                                },
                                1201: {
                                    slidesPerView: 5,
                                    spaceBetween: 60
                                }
                            }}
                        >
                            {logos.map((item, i) => (
                                <SwiperSlide key={i}>
                                    <Image
                                        alt={item.alt}
                                        src={item.src}
                                        fill
                                        sizes='
                                            (max-width: 575px) 33vw,
                                            (max-width: 992px) 25vw,
                                            20vw
                                        '
                                    />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </section>
    )
}