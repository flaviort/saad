import type { routing } from '@/i18n/routing'
import type messages from '@/i18n/en.json'

// typed locales and translation keys for next-intl (en.json is the source of truth)
declare module 'next-intl' {
	interface AppConfig {
		Locale: (typeof routing.locales)[number]
		Messages: typeof messages
	}
}
