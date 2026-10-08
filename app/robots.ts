// libraries
import type { MetadataRoute } from 'next'

// utils
import { isIndexable, siteUrl } from '@/utils/metadata'

export default function robots(): MetadataRoute.Robots {
	// preview and branch deployments (stage) stay out of search engines
	if (!isIndexable) {
		return { rules: { userAgent: '*', disallow: '/' } }
	}

	return {
		rules: {
			userAgent: '*',
			allow: '/',
			disallow: '/api/'
		},
		sitemap: new URL('/sitemap.xml', siteUrl).toString()
	}
}
