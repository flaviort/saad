import type { Metadata } from 'next'
import type { Locale } from 'next-intl'

// i18n
import { localeTags } from '@/i18n/locale'

const siteName = 'Saad'

const defaultTitle = 'Impactful Tailored Brands'
const defaultDescription = 'Saad® is an internationally award-winning boutique consultancy in business & brand innovation building organizations that disrupt markets, fuel genuine growth, and set new benchmarks — crafted for the future, never for the ordinary.'

const image = '/img/og-image.gif'

// absolute base for og:image / og:url (set NEXT_PUBLIC_SITE_URL to the live domain)
export const siteUrl = new URL(
	process.env.NEXT_PUBLIC_SITE_URL ||
	(process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
	'http://localhost:3000'
)

// english has no prefix, portuguese lives under /pt
const localizedPath = (locale: Locale, path: string) => (locale === 'pt' ? `/pt${path === '/' ? '' : path}` : path)

type PageMetadataOptions = {
	locale: Locale
	path?: string
	title?: string
	description?: string
}

export function pageMetadata({ locale, path = '/', title, description }: PageMetadataOptions): Metadata {
	const fullTitle = `${siteName} | ${title ?? defaultTitle}`
	const pageDescription = description ?? defaultDescription
	const url = localizedPath(locale, path)

	return {
		title: fullTitle,
		description: pageDescription,
		alternates: {
			canonical: url,
			languages: {
				en: localizedPath('en', path),
				pt: localizedPath('pt', path)
			}
		},
		openGraph: {
			type: 'website',
			locale: localeTags[locale].openGraph,
			title: fullTitle,
			description: pageDescription,
			url,
			siteName,
			images: [image]
		},
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description: pageDescription,
			images: [image]
		}
	}
}
