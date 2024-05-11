// libraries
import clsx from 'clsx'

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
    return (
		<Layout
			bodyClass='work'
			pageTitle='Work'
			pageDescription='Creating the future for ambitious brands. We develop projects that transform visions and businesses.'
		>

			<section className={clsx(styles.topPart, 'padding-top-bigger padding-bottom-big')}>
				<div className='container'>
					<div className='grid-container'>
						<div className='grid-md-2-7'>
							<h2 className='font-big-2'>
								Creating the future for ambitious brands. <br />
								We develop projects that transform visions and businesses.
							</h2>
						</div>
					</div>
				</div>
			</section>

			<section className={styles.projects}>
				<FollowMouse text='View'>
					{data.edges.map((edge, i) => (
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
					))}
				</FollowMouse>
			</section>

			<ContactMarquee />

		</Layout>
    )
}

export async function getStaticProps({ locale }) {
	const res = await getProjects()
	const data = res

	return {
		props: {
			data,
			messages: (await import(`../../i18n/${locale}.json`)).default
		}
	}
}