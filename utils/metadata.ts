import type { Metadata } from 'next'
import type { Locale } from 'next-intl'

// i18n
import { localeTags } from '@/i18n/locale'

export const siteName = 'Saad'

const defaultImage = {
	url: '/img/og-image.gif',
	width: 1280,
	height: 720,
	alt: 'Saad'
}

// absolute base for og:image / og:url (set NEXT_PUBLIC_SITE_URL to the live domain)
export const siteUrl = new URL(
	process.env.NEXT_PUBLIC_SITE_URL ||
	(process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
	'http://localhost:3000'
)

// only production gets indexed, preview and branch deployments (stage) stay out of search results.
// VERCEL_ENV is unset locally, so local builds behave like production
export const isIndexable = !process.env.VERCEL_ENV || process.env.VERCEL_ENV === 'production'

// english has no prefix, portuguese lives under /pt
export const localizedPath = (locale: Locale, path: string) => (locale === 'pt' ? `/pt${path === '/' ? '' : path}` : path)

export const absoluteUrl = (path: string) => new URL(path, siteUrl).toString()

type PageMetadataOptions = {
	locale: Locale
	path?: string
	title: string
	description: string
	// defaults to the animated brand card
	image?: { url: string, width?: number, height?: number, alt?: string }
	// languages this page exists in (every page has both, except projects missing a translation)
	locales?: readonly Locale[]
}

export function pageMetadata({ locale, path = '/', title, description, image = defaultImage, locales = ['en', 'pt'] }: PageMetadataOptions): Metadata {
	// the page topic goes first so it survives truncation in search results, the home page leads with the brand
	const fullTitle = path === '/' ? `${siteName} | ${title}` : `${title} | ${siteName}`
	const url = localizedPath(locale, path)

	return {
		title: fullTitle,
		description,
		alternates: {
			canonical: url,
			languages: {
				'x-default': localizedPath(locales.includes('en') ? 'en' : locale, path),
				...Object.fromEntries(locales.map(other => [other, localizedPath(other, path)]))
			}
		},
		openGraph: {
			type: 'website',
			locale: localeTags[locale].openGraph,
			alternateLocale: Object.entries(localeTags)
				.filter(([other]) => other !== locale)
				.map(([, tags]) => tags.openGraph),
			title: fullTitle,
			description,
			url,
			siteName,
			images: [image]
		},
		twitter: {
			card: 'summary_large_image',
			title: fullTitle,
			description,
			images: [image.url]
		}
	}
}
