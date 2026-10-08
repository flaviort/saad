'use client'

// libraries
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import clsx from 'clsx'
import Image from 'next/image'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Navigation } from 'swiper/modules'
import 'swiper/css'

// routes / utils / hooks
import { slugify } from '@/utils/functions'

// components
import Layout from '@/layout'
import FollowMouse from '@/components/utils/follow-mouse'
import AnimatedLine from '@/components/utils/animated-line'
import { ScrollingImage } from '@/components/utils/animations'
import Video from '@/components/video'
import ListSection from '@/components/list-section'
import Testimonials from '@/components/testimonials'
import ContactMarquee from '@/components/contact-marquee'
import VideoLightbox from '@/components/video-lightbox'

// types
import type { ProjectEdge, ProjectNode } from '@/types/wordpress'

// css
import styles from './work-inner.module.scss'

type WorkInnerProps = {
    data: ProjectEdge
    prevProject: ProjectNode
    nextProject: ProjectNode
}

export default function WorkInner({ data, prevProject, nextProject }: WorkInnerProps) {

    const bannerRef = useRef<HTMLElement>(null)
    const t = useTranslations('WorkInner')

    // names gallery images that have no description in WordPress
    const projectName = data.node.projects?.title || data.node.title

    // banner image fades and grows while the banner scrolls away
    useGSAP(() => {
        gsap.to('.bg img', {
            autoAlpha: .1,
            scale: 1.1,
            scrollTrigger: {
                trigger: bannerRef.current,
                start: 'top top',
                anticipatePin: 1,
                pin: '.bg',
                end: 'bottom top',
                scrub: true,
                pinSpacing: false
            }
        })
    }, { scope: bannerRef })

    return (
        <Layout>
            <div>

                <section className={styles.banner} ref={bannerRef}>
                    <FollowMouse text={t('scroll')}>

                        <div className={clsx(styles.bg, 'bg')}>
                            <Image
                                src={data.node.featuredImage.node.sourceUrl}
                                alt={data.node.title}
                                preload
                                fill
                                sizes='100vw'
                                quality={90}
                                className='cover'
                            />
                        </div>

                        <div className={clsx(styles.container, 'container')}>
                            <div className={clsx(styles.grid, 'grid-container')}>
                                <div className='grid-xl-1-3'>
                                    
                                    <h1 className={styles.title}>
                                        {data.node.projects?.title}
                                    </h1>

                                    <h2 className='font-big'>
                                        {data.node.projects?.subtitle}
                                    </h2>

                                </div>

                                <div className='grid-xl-3-7'>
                                    <p className={styles.category}>
                                        {data.node.projects?.category}
                                    </p>
                                </div>

                                {/*
                                <div className='grid-md-5-7 grid-xl-6-7'>
                                    <p className={styles.tags}>
                                        {data.node.projects?.tags?.map((tag, i) => (
                                            <span key={i}>
                                                {tag.tag}
                                            </span>
                                        ))}
                                    </p>
                                </div>
                                */}

                            </div>
                        </div>

                    </FollowMouse>
                </section>

                {data.node.projects.about && (
                    <>
                        <ListSection
                            title={t('about')}
                            about={data.node.projects.about}
                            singleColumn
                            noScroll
                        />

                        <AnimatedLine />
                    </>
                )}

                {data.node.projects.services && (
                    <>
                        <ListSection
                            title={t('whatWeDid')}
                            infos={[{
                                items: data.node.projects.services.map( service => ({
                                    text: service.service
                                }))
                            }]}
                            singleColumn
                            noScroll
                        />

                        <AnimatedLine />
                    </>
                )}

                {data.node.projects.awards && (
                    <>
                        <ListSection
                            title={t('awards')}
                            infos={[{
                                items: data.node.projects.awards.map( award => ({
                                    text: award.award
                                }))
                            }]}
                            singleColumn
                            noScroll
                        />

                        <AnimatedLine />
                    </>
                )}

                {data.node.projects.credits && (
                    <>
                        <ListSection
                            title={t('credits')}
                            infos={[{
                                items: data.node.projects.credits.map( credit => ({
                                    text: credit.credit
                                }))
                            }]}
                            singleColumn
                            noScroll
                        />

                        <AnimatedLine />
                    </>
                )}

                {data.node.projects.gallery && (
                    <section className={styles.gallery}>
                        {data.node.projects.gallery.map((item, i) => (
                            <div key={i}>

                                {item.fullVideo && (
                                    <VideoLightbox
                                        videoId={item.fullVideo}
                                        label={data.node.title}
                                        className={styles.featuredVideo}
                                    >
                                        <Video
                                            id={item.smallVideo || item.fullVideo}
                                            featured
                                        />
                                    </VideoLightbox>
                                )}
                                
                                {item.image && (
                                    <div className={styles.image}>
                                        <Image
                                            src={item.image.node.sourceUrl}
                                            alt={item.imageDescription || t('imageAlt', { project: projectName, number: i + 1 })}
                                            fill
                                            sizes='100vw'
                                            quality={90}
                                            className='cover'
                                        />
                                    </div>
                                )}

                                {item.videoId && (
                                    <div className={styles.video}>
                                        <Video id={item.videoId} />
                                    </div>
                                )}

                                {item.slides && (
                                    <div className='relative'>
                                        <FollowMouse text={t('drag')}>
                                            <Swiper
                                                modules={[Navigation, Autoplay]}
                                                className={styles.slider}
                                                spaceBetween={0}
                                                slidesPerView={1}
                                                allowTouchMove={true}
                                                autoplay={{
                                                    delay: 3000,
                                                    disableOnInteraction: false
                                                }}
                                                speed={1000}
                                                grabCursor={true}
                                            >
                                                {item.slides.map((slide, i2) => (
                                                    <SwiperSlide
                                                        key={i2}
                                                        data-slide
                                                    >
                                                        <Image
                                                            src={slide.image.node.sourceUrl}
                                                            alt={slide.imageDescription || t('imageAlt', { project: projectName, number: `${i + 1}.${i2 + 1}` })}
                                                            fill
                                                            sizes='100vw'
                                                            quality={90}
                                                            className='cover'
                                                        />
                                                    </SwiperSlide>
                                                ))}
                                            </Swiper>
                                        </FollowMouse>
                                    </div>
                                )}

                            </div>
                        ))}
                    </section>
                )}

                {data.node.projects.testimonials && (
                    <>
                        <Testimonials testimonials={data.node.projects.testimonials} />
                        <AnimatedLine />
                    </>
                )}

                <section className={clsx(styles.previousNext, 'padding-top')}>
                    
                    <div className='container'>
                        <div className={styles.top}>

                            <Link
                                scroll={false}
                                href={'/work/' + slugify(prevProject.title)}
                                className={styles.link}
                            >
                                
                                <span className={clsx(styles.small, 'font-small')}>
                                    {t('previous')}
                                </span>

                                <span className='font-big'>
                                    {prevProject.title}
                                </span>

                            </Link>

                            <Link
                                scroll={false}
                                href={'/work/' + slugify(nextProject.title)}
                                className={styles.link}
                            >
                                
                                <span className={clsx(styles.small, 'font-small')}>
                                    {t('next')}
                                </span>

                                <span className='font-big'>
                                    {nextProject.title}
                                </span>

                            </Link>

                        </div>
                    </div>

                    <div className={styles.bottom}>
                        <FollowMouse text={t('view')}>
                            <div className={styles.flex}>

                                <Link
                                    scroll={false}
                                    href={'/work/' + slugify(prevProject.title)}
                                    className={styles.link}
                                >
                                    <ScrollingImage>
                                        <Image
                                            src={prevProject.featuredImage.node.sourceUrl}
                                            alt={prevProject.title}
                                            fill
                                            className='cover'
                                            sizes='50vw'
                                            quality={90}
                                        />
                                    </ScrollingImage>
                                </Link>

                                <Link
                                    scroll={false}
                                    href={'/work/' + slugify(nextProject.title)}
                                    className={styles.link}
                                >
                                    <ScrollingImage>
                                        <Image
                                            src={nextProject.featuredImage.node.sourceUrl}
                                            alt={nextProject.title}
                                            fill
                                            className='cover'
                                            sizes='50vw'
                                            quality={90}
                                        />
                                    </ScrollingImage>
                                </Link>

                            </div>
                        </FollowMouse>
                    </div>

                </section>

                <ContactMarquee />

            </div>
        </Layout>
    )
}
