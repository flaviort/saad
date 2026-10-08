// libraries
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// i18n
import { resolveLocale } from '@/i18n/locale'

// utils
import { getProjects } from '@/utils/graphql'
import { pageMetadata } from '@/utils/metadata'
import { webPage } from '@/utils/structured-data'
import routes from '@/utils/routes'

// components
import JsonLd from '@/components/json-ld'

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

	const t = await getTranslations({ locale, namespace: 'Home' })

	return (
		<>
			<JsonLd data={[
				webPage({
					locale,
					path: routes.home,
					name: t('pageTitle'),
					description: t('pageDescription')
				})
			]} />

			<Home data={data} />
		</>
	)
}
