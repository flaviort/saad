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

    // description
    const about = {
        title: 'About',
        text: "<p>Guilherme “Nagüeva” é um profissional multidisciplinar que teve uma trajetória bastante incomum dentro do design: foi um dos pioneiros em WordPress e SEO no sul do Brasil, foi Chief Design Officer em uma startup de car sharing atuando em áreas comoservice design, business intelligence e design leadership e ocupou o cargo de Sênior UX Designer na Philips Brasil, sendo responsável pela automação de processos de design para o Tasy EMR, produto líder no setor de healthcare na América Latina.</p><p>A fim de se projetar profissionalmente, Nagüeva procurou a Saad para desenvolver um projeto de personal branding, entendendo seus diferenciais, explorando as oportunidades de mercado e definindo seu posicionamento.</p><h3>Dando uma voz às ideias</h3><p>No decorrer das pesquisas e workshops com o próprio profissional, além de entrevistas com pessoas próximas e parceiros de trabalho, o principal diferencial de Nagüeva se tornou claro: solucionar desafios complexos de forma incomum e eficaz através do design e da tecnologia traduzido através da brand idea “Cha(lle)nger” (changer + challenger).</p><p>Além disso, algumas características se destacaram: frases como “sou a síntese do excesso”, “não me encaixo em nada e, ao mesmo tempo, me adapto a tudo” e “fujo do que é mainstream”, juntamente com o significado do nome (“Nagüeva” surgiu de uma brincadeira entre amigos e significa “o que está na goela, o que eu quero falar”), conduziram a criação de uma identidade minimalista em preto e branco que utiliza somente textos (o principal elemento da marca, remetendo ao significado do nome) que se adaptam aos mais diferentes tamanhos, formatos e plataformas, traduzindo atributos como intensidade, transformação e experimentação de uma forma direta, cheia de personalidade e não convencional.</p><h3>Big new cha(lle)nges</h3><p>O projeto de personal branding contou com a definição de toda a plataforma da marca (buyer personas, drivers, arquétipo, propósito, posicionamento, missão e brand persona, além dos principais canais de comunicação, tom de voz e recomendações estratégicas) e menos de um ano após o projeto, Nagüeva foi promovido e transferido do Brasil para a sede global da Philips em Eindhoven – Holanda, onde ocupa o cargo de Senior Design Technologist.</p><p>Nas palavras do próprio Nagüeva: “Eu usei muito a marca na maneira como eu me posicionava em reuniões, conversas, como líder do time e líder de projeto e aquilo foi essencial para o que estou vivendo hoje. Aqui (na Europa) eu peguei os projetos que eram menos relevantes, que ninguém estava dando atenção e que ninguém queria e o primeiro deles acabou se tornando parte da estratégia da Philips global de escalabilidade e o  outro, um projeto com baixa prioridade no começo do ano, agora é um dos projetos prioritários e está atrelado diretamente a um dos KPIs da Philips Design. É uma jornada de um ano aqui na Holanda que é inacreditável e, se eu não tivesse um norte, se lá atrás nós não tivéssemos parado para pensar estrategicamente em como eu iria me posicionar, eu não tinha conquistado isso, sinceramente não tinha.”</p>"
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

            {about && (
                <>
                    <ListSection
                        title={about.title}
                        about={about.text}
                        singleColumn
                    />

                    <AnimatedLine />
                </>
            )}

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
                            sizes='100vw'
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
                            sizes='100vw'
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
                            sizes='100vw'
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
                            sizes='100vw'
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
                                        sizes='50vw'
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
                                        sizes='50vw'
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