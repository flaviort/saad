// libraries
import type { MetadataRoute } from 'next'

// utils
import { siteUrl } from '@/utils/metadata'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/api/'
		},
		sitemap: new URL('/sitemap.xml', siteUrl).toString()
	}
}
