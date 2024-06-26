// libraries
import { useRouter } from 'next/router'
import Link from 'next/link'
import clsx from 'clsx'
import Image from 'next/image'
import { useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// routes / utils / hooks
import routes from '@/utils/routes'
import { getProjects } from '@/utils/graphql'
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
import FillTitle from '@/components/utils/fill-title'

// css
import styles from './work-inner.module.scss'

export default function WorkInner({ data, prevProject, nextProject }) {

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
    }, { scope: bannerRef })

    return (
        <Layout
            bodyClass='work-inner'
            pageTitle={data.node.title}
            pageDescription={data.node.projects.title}
        >

            <section className={styles.banner} ref={bannerRef}>
                <FollowMouse text='Scroll'>

                    <div className={clsx(styles.bg, 'bg')}>
                        <Image
                            src={data.node.featuredImage.node.sourceUrl}
                            alt={data.node.title}
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
                                {data.node.title}
                            </h1>

                            <h2 className='font-big'>
                                <FillTitle text={data.node.projects.title} />
                            </h2>

                        </div>

                        <div className='grid-md-4-5 grid-xl-5-6'>
                            <p className={styles.category}>
                                {data.node.categories.nodes[0].name}
                            </p>
                        </div>

                        <div className='grid-md-5-7 grid-xl-6-7'>
                            <p className={styles.tags}>
                                {data.node.tags.nodes.map((tag, i) => (
                                    <span key={i}>
                                        {tag.name}
                                    </span>
                                ))}
                            </p>
                        </div>

                    </div>
                </div>
            </section>

            <AnimatedLine />

            {data.node.projects.about && (
                <>
                    <ListSection
                        title='About'
                        about={data.node.projects.about}
                        singleColumn
                    />

                    <AnimatedLine />
                </>
            )}

            {data.node.projects.awards && (
                <>
                    <ListSection
                        title='Awards'
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
                        title='Credits'
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
                            
                            {item.image && (
                                <div className={styles.image}>
                                    <ScrollingImage>
                                        <Image
                                            src={item.image.node.sourceUrl}
                                            alt={item.imageDescription}
                                            fill
                                            sizes='100vw'
                                            className='cover'
                                        />
                                    </ScrollingImage>
                                </div>
                            )}

                            {item.videoId && (
                                <div className={styles.video}>
                                    <Video id={item.videoId} />
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
                                Previous
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
                                Next
                            </span>

                            <span className='font-big'>
                                {nextProject.title}
                            </span>

                        </Link>

                    </div>
                </div>

                <div className={styles.bottom}>
                    <FollowMouse text='View'>
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
                                    />
                                </ScrollingImage>
                            </Link>

                        </div>
                    </FollowMouse>
                </div>

            </section>

            <ContactMarquee />

        </Layout>
    )
}

export async function getStaticPaths() {
    try {
        const res = await getProjects()
        const data = res.edges

        const paths = data.flatMap((edge) => {
            return ['en', 'pt'].map(locale => ({
                params: { client: slugify(edge.node.title) },
                locale
            }))
        })

        return {
            paths,
            fallback: false
        }
    } catch (error) {
        console.log(error)
    }
}

export async function getStaticProps({ params, locale }) {
    try {
        const slug = params.client
        const res = await getProjects(locale)
        const data = res.edges.find(edge => slugify(edge.node.title) === slug)
        const projects = res.edges

        // find the index of the current project
        const currentIndex = projects.findIndex(edge => slugify(edge.node.title) === slug)

        // calculate the indices of previous and next projects
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length
        const nextIndex = (currentIndex + 1) % projects.length

        // get the previous and next projects
        const prevProject = projects[prevIndex].node
        const nextProject = projects[nextIndex].node

        return {
            props: {
                data,
                prevProject,
                nextProject,
                messages: (await import(`../../../i18n/${locale}.json`)).default
            }
        }
    } catch (error) {
        console.error(error)
    }
}