// libraries
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// i18n
import { resolveLocale } from '@/i18n/locale'

// utils
import { getProjects } from '@/utils/graphql'
import { pageMetadata } from '@/utils/metadata'

// views
import Home from '@/views/home'

export async function generateMetadata({ params }: PageProps<'/[locale]'>): Promise<Metadata> {
	const locale = await resolveLocale(params)
	const t = await getTranslations({ locale, namespace: 'Home' })

	return pageMetadata({
		locale,
		path: '/',
		title: t('pageTitle'),
		description: t('pageDescription')
	})
}

export default async function Page({ params }: PageProps<'/[locale]'>) {
	const locale = await resolveLocale(params)
	setRequestLocale(locale)

	const data = await getProjects(locale)

	return <Home data={data} />
}
