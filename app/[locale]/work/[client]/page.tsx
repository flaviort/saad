// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

// i18n
import { resolveLocale } from '@/i18n/locale'
import { routing } from '@/i18n/routing'

// utils
import { getProjects } from '@/utils/graphql'
import { pageMetadata } from '@/utils/metadata'
import { slugify } from '@/utils/functions'
import { breadcrumbs, project as projectSchema, webPage } from '@/utils/structured-data'
import routes from '@/utils/routes'

// types
import type { ProjectNode } from '@/types/wordpress'

// components
import JsonLd from '@/components/json-ld'

// views
import WorkInner from '@/views/work-inner'

// only the projects returned by WordPress at build time exist
export const dynamicParams = false

export async function generateStaticParams({ params }: { params: { locale: string } }) {
	const res = await getProjects(await resolveLocale(Promise.resolve(params)))

	return res.edges.map(edge => ({ client: slugify(edge.node.title) }))
}

// the project plus its neighbours for the previous / next links
async function getProject(locale: Locale, slug: string) {
	const projects = (await getProjects(locale)).edges
	const currentIndex = projects.findIndex(edge => slugify(edge.node.title) === slug)

	if (currentIndex === -1) return null

	const prevIndex = (currentIndex - 1 + projects.length) % projects.length
	const nextIndex = (currentIndex + 1) % projects.length

	return {
		data: projects[currentIndex],
		prevProject: projects[prevIndex].node,
		nextProject: projects[nextIndex].node
	}
}

// the translated project name plus a search snippet built from its subtitle and category
async function describeProject(locale: Locale, node: ProjectNode) {
	const fields = node.projects
	const name = fields?.title?.trim() || node.title
	const subtitle = fields?.subtitle?.trim()
	const category = fields?.category?.trim()

	if (!subtitle || !category) {
		const tHome = await getTranslations({ locale, namespace: 'Home' })
		return { name, title: name, description: tHome('pageDescription') }
	}

	const t = await getTranslations({ locale, namespace: 'Seo' })

	return {
		name,
		title: `${name}: ${subtitle}`,
		description: t('projectDescription', {
			title: name,
			subtitle,
			// mid-sentence in portuguese ("Case de agronegócio"), sentence start in english
			category: locale === 'pt' ? category.toLocaleLowerCase('pt-BR') : category
		})
	}
}

export async function generateMetadata({ params }: PageProps<'/[locale]/work/[client]'>): Promise<Metadata> {
	const locale = await resolveLocale(params)
	const { client } = await params
	const project = await getProject(locale, client)

	if (!project) return {}

	const { title, description } = await describeProject(locale, project.data.node)
	const image = project.data.node.featuredImage?.node?.sourceUrl

	// only point search engines at translations that exist
	const locales = (await Promise.all(routing.locales.map(async other => (await getProject(other, client)) ? other : null)))
		.filter(other => other !== null)

	return pageMetadata({
		locale,
		path: `${routes.work}/${client}`,
		title,
		description,
		image: image ? { url: image, alt: title } : undefined,
		locales
	})
}

export default async function Page({ params }: PageProps<'/[locale]/work/[client]'>) {
	const locale = await resolveLocale(params)
	const { client } = await params
	setRequestLocale(locale)

	const project = await getProject(locale, client)

	if (!project) {
		notFound()
	}

	const path = `${routes.work}/${client}`
	const { name, title, description } = await describeProject(locale, project.data.node)
	const tMenu = await getTranslations({ locale, namespace: 'Menu.Items' })

	return (
		<>
			<JsonLd data={[
				webPage({ locale, path, name: title, description }),
				projectSchema({ locale, path, project: project.data.node, name, description }),
				breadcrumbs(locale, [
					{ name: tMenu('home'), path: routes.home },
					{ name: tMenu('work'), path: routes.work },
					{ name, path }
				])
			]} />

			<WorkInner {...project} />
		</>
	)
}
