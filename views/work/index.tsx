'use client'

// libraries
import clsx from 'clsx'

// i18n
import { useTranslations } from 'next-intl'

// components
import Layout from '@/layout'
import FollowMouse from '@/components/utils/follow-mouse'
import Project from '@/components/project'
import ContactMarquee from '@/components/contact-marquee'

// types
import type { ProjectsResponse } from '@/types/wordpress'

// css
import styles from './work.module.scss'
import { slugify } from '@/utils/functions'

type WorkProps = {
	data: ProjectsResponse
}

export default function Work({ data }: WorkProps) {

	const t = useTranslations('Work')

    return (
		<Layout>

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
				<FollowMouse text={t('view')}>
					{data && data.edges ? (
						data.edges.map((edge, i) => (
							<Project
								key={i}
								link={'/work/' + slugify(edge.node.title)}
								image={edge.node.featuredImage?.node?.sourceUrl}
								darkText={edge.node.projects?.darkText || false}
								title={edge.node.projects?.title}
								subtitle={edge.node.projects?.subtitle}
								category={edge.node.projects?.category}
								tags={edge.node.projects?.tags?.map(tag => tag.tag) || []}
								eager={i === 0}
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
