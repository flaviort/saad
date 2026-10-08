// libraries
import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'

// i18n
import { resolveLocale } from '@/i18n/locale'

// utils
import { pageMetadata } from '@/utils/metadata'
import { breadcrumbs, webPage } from '@/utils/structured-data'
import routes from '@/utils/routes'

// components
import JsonLd from '@/components/json-ld'

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

	const t = await getTranslations({ locale, namespace: 'PrivacyPolicy' })
	const tMenu = await getTranslations({ locale, namespace: 'Menu.Items' })

	return (
		<>
			<JsonLd data={[
				webPage({
					locale,
					path: routes.privacy,
					name: t('pageTitle'),
					description: t('pageDescription')
				}),
				breadcrumbs(locale, [
					{ name: tMenu('home'), path: routes.home },
					{ name: t('pageTitle'), path: routes.privacy }
				])
			]} />

			<PrivacyPolicy />
		</>
	)
}
