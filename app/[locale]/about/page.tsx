// libraries
import type { Metadata } from 'next'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'

// i18n
import { resolveLocale } from '@/i18n/locale'

// utils
import { pageMetadata } from '@/utils/metadata'

// types
import type { ListSectionData, ListSectionItem } from '@/components/list-section'

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

	return (
		<About
			services={toListSection(messages.Services)}
			awards={toListSection(messages.Awards)}
			talks={toListSection(messages.Talks)}
			publications={toListSection(messages.Publications)}
		/>
	)
}
