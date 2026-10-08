// libraries
import type { MetadataRoute } from 'next'
import type { Locale } from 'next-intl'

// i18n
import { routing } from '@/i18n/routing'

// utils
import { getProjects } from '@/utils/graphql'
import { localizedPath, siteUrl } from '@/utils/metadata'
import { slugify } from '@/utils/functions'
import routes from '@/utils/routes'

// every page in every language, each entry pointing at its translations
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const pages = [routes.home, routes.work, routes.about, routes.contact, routes.privacy]

	const entry = (locale: Locale, path: string, otherLocales: readonly Locale[] = routing.locales, lastModified?: string | null) => ({
		url: new URL(localizedPath(locale, path), siteUrl).toString(),
		...(lastModified && { lastModified: new Date(`${lastModified}Z`) }),
		alternates: {
			languages: Object.fromEntries(
				otherLocales.map(other => [other, new URL(localizedPath(other, path), siteUrl).toString()])
			)
		}
	})

	const staticEntries = routing.locales.flatMap(locale => pages.map(path => entry(locale, path)))

	// each language has its own WordPress post per project, linked by the shared slug.
	// a project only points at the languages it actually exists in
	const projectsByLocale = await Promise.all(
		routing.locales.map(async locale => ({
			locale,
			slugs: new Map((await getProjects(locale)).edges.map(edge => [slugify(edge.node.title), edge.node.modifiedGmt]))
		}))
	)

	const projectEntries = projectsByLocale.flatMap(({ locale, slugs }) =>
		[...slugs].map(([slug, modified]) => {
			const translations = projectsByLocale.filter(other => other.slugs.has(slug)).map(other => other.locale)

			return entry(locale, `/work/${slug}`, translations, modified)
		})
	)

	return [...staticEntries, ...projectEntries]
}
