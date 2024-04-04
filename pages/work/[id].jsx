// libraries
import clsx from 'clsx'
import Image from 'next/image'
import { useRef } from 'react'
import { useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// routes / utils
import routes from '@/utils/routes'

// components
import SeoContainer from '@/components/utils/seo-container'
import AnimatedLink from '@/components/utils/animated-link'
import FollowMouse from '@/components/utils/follow-mouse'
import AnimatedLine from '@/components/utils/animated-line'
import { ScrollingImage } from '@/components/utils/animations'
import Video from '@/components/video'
import ListSection from '@/components/list-section'
import Testimonials from '@/components/testimonials'
import ContactMarquee from '@/components/contact-marquee'

// css
import styles from './work-inner.module.scss'
import FillTitle from '@/components/utils/fill-title'

export default function WorkInner() {

    const lenis = useLenis()
    const bannerRef = useRef()

    // banner animation
    useGSAP(() => {
        gsap.to('.bg img', {
            autoAlpha: .1,
            scale: 1.1,
            scrollTrigger: {
                trigger: bannerRef.current,
                start: 'top top',
                anticipatePin: true,
                pin: '.bg',
                end: 'bottom top',
                scrub: true,
                pinSpacing: false
            }
        })
    }, { scope: bannerRef, dependencies: [lenis] })

    // banner
    const banner = {
        src: '/img/projects/nagueva/banner.jpg',
        alt: 'Nagüeva'
    }

    // project details
    const projectDetails = {
        title: 'Nagüeva',
        subTitle: 'Making the brand personal.',
        category: 'Personal Branding',
        tags: ['Visual Identity', 'Strategy']
    }

    // awards
    const awards = {
		title: 'Awards',
		infos: [
			{
				items: [
					{
						text: 'Bienal Iberoamericana de Diseño, BID. Espanha.'
					}
                ]
            }
        ]
    }

    // credits
    const credits = {
		title: 'Credits',
		infos: [
			{
				items: [
					{
						text: 'Gabriel Leon | UX Designer'
					}, {
                        text: 'Flávio R. Troszczanczuk | Developer'
                    }, {
                        text: 'Jhonny Jessé | Copywriter & SEO'
                    }
                ]
            }
        ]
    }

    // testimonials
    const testimonials = [
        {
            company: 'Nagüeva',
            testimonial: "At various times – many of them difficult –, I revisited the strategy to support my decisions and remember my medium and long-term goals. It's no exaggeration to say that I wouldn't be living in the Netherlands and working at Philips Design if it weren't for Saad's excellent work.",
            name: 'Guilherme Nagüeva',
            position: 'Philips Design'
        }, {
            company: 'Nagüeva',
            testimonial: "One thing that really surprised me was the fact that the same strategy that worked in Brazil also worked here in the Netherlands, dealing with a global team and a much bigger mission.",
            name: 'Guilherme Nagüeva',
            position: 'Philips Design'
        }
    ]

    return (
        <>

            <SeoContainer
				pageTitle={projectDetails.title}
				pageDescription={projectDetails.subTitle}
			/>

            <section className={styles.banner} ref={bannerRef}>
                <FollowMouse text='Scroll'>

                    <div className={clsx(styles.bg, 'bg')}>
                        <Image
                            src={banner.src}
                            alt={banner.alt}
                            priority
                            fill
                            quality={100}
                            className='cover'
                        />
                    </div>

                    <div className={clsx(styles.container, 'container')}>
                        <div className={clsx(styles.grid, 'grid-container')}>
                            <div className='grid-md-5-7'>

                            </div>
                        </div>
                    </div>

                </FollowMouse>
            </section>

            <section className={clsx(styles.projectDetails, 'padding-y-small')}>
                <div className='container'>
                    <div className={clsx(styles.grid, 'grid-container')}>

                        <div className='grid-md-1-3 grid-xl-1-4'>
                            
                            <h1 className={styles.title}>
                                {projectDetails.title}
                            </h1>

                            <h2 className='font-big'>
                                <FillTitle text={projectDetails.subTitle} />
                            </h2>

                        </div>

                        <div className='grid-md-4-5 grid-xl-5-6'>
                            <p className={styles.category}>
                                {projectDetails.category}
                            </p>
                        </div>

                        <div className='grid-md-5-7 grid-xl-6-7'>
                            <p className={styles.tags}>
                                {projectDetails.tags.map((tag, i) => (
                                    <span key={i}>
                                        {tag}
                                    </span>
                                ))}
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <AnimatedLine />

            {awards && (
                <>
                    <ListSection
                        title={awards.title}
                        infos={awards.infos}
                        singleColumn
                        noScroll
                    />

                    <AnimatedLine />
                </>
            )}

            {credits && (
                <>
                    <ListSection
                        title={credits.title}
                        infos={credits.infos}
                        singleColumn
                        noScroll
                    />

                    <AnimatedLine />
                </>
            )}

            <section className={styles.gallery}>

                <div className={styles.image}>
                    <ScrollingImage>
                        <Image
                            src='/img/projects/nagueva/01.jpg'
                            alt='Nagüeva'
                            fill
                            className='cover'
                        />
                    </ScrollingImage>
                </div>

                <div className={styles.image}>
                    <ScrollingImage>
                        <Image
                            src='/img/projects/nagueva/02.jpg'
                            alt='Nagüeva'
                            fill
                            className='cover'
                        />
                    </ScrollingImage>
                </div>

                <div className={styles.video}>
                    <Video
                        className='video'
                        id='385588398'
                    />
                </div>

                <div className={styles.image}>
                    <ScrollingImage>
                        <Image
                            src='/img/projects/nagueva/03.jpg'
                            alt='Nagüeva'
                            fill
                            className='cover'
                        />
                    </ScrollingImage>
                </div>

                <div className={styles.image}>
                    <ScrollingImage>
                        <Image
                            src='/img/projects/nagueva/04.jpg'
                            alt='Nagüeva'
                            fill
                            className='cover'
                        />
                    </ScrollingImage>
                </div>

            </section>

            {testimonials && (
                <>
                    <Testimonials testimonials={testimonials} />
                    <AnimatedLine />
                </>
            )}

            <section className={clsx(styles.previousNext, 'padding-top')}>
                
                <div className='container'>
                    <div className={styles.top}>

                        <AnimatedLink className={styles.link} href={routes.workInner('inner')}>
                            
                            <span className={clsx(styles.small, 'font-small')}>
                                Previous
                            </span>

                            <span className='font-big'>
                                Oigo
                            </span>

                        </AnimatedLink>

                        <AnimatedLink className={styles.link} href={routes.workInner('inner')}>
                            
                            <span className={clsx(styles.small, 'font-small')}>
                                Next
                            </span>

                            <span className='font-big'>
                                Vuelo
                            </span>

                        </AnimatedLink>

                    </div>
                </div>

                <div className={styles.bottom}>
                    <FollowMouse text='View'>
                        <div className={styles.flex}>

                            <AnimatedLink className={styles.link} href={routes.workInner('inner')}>
                                <ScrollingImage>
                                    <Image
                                        src='/img/projects/oigo.jpg'
                                        alt='Oigo'
                                        fill
                                        className='cover'
                                    />
                                </ScrollingImage>
                            </AnimatedLink>

                            <AnimatedLink className={styles.link} href={routes.workInner('inner')}>
                                <ScrollingImage>
                                    <Image
                                        src='/img/projects/vuelo.jpg'
                                        alt='Vuelo'
                                        fill
                                        className='cover'
                                    />
                                </ScrollingImage>
                            </AnimatedLink>

                        </div>
                    </FollowMouse>
                </div>

            </section>

            <ContactMarquee />

        </>
    )
}