// libraries
import type { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

// i18n
import { resolveLocale } from '@/i18n/locale'

// utils
import { getProjects } from '@/utils/graphql'
import { pageMetadata } from '@/utils/metadata'
import { slugify } from '@/utils/functions'

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

export async function generateMetadata({ params }: PageProps<'/[locale]/work/[client]'>): Promise<Metadata> {
	const locale = await resolveLocale(params)
	const { client } = await params
	const project = await getProject(locale, client)

	if (!project) return {}

	return pageMetadata({
		locale,
		path: `/work/${client}`,
		title: project.data.node.title,
		description: project.data.node.projects?.title || project.data.node.title
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

	return <WorkInner {...project} />
}
