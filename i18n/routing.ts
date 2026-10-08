import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
	locales: ['en', 'pt'],
	defaultLocale: 'en',

	// english lives at the root (/about), portuguese under /pt (/pt/about)
	localePrefix: 'as-needed',
	localeDetection: false
})
