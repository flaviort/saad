// libraries
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// i18n
import { resolveLocale } from '@/i18n/locale'

// utils
import { getProjects } from '@/utils/graphql'
import { pageMetadata } from '@/utils/metadata'
import { breadcrumbs, projectList, webPage } from '@/utils/structured-data'
import { slugify } from '@/utils/functions'
import routes from '@/utils/routes'

// components
import JsonLd from '@/components/json-ld'

// views
import Work from '@/views/work'

export async function generateMetadata({ params }: PageProps<'/[locale]/work'>): Promise<Metadata> {
	const locale = await resolveLocale(params)
	const t = await getTranslations({ locale, namespace: 'Work' })

	return pageMetadata({
		locale,
		path: '/work',
		title: t('pageTitle'),
		description: t('pageDescription')
	})
}

export default async function Page({ params }: PageProps<'/[locale]/work'>) {
	const locale = await resolveLocale(params)
	setRequestLocale(locale)

	const data = await getProjects(locale)

	const t = await getTranslations({ locale, namespace: 'Work' })
	const tMenu = await getTranslations({ locale, namespace: 'Menu.Items' })

	const projects = data.edges.map(edge => ({
		name: edge.node.projects?.title || edge.node.title,
		path: `${routes.work}/${slugify(edge.node.title)}`
	}))

	return (
		<>
			<JsonLd data={[
				webPage({
					locale,
					path: routes.work,
					type: 'CollectionPage',
					name: t('pageTitle'),
					description: t('pageDescription'),
					extra: { mainEntity: projectList(locale, projects) }
				}),
				breadcrumbs(locale, [
					{ name: tMenu('home'), path: routes.home },
					{ name: tMenu('work'), path: routes.work }
				])
			]} />

			<Work data={data} />
		</>
	)
}
