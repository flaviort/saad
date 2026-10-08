// libraries
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// i18n
import { resolveLocale } from '@/i18n/locale'

// utils
import { pageMetadata } from '@/utils/metadata'

// views
import Contact from '@/views/contact'

export async function generateMetadata({ params }: PageProps<'/[locale]/contact'>): Promise<Metadata> {
	const locale = await resolveLocale(params)
	const t = await getTranslations({ locale, namespace: 'Contact' })

	return pageMetadata({
		locale,
		path: '/contact',
		title: t('pageTitle'),
		description: t('pageDescription')
	})
}

export default async function Page({ params }: PageProps<'/[locale]/contact'>) {
	const locale = await resolveLocale(params)
	setRequestLocale(locale)

	return <Contact />
}
