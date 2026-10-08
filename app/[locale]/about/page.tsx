// libraries
import type { Metadata } from 'next'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'

// i18n
import { resolveLocale } from '@/i18n/locale'

// utils
import { pageMetadata } from '@/utils/metadata'
import { breadcrumbs, founder, organizationId, webPage } from '@/utils/structured-data'
import routes from '@/utils/routes'

// types
import type { ListSectionData, ListSectionItem } from '@/components/list-section'

// components
import JsonLd from '@/components/json-ld'

// views
import About from '@/views/about'

export async function generateMetadata({ params }: PageProps<'/[locale]/about'>): Promise<Metadata> {
	const locale = await resolveLocale(params)
	const t = await getTranslations({ locale, namespace: 'About' })

	return pageMetadata({
		locale,
		path: '/about',
		title: t('pageTitle'),
		description: t('pageDescription')
	})
}

// a translated section from en.json / pt.json
type TranslatedSection = {
	title: string
	Sub_item: {
		sub_title?: string
		items: ListSectionItem[]
	}[]
}

// turn a translated section into the shape <ListSection /> expects
const toListSection = (section: TranslatedSection): ListSectionData => ({
	title: section.title,
	infos: section.Sub_item.map(category => ({
		subTitle: category.sub_title,
		items: category.items.map(item => ({ year: item.year, text: item.text }))
	}))
})

export default async function Page({ params }: PageProps<'/[locale]/about'>) {
	const locale = await resolveLocale(params)
	setRequestLocale(locale)

	const { About: messages } = await getMessages({ locale })

	const t = await getTranslations({ locale, namespace: 'About' })
	const tMenu = await getTranslations({ locale, namespace: 'Menu.Items' })
	const tSeo = await getTranslations({ locale, namespace: 'Seo' })

	return (
		<>
			<JsonLd data={[
				webPage({
					locale,
					path: routes.about,
					type: 'AboutPage',
					name: t('pageTitle'),
					description: t('pageDescription'),
					extra: { mainEntity: { '@id': organizationId } }
				}),
				founder(tSeo('founderTitle')),
				breadcrumbs(locale, [
					{ name: tMenu('home'), path: routes.home },
					{ name: tMenu('about'), path: routes.about }
				])
			]} />

			<About
			services={toListSection(messages.Services)}
			awards={toListSection(messages.Awards)}
			talks={toListSection(messages.Talks)}
			publications={toListSection(messages.Publications)}
			/>
		</>
	)
}
