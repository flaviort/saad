// libraries
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// i18n
import { resolveLocale } from '@/i18n/locale'

// utils
import { getProjects } from '@/utils/graphql'
import { pageMetadata } from '@/utils/metadata'

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

	return <Work data={data} />
}
