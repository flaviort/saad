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

	const entry = (locale: Locale, path: string, otherLocales: readonly Locale[] = routing.locales) => ({
		url: new URL(localizedPath(locale, path), siteUrl).toString(),
		alternates: {
			languages: Object.fromEntries(
				otherLocales.map(other => [other, new URL(localizedPath(other, path), siteUrl).toString()])
			)
		}
	})

	const staticEntries = routing.locales.flatMap(locale => pages.map(path => entry(locale, path)))

	// projects exist per language, so they only list their own locale
	const projectEntries = (await Promise.all(
		routing.locales.map(async locale => {
			const { edges } = await getProjects(locale)

			return edges.map(edge => entry(locale, `/work/${slugify(edge.node.title)}`, [locale]))
		})
	)).flat()

	return [...staticEntries, ...projectEntries]
}
