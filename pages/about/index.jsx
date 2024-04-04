// libraries
import Image from 'next/image'
import clsx from 'clsx'

// import routes / services
import routes from '@/utils/routes'

// components
import SeoContainer from '@/components/utils/seo-container'
import AnimatedLine from '@/components/utils/animated-line'
import { FadeIn } from '@/components/utils/animations'
import ListSection from '@/components/list-section'
import LogosSlider from '@/components/logos-slider'
import ContactMarquee from '@/components/contact-marquee'

// images
import lucas from '@/assets/img/lucas.jpg'

// css
import styles from './about.module.scss'
import FillTitle from '@/components/utils/fill-title'

export default function About() {

	const services = {
		title: 'Services',
		infos: [
			{
				subTitle: 'Brand Research',
				items: ['Immersion in the company', 'Market & trends', 'Target audience', 'Benchmarks', 'Stakeholders', 'Brand diagnosis']
			}, {
				subTitle: 'Brand Strategy',
				items: ['Positioning', 'Purpose', 'Brand architecture', 'Brand platform', 'Business model innovation', 'Strategic recommendations']
			}, {
				subTitle: 'Brand Identity',
				items: ['Naming', 'Tagline', 'Key messages', 'Voice tone', 'Visual identity', 'Brandbook']
			}, {
				subTitle: 'Brand Experience',
				items: ['Web design', 'Packaging', 'Brand communication', 'Signage', 'Brand activation', 'Products & services']
			}, {
				subTitle: 'Brand Management',
				items: ['Brand measurement']
			}
		]
	}

	const awards = {
		title: 'Awards',
		infos: [
			{
				subTitle: 'Internationals',
				items: [
					{
						year: '2023',
						text: 'Brandor (melhor naming), Espanha. 9-6'
					}, {
						year: '2022',
						text: 'Bienal Iberoamericana de Diseño, BID, Espanha. 9-6'
					}, {
						year: '2022',
						text: 'Premios CLAP. Diseño Industrial y Diseño Gráfico, Espanha. 9-6'
					}, {
						year: '2020',
						text: 'Bienal Iberoamericana de Diseño, BID, Espanha. Nagüeva'
					}, {
						year: '2018',
						text: 'Lisbon International Health Festival, Portugal. Vuelo Pharma'
					}, {
						year: '2018',
						text: 'Bienal Iberoamericana de Diseño, BID, Espanha. Vuelo Pharma'
					}, {
						year: '2017',
						text: 'iF Design Award, Alemanha. RE'
					}, {
						year: '2017',
						text: 'Premios CLAP. Diseño Industrial y Diseño Gráfico, CLAP Platinum, Espanha. Sementes Ipiranga'
					}, {
						year: '2017',
						text: 'Premios CLAP. Diseño Industrial y Diseño Gráfico, Espanha. RE'
					}, {
						year: '2017',
						text: 'Premios CLAP. Diseño Industrial y Diseño Gráfico, Espanha. Vuelo'
					}, {
						year: '2014',
						text: 'iF Design Award, Alemanha. Sementes Ipiranga'
					}
				]
			}, {
				subTitle: 'Nationals',
				items: [
					{
						year: '2018',
						text: 'Brasil Design Award. Vuelo Pharma'
					}, {
						year: '2017',
						text: '12ª Bienal Brasileira de Design Gráfico. Vuelo Pharma'
					}, {
						year: '2015',
						text: 'Bienal Brasileira de Design. Yon'
					}, {
						year: '2015',
						text: '11ª Bienal Brasileira de Design Gráfico. Yon'
					}, {
						year: '2013',
						text: 'IDEA Brasil Awards. Sementes Ipiranga'
					}
				]
			}
		]
	}

	const talks = {
		title: 'Talks',
		infos: [
			{
				subTitle: 'Lectures & Events',
				items: [
					{
						year: '2019',
						text: 'Elali (Encuentro Latinoamericano de Limpieza e Innovación) Creando marcas impactantes que transforman los negocios. Lucas Saad, palestrante convidado. Cartagena, Colômbia.'
					}, {
						year: '2019',
						text: 'Elali (Encuentro Latinoamericano de Limpieza e Innovación) Workshop de brand storytelling “Creando historias impactantes que transforman los negocios”. Lucas Saad, facilitador. Cartagena, Colômbia.'
					}, {
						year: '2019',
						text: 'Household Summit – Criando marcas de impacto que transformam negócios. Lucas Saad, palestrante convidado. São Paulo, Brasil.'
					}, {
						year: '2018',
						text: 'CUBO Itaú – Impactful tailored brands: criando negócios que transformam mercados. Lucas Saad, palestrante convidado. São Paulo, Brasil.'
					}, {
						year: '2018',
						text: 'Polifonia - Diálogos Polifônicos. Lucas Saad, palestrante convidado. São Paulo, Brasil.'
					}, {
						year: '2018',
						text: 'MBA em Branding da Universidade Positivo. Lucas Saad, palestrante convidado. Curitiba, Brasil.'
					}, {
						year: '2017',
						text: 'Campus Party 10 – O que a inovação, o branding e o design podem fazer pelo setor de tecnologia? Lucas Saad, palestrante convidado. São Paulo, Brasil.'
					}, {
						year: '2017',
						text: 'Campus Party 10 – Painel Pensar design: o poder de unir pessoas, negócios e tecnologia. Lucas Saad, palestrante convidado. São Paulo, Brasil.'
					}, {
						year: '2017',
						text: 'Prêmio POPAI Brasil – Lucas Saad, jurado. São Paulo, Brasil.'
					}, {
						year: '2017',
						text: 'Brand’s Up Conference - Lucas Saad, palestrante convidado. Brasil.'
					}, {
						year: '2017',
						text: 'Pontifícia Universidade Católica do Paraná (PUC PR) Charneira. Lucas Saad, palestrante convidado. Curitiba, Brasil.'
					}, {
						year: '2017',
						text: 'Universidade Positivo – Encontro com o mercado. Lucas Saad, palestrante convidado. Curitiba, Brasil.'
					}, {
						year: '2016',
						text: 'Festival Picnic – RE. Rio de Janeiro, Brasil.'
					}, {
						year: '2016',
						text: 'MBA em Branding da Univali – Marcas que dialogam. Lucas Saad, palestrante convidado. Balneário Camboriú, Brasil.'
					}, {
						year: '2015',
						text: 'Instituto Brasileiro de Produtividade e Qualidade (IBQP) Sua marca está preparada para o futuro? Lucas Saad, palestrante convidado. Curitiba, Brasil.'
					}, {
						year: '2014',
						text: 'Semana D – 600 segundos. Lucas Saad, palestrante convidado. Curitiba, Brasil.'
					}, {
						year: '2014',
						text: 'Pré-Bienal Brasileira de Design – Index/SC Design para Todos. Lucas Saad, palestrante convidado. Chapecó, Brasil.'
					}, {
						year: '2013',
						text: 'Universidade Positivo – Portfolio Concept ’13. Lucas Saad, palestrante convidado. Curitiba, Brasil.'
					}
				]
			}
		]
	}

	const publications = {
		title: 'Publications',
		infos: [
			{
				subTitle: 'Online',
				items: [
					{
						year: '2018',
						text: 'Revista Mundo Corporativo (Deloitte). A consultoria de branding Saad é um dos destaques do artigo sobre Scale-Ups na seção "Inovação". Brasil.'
					}, {
						year: '2018',
						text: 'Design and Design, França. Yon'
					}, {
						year: '2017',
						text: 'The Dieline, Estados Unidos. RE'
					}, {
						year: '2017',
						text: 'Favourite Design, França. Oigo.'
					}, {
						year: '2017',
						text: 'Administradores — artigos sobre Naming, Essência de Marca e Tendências. Brasil.'
					}, {
						year: '2017',
						text: 'Brasil Econômico (iG). Oito dicas para melhorar seu negócio. Artigo publicado na seção "Economia". Brasil.'
					}, {
						year: '2017',
						text: 'Design and Design, França. Vuelo Pharma'
					}, {
						year: '2017',
						text: 'DesignBrasil, Brasil. RE'
					}, {
						year: '2016',
						text: 'The Dieline, Estados Unidos. Vuelo Pharma'
					}, {
						year: '2016',
						text: 'Packaging of the World, Singapura. RE'
					}, {
						year: '2016',
						text: 'Packaging of the World, Singapura. Vuelo Pharma'
					}, {
						year: '2016',
						text: 'Visualgraphc, Estados Unidos. Sementes Ipiranga'
					}, {
						year: '2016',
						text: 'Design and Design, França. Oigo'
					}, {
						year: '2016',
						text: 'Favourite Design, França. Vuelo Pharma'
					}, {
						year: '2016',
						text: 'Ohmycode, Rússia. Sementes Ipiranga'
					}, {
						year: '2016',
						text: 'Embalagem Marca, Brasil. Vuelo Pharma'
					}, {
						year: '2016',
						text: 'Administradores. artigos sobre Branding, Planejamento Estratégico, Posicionamento de Marca, Etnografia e Identidades Dinâmicas. Brasil.'
					}, {
						year: '2016',
						text: 'Design Clever, Inglaterra. Sementes Ipiranga'
					}, {
						year: '2016',
						text: 'Retail Design Blog, Hungria. RE'
					}, {
						year: '2016',
						text: 'Milk With One Sugar, Estados Unidos. Sementes Ipiranga'
					}, {
						year: '2016',
						text: 'We And The Color, Estados Unidos. Oigo'
					}, {
						year: '2016',
						text: 'We And The Color, Estados Unidos. Saad'
					}, {
						year: '2016',
						text: 'DesignBrasil, Brasil. Vuelo Pharma'
					}, {
						year: '2016',
						text: 'DesignBrasil. Artigos sobre Branding e Etnografia, Brasil.'
					}, {
						year: '2016',
						text: 'InfoBranding. Artigo sobre Etnografia, Brasil.'
					}, {
						year: '2016',
						text: 'Trend List, Estados Unidos. Saad'
					}, {
						year: '2016',
						text: 'Raw (Abduzeedo), Estados Unidos. Vuelo Pharma'
					}, {
						year: '2015',
						text: 'DesignBrasil. Mudança de marca requer atenção e cuidado. Artigo publicado na seção "Design". Brasil.'
					}, {
						year: '2014',
						text: 'For Print Only (UnderConsideration), Estados Unidos. Sementes Ipiranga'
					}, {
						year: '2014',
						text: 'For Print Only (UnderConsideration), Estados Unidos. Saad'
					}, {
						year: '2014',
						text: 'Design and Design, França. Saad'
					}, {
						year: '2014',
						text: 'TheArtHunters (Daily Inspiration), Holanda. Yon'
					}, {
						year: '2014',
						text: 'Identity Designed, Irlanda. Yon'
					}, {
						year: '2014',
						text: 'Paper Specs, Estados Unidos. Saad'
					}, {
						year: '2014',
						text: 'DesignBrasil, Brasil. Sementes Ipiranga'
					}, {
						year: '2014',
						text: 'Packaging of the World, Singapura. Yon'
					}, {
						year: '2014',
						text: 'Creative Inspiration, Inglaterra. Yon'
					}, {
						year: '2014',
						text: 'New Grids, França. Saad'
					}, {
						year: '2014',
						text: 'Branding Served (Behance), Estados Unidos. Oigo'
					}, {
						year: '2014',
						text: 'Branding Served (Behance), Estados Unidos. Saad'
					}
				]
			}, {
				subTitle: 'Offline',
				items: [
					{
						year: '2017',
						text: 'Revista Pequenas Empresas & Grandes Negócios. A consultoria de branding Saad é um dos destaques da matéria de capa. Brasil.'
					}, {
						year: '2016',
						text: 'Revista abcDesign, Brasil. Vuelo Pharma'
					}, {
						year: '2016',
						text: 'Favourite Design Book, França. Vuelo Pharma'
					}, {
						year: '2016',
						text: 'Correio Braziliense - Como ficam os negócios no ano de 2017? Artigo publicado na seção Empreendedorismo. Brasil.'
					}, {
						year: '2016',
						text: 'Revista abcDesign, Brasil. Sementes Ipiranga'
					}, {
						year: '2015',
						text: 'Anuário de Propaganda Meio&Mensagem, Brasil. Sementes Ipiranga'
					}, {
						year: '2014',
						text: 'The Design and Design Book of the Year Vol. 7, França. Sementes Ipiranga'
					}, {
						year: '2014',
						text: 'Monochrome: Branding in Black and White Book, China. Saad'
					}
				]
			}
		]
	}

    return (
		<>
			<SeoContainer
				pageTitle='About'
				pageDescription='We help visionary leaders drive change and growth inside and outside your organizations in a creative and audacious way.'
			/>

			<section className={clsx(styles.topPart, 'padding-top-bigger padding-bottom-big')}>
				<div className='container'>
					<div className='grid-container'>

						<div className='grid-md-2-6'>
							<h2 className='font-big-2'>
								We help visionary leaders drive change and growth inside and outside their organizations in creative and bold ways.
							</h2>
						</div>

						<div className='grid-md-2-5'>
							<p>
								We look for the uniqueness of each brand. Your authenticity. What makes you unique. Once we find it, we communicate it to the world through carefully crafted strategies, stories, design and experiences that people won't forget.<br /><br />

								We believe that impactful brands can positively change the world – and we are here to help you build them through the perfect balance between strategy, design and technology, developing unique experiences for visionary brands.
							</p>
						</div>

					</div>
				</div>
			</section>

			<ListSection
				title={services.title}
				infos={services.infos}
				small
			/>

			<LogosSlider />

			<section className={styles.about}>

				<div className={styles.bg}>
					<FadeIn>
						<Image
							src={lucas}
							alt='Lucas Saad'
							fill={true}
							sizes='
								(max-width: 575px) 100vw,
								80vw
							'
						/>
					</FadeIn>
				</div>

				<div className='container relative z2'>
					<div className='grid-container'>
						<div className={clsx(styles.content, 'grid-md-4-7 grid-xl-5-7')}>

							<h2 className='font-big-2'>
								<FillTitle text='Lucas Saad' />
							</h2>

							<p>
								Lucas Saad, founder and director of Saad, has a degree in Design from the Federal University of Santa Maria - RS and a postgraduate degree in Branding Strategic Brand Management from Universidade Positivo in Curitiba - PR, having completed part of his MBA at Brunel University in London . He also has a degree in Global Creative Leadership from THNK - The Amsterdam School of Creative Leadership.<br /><br />

								With more than 15 years of experience in Brazil and abroad, he has participated in projects with companies of the most varied sizes (from small brands to multinationals such as Dow AgroSciences and Brookfield Renewable Energy) and sectors such as technology, pharmaceutical industry, agribusiness, logistics, engineering and industry, energy, marketing and advertising, consumer goods, human resources, among others.
							</p>

						</div>
					</div>
				</div>
			</section>

			<AnimatedLine />

			<ListSection
				title={awards.title}
				infos={awards.infos}
			/>

			<AnimatedLine />

			<ListSection
				title={talks.title}
				infos={talks.infos}
			/>

			<AnimatedLine />

			<ListSection
				title={publications.title}
				infos={publications.infos}
			/>

			<AnimatedLine />

			<ContactMarquee />
		</>
    )
}