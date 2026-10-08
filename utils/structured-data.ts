// schema.org data for search engines and AI assistants, rendered by components/json-ld

// types
import type { Locale } from 'next-intl'
import type { ProjectNode } from '@/types/wordpress'

// i18n
import { localeTags } from '@/i18n/locale'

// utils
import { absoluteUrl, localizedPath, siteName } from '@/utils/metadata'
import routes from '@/utils/routes'

type Thing = Record<string, unknown>

// stable ids so every page can point at the same organization and website
export const organizationId = absoluteUrl('/#organization')
export const websiteId = absoluteUrl('/#website')
export const founderId = absoluteUrl('/#lucas-saad')

const pageUrl = (locale: Locale, path: string) => absoluteUrl(localizedPath(locale, path))

// the organization and website are the same in every language, so their urls stay on the root
export function organization(description: string): Thing {
	return {
		'@type': 'Organization',
		'@id': organizationId,
		name: siteName,
		url: absoluteUrl(routes.home),
		logo: absoluteUrl('/favicon.svg'),
		image: absoluteUrl('/img/og-image.gif'),
		description,
		email: 'saad@saad.cx',
		address: {
			'@type': 'PostalAddress',
			addressCountry: 'BR'
		},
		founder: { '@id': founderId },
		sameAs: [routes.instagram, routes.linkedin]
	}
}

export function website(): Thing {
	return {
		'@type': 'WebSite',
		'@id': websiteId,
		name: siteName,
		url: absoluteUrl(routes.home),
		inLanguage: Object.values(localeTags).map(tags => tags.html),
		publisher: { '@id': organizationId }
	}
}

export function founder(jobTitle: string): Thing {
	return {
		'@type': 'Person',
		'@id': founderId,
		name: 'Lucas Saad',
		jobTitle,
		worksFor: { '@id': organizationId },
		alumniOf: {
			'@type': 'CollegeOrUniversity',
			name: 'Brunel University London'
		}
	}
}

type WebPageOptions = {
	locale: Locale
	path: string
	type?: 'WebPage' | 'AboutPage' | 'ContactPage' | 'CollectionPage'
	name: string
	description: string
	extra?: Thing
}

export function webPage({ locale, path, type = 'WebPage', name, description, extra }: WebPageOptions): Thing {
	return {
		'@type': type,
		'@id': `${pageUrl(locale, path)}#webpage`,
		url: pageUrl(locale, path),
		name,
		description,
		inLanguage: localeTags[locale].html,
		isPartOf: { '@id': websiteId },
		about: { '@id': organizationId },
		...extra
	}
}

export function breadcrumbs(locale: Locale, trail: { name: string, path: string }[]): Thing {
	return {
		'@type': 'BreadcrumbList',
		itemListElement: trail.map((crumb, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: crumb.name,
			item: pageUrl(locale, crumb.path)
		}))
	}
}

type ProjectOptions = {
	locale: Locale
	path: string
	project: ProjectNode
	name: string
	description: string
}

export function project({ locale, path, project, name, description }: ProjectOptions): Thing {
	const fields = project.projects

	return {
		'@type': 'CreativeWork',
		'@id': `${pageUrl(locale, path)}#project`,
		url: pageUrl(locale, path),
		name,
		headline: fields?.subtitle?.trim() || name,
		description,
		image: project.featuredImage?.node?.sourceUrl,
		genre: fields?.category || undefined,
		inLanguage: localeTags[locale].html,
		creator: { '@id': organizationId },
		mainEntityOfPage: { '@id': `${pageUrl(locale, path)}#webpage` }
	}
}

// a list of projects, for the work page
export function projectList(locale: Locale, items: { name: string, path: string }[]): Thing {
	return {
		'@type': 'ItemList',
		itemListElement: items.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			url: pageUrl(locale, item.path)
		}))
	}
}
