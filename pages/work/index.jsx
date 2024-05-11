// libraries
import clsx from 'clsx'
import { useRouter } from 'next/router'

// i18n
import { useTranslations } from 'next-intl'

// components
import Layout from '@/layout'
import FollowMouse from '@/components/utils/follow-mouse'
import Project from '@/components/project'
import ContactMarquee from '@/components/contact-marquee'

// hooks
import { getProjects } from '@/utils/graphql'

// css
import styles from './work.module.scss'
import { slugify } from '@/utils/functions'

export default function Work({ data }) {

	const { locale } = useRouter()
	const t = useTranslations('Work')

	if (data && data.edges) {
		// render your components
	} else {
		// handle the case where data or data.edges is null
		console.log('Data not available');
	}

    return (
		<Layout
			bodyClass='work'
			pageTitle={t('pageTitle')}
			pageDescription={t('pageDescription')}
		>

			<section className={clsx(styles.topPart, 'padding-top-bigger padding-bottom-big')}>
				<div className='container'>
					<div className='grid-container'>
						<div className='grid-md-2-7'>
							<h2 className='font-big-2'>
								{t('Title.line_01')} <br />
								{t('Title.line_02')}
							</h2>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.projects}>
				<FollowMouse text={locale === 'en' ? 'View' : 'Ver'}>
					{data && data.edges ? (
						data.edges.map((edge, i) => (
							<Project
								key={i}
								link={'/work/' + slugify(edge.node.title)}
								image={edge.node.featuredImage.node.sourceUrl}
								darkText={edge.node.darkText}
								client={edge.node.title}
								title={edge.node.projects.title}
								category={edge.node.category}
								tags={edge.node.tags.nodes.map(tag => tag.name)}
							/>
						))
					) : (
						<p>
							No projects found.
						</p>
					)}
				</FollowMouse>
			</section>

			<ContactMarquee />

		</Layout>
    )
}

export async function getStaticProps({ locale }) {
	const res = await getProjects(locale)
	const data = res

	return {
		props: {
			data,
			messages: (await import(`../../i18n/${locale}.json`)).default
		}
	}
}