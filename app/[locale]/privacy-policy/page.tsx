// libraries
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// i18n
import { resolveLocale } from '@/i18n/locale'

// utils
import { pageMetadata } from '@/utils/metadata'

// views
import PrivacyPolicy from '@/views/privacy-policy'

export async function generateMetadata({ params }: PageProps<'/[locale]/privacy-policy'>): Promise<Metadata> {
	const locale = await resolveLocale(params)
	const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' })

	return pageMetadata({
		locale,
		path: '/privacy-policy',
		title: t('pageTitle'),
		description: t('pageDescription')
	})
}

export default async function Page({ params }: PageProps<'/[locale]/privacy-policy'>) {
	const locale = await resolveLocale(params)
	setRequestLocale(locale)

	return <PrivacyPolicy />
}
