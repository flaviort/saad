// libraries
import { useRef } from 'react'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// i18n
import { useTranslations } from 'next-intl'

// components
import Layout from '@/layout'
import { FadeIn } from '@/components/utils/animations'
import ContactMarquee from '@/components/contact-marquee'

// css
import styles from './privacy-policy.module.scss'

export default function PrivacyPolicy({ services, awards, talks, publications }) {

	const t = useTranslations('PrivacyPolicy')
	const { locale } = useRouter()
	const fadeRef1 = useRef()
	const fadeRef2 = useRef()

	useGSAP(() => {

		const fade1 = fadeRef1.current
		const fade2 = fadeRef2.current
		
		gsap.set(fade1, {
			opacity: 0,
			y: 50
		})

		gsap.set(fade2, {
			opacity: 0,
			y: 50
		})

		const tl = gsap.timeline({
			paused: true
		})

		tl.to(fade1, {
			opacity: 1,
			y: 0,
			duration: .6,
			ease: 'power1.out'
		})

		tl.to(fade2, {
			opacity: 1,
			y: 0,
			duration: .6,
			ease: 'power1.out'
		}, '-=.4')

		document.addEventListener('opening', () => {
			setTimeout(() => {
				tl.play()
			}, 600)
		})

		document.addEventListener('page-transition', () => {
			setTimeout(() => {
				tl.play()
			}, 200)
		})
	})

    return (
		<Layout
			bodyClass='about'
			pageTitle={t('pageTitle')}
			pageDescription={t('pageDescription')}
		>

			<section className={clsx(styles.topPart, 'padding-top-bigger padding-bottom-big')}>
				<div className='container'>
					<div className='grid-container'>

						<div className='grid-md-2-6'>
							<h2 className='font-big-2' ref={fadeRef1}>
								{t('TopSection.title')}
							</h2>
						</div>

						<div className='grid-md-2-5'>
							<p ref={fadeRef2}>
								{t('TopSection.text')}
							</p>
						</div>

					</div>
				</div>
			</section>

			<section className={styles.mainContent}>
				<div className='container padding-top padding-bottom-big'>
					<div className='grid-container'>
						<div className='grid-md-2-6'>

							{locale === 'en' ? (
								<div className={styles.content}>
									
									<h2 className='font-big-2'>
										Who We Are
									</h2>

									<p>
										Lucas Saad is a branding and design consultancy based in Brazil. We help visionary leaders build impactful brands through strategy, design, and technology. For the purposes of this Privacy Policy, "we," "our," or "us" refers to Lucas Saad.<br /><br />

										<b>Contact information:</b><br />
										Email: <a href='mailto:saad@saad.cx' className='hover-underline'>saad@saad.cx</a>
									</p>

									<h2 className='font-big-2'>
										Personal Data We Collect
									</h2>

									<p>
										We collect personal data only when necessary for the services we provide. This may include:<br /><br />

										<b>Information you provide:</b>
									</p>

									<ul>
										<li>Name, email address, phone number, and other contact details</li>
										<li>Information submitted via forms, surveys, or project inquiries</li>
										<li>Company or professional details, when relevant to service delivery</li>
									</ul>

									<p>
										<b>Information collected automatically:</b>
									</p>

									<ul>
										<li>IP address and browser information</li>
										<li>Cookies and analytics data for website performance and user experience</li>
										<li>Device information, including operating system and access times</li>
									</ul>

									<p>
										We collect data only for specific, legitimate purposes and ensure it is adequate and relevant for the intended use.
									</p>

									<h2 className='font-big-2'>
										How We Use Your Information
									</h2>

									<p>
										We use the personal data we collect to:
									</p>

									<ul>
										<li>Provide and improve our services</li>
										<li>Communicate with you about your projects or inquiries</li>
										<li>Send marketing communications, with your consent</li>
										<li>Analyze website traffic and optimize user experience</li>
										<li>Comply with legal obligations</li>
									</ul>

									<p>
										We will not use your personal data for purposes other than those specified without obtaining your consent.
									</p>

									<h2 className='font-big-2'>
										Sharing of Information
									</h2>

									<p>
										We may share personal information in limited circumstances:
									</p>

									<ul>
										<li><b>With service providers:</b> Companies and individuals that assist us in providing our services (e.g., hosting, analytics, marketing).</li>
										<li><b>For legal reasons:</b> If required to comply with a legal obligation or protect our rights.</li>
										<li><b>With your consent:</b> We will share personal information with third parties only if you have explicitly agreed.</li>
									</ul>

									<p>
										We ensure that any third parties we work with comply with privacy and data protection standards compatible with this policy.
									</p>

									<h2 className='font-big-2'>
										Cookies and Tracking Technologies
									</h2>

									<p>
										Our website uses cookies and similar technologies to improve user experience and understand website usage.
									</p>

									<ul>
										<li>You can manage or disable cookies in your browser settings.</li>
										<li>Cookies do not store personally identifiable information unless you provide it through forms or account registration.</li>
									</ul>

									<h2 className='font-big-2'>
										Data Security and Storage
									</h2>

									<p>
										We implement appropriate technical and organizational measures to protect your personal data from unauthorized access, loss, or misuse.
									</p>

									<ul>
										<li>Personal data is stored securely on servers located in Brazil or in trusted third-party service providers.</li>
										<li>We retain personal information only as long as necessary to fulfill the purposes outlined in this policy or to comply with legal obligations.</li>
									</ul>

									<h2 className='font-big-2'>
										Your Rights (under LGPD)
									</h2>

									<p>
										Under the Brazilian General Data Protection Law (LGPD), you have the right to:
									</p>

									<ul>
										<li>Access your personal data that we hold</li>
										<li>Request correction or update of inaccurate or incomplete information</li>
										<li>Request deletion of personal data, subject to legal obligations</li>
										<li>Withdraw your consent for processing at any time</li>
										<li>Request information about the processing of your data</li>
									</ul>

									<p>
										To exercise any of these rights, please contact us at <a href='mailto:saad@saad.cx' className='hover-underline'>saad@saad.cx</a>
									</p>

									<h2 className='font-big-2'>
										Children’s Privacy
									</h2>

									<p>
										Our services are not directed to children under 12 years of age. We do not knowingly collect personal data from children.
									</p>

									<h2 className='font-big-2'>
										Changes to This Privacy Policy
									</h2>

									<p>
										We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Significant updates will be highlighted on our website. We encourage you to review this policy periodically.
									</p>

									<h2 className='font-big-2'>
										Contact
									</h2>

									<p>
										For questions about this Privacy Policy or to exercise your rights, please contact us:<br />
										Email: <a href='mailto:saad@saad.cx' className='hover-underline'>saad@saad.cx</a>
									</p>

								</div>
							) : (
								<div className={styles.content}>

									<h2 className='font-big-2'>
										Quem Somos
									</h2>

									<p>
										Lucas Saad é uma consultoria de branding e design com sede no Brasil. Ajudamos líderes visionários a construir marcas impactantes por meio de estratégia, design e tecnologia. Para os fins desta Política de Privacidade, "nós", "nosso" ou "nos" se referem à Lucas Saad.<br /><br />

										<b>Informações de contato:</b><br />
										Email: <a href='mailto:saad@saad.cx' className='hover-underline'>saad@saad.cx</a>
									</p>

									<h2 className='font-big-2'>
										Dados Pessoais que Coletamos
									</h2>

									<p>
										Coletamos dados pessoais apenas quando necessário para os serviços que fornecemos. Isso pode incluir:<br /><br />

										<b>Informações fornecidas por você:</b>
									</p>

									<ul>
										<li>Nome, endereço de e-mail, número de telefone e outros dados de contato</li>
										<li>Informações enviadas por meio de formulários, pesquisas ou consultas de projetos</li>
										<li>Dados da empresa ou profissionais, quando relevantes para a prestação do serviço</li>
									</ul>

									<p>
										<b>Informações coletadas automaticamente:</b>
									</p>

									<ul>
										<li>Endereço IP e informações do navegador</li>
										<li>Cookies e dados de análise para desempenho do site e experiência do usuário</li>
										<li>Informações do dispositivo, incluindo sistema operacional e horários de acesso</li>
									</ul>

									<p>
										Coletamos dados apenas para fins específicos e legítimos, garantindo que sejam adequados e relevantes para o uso pretendido.
									</p>

									<h2 className='font-big-2'>
										Como Usamos suas Informações
									</h2>

									<p>
										Utilizamos os dados pessoais que coletamos para:
									</p>

									<ul>
										<li>Fornecer e aprimorar nossos serviços</li>
										<li>Comunicar-nos com você sobre seus projetos ou consultas</li>
										<li>Enviar comunicações de marketing, mediante seu consentimento</li>
										<li>Analisar o tráfego do site e otimizar a experiência do usuário</li>
										<li>Cumprir obrigações legais</li>
									</ul>

									<p>
										Não utilizaremos seus dados pessoais para finalidades diferentes daquelas especificadas sem obter seu consentimento.
									</p>

									<h2 className='font-big-2'>
										Compartilhamento de Informações
									</h2>

									<p>
										Podemos compartilhar informações pessoais em circunstâncias limitadas:
									</p>

									<ul>
										<li><b>Com prestadores de serviços:</b> Empresas e indivíduos que nos auxiliam na prestação de nossos serviços (ex.: hospedagem, análise de dados, marketing).</li>
										<li><b>Por razões legais:</b> Se necessário para cumprir uma obrigação legal ou proteger nossos direitos.</li>
										<li><b>Com seu consentimento:</b> Compartilharemos informações pessoais com terceiros apenas se você tiver concordado explicitamente.</li>
									</ul>

									<p>
										Garantimos que quaisquer terceiros com os quais trabalhamos cumpram padrões de privacidade e proteção de dados compatíveis com esta política.
									</p>

									<h2 className='font-big-2'>
										Cookies e Tecnologias de Rastreamento
									</h2>

									<p>
										Nosso site utiliza cookies e tecnologias semelhantes para melhorar a experiência do usuário e entender o uso do site.
									</p>

									<ul>
										<li>Você pode gerenciar ou desativar os cookies nas configurações do seu navegador.</li>
										<li>Cookies não armazenam informações pessoalmente identificáveis, a menos que você as forneça por meio de formulários ou registro de conta.</li>
									</ul>

									<h2 className='font-big-2'>
										Segurança e Armazenamento de Dados
									</h2>

									<p>
										Implementamos medidas técnicas e organizacionais adequadas para proteger seus dados pessoais contra acesso não autorizado, perda ou uso indevido.
									</p>

									<ul>
										<li>Os dados pessoais são armazenados de forma segura em servidores localizados no Brasil ou em provedores de serviços confiáveis.</li>
										<li>Reteremos informações pessoais apenas pelo tempo necessário para cumprir os objetivos descritos nesta política ou para cumprir obrigações legais.</li>
									</ul>

									<h2 className='font-big-2'>
										Seus Direitos (sob LGPD)
									</h2>

									<p>
										De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem o direito de:
									</p>

									<ul>
										<li>Acessar seus dados pessoais que possuímos</li>
										<li>Solicitar a correção ou atualização de informações imprecisas ou incompletas</li>
										<li>Solicitar a exclusão de dados pessoais, sujeito a obrigações legais</li>
										<li>Retirar seu consentimento para o processamento a qualquer momento</li>
										<li>Solicitar informações sobre o processamento de seus dados</li>
									</ul>

									<p>
										Para exercer qualquer um desses direitos, entre em contato conosco em <a href='mailto:saad@saad.cx' className='hover-underline'>saad@saad.cx</a>
									</p>

									<h2 className='font-big-2'>
										Privacidade de Crianças
									</h2>

									<p>
										Nossos serviços não são direcionados a crianças menores de 12 anos. Não coletamos conscientemente dados pessoais de crianças.
									</p>

									<h2 className='font-big-2'>
										Alterações nesta Política de Privacidade
									</h2>

									<p>
										Podemos atualizar esta Política de Privacidade periodicamente para refletir mudanças em nossas práticas ou requisitos legais. Atualizações significativas serão destacadas em nosso site. Recomendamos que você revise esta política periodicamente.
									</p>

									<h2 className='font-big-2'>
										Contato
									</h2>

									<p>
										Para dúvidas sobre esta Política de Privacidade ou para exercer seus direitos, entre em contato conosco:<br />
										Email: <a href='mailto:saad@saad.cx' className='hover-underline'>saad@saad.cx</a>
									</p>

								</div>
							)}
						</div>
					</div>
				</div>
			</section>

			<div className={styles.line} />

			<ContactMarquee />
			
		</Layout>
    )
}

export async function getStaticProps({ locale }) {
	const messages = await import(`../../i18n/${locale}.json`).then(m => m.default)

	return {
		props: {
			messages
		}
	}
}