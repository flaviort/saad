import { hasLocale, type Locale } from 'next-intl'
import { routing } from './routing'

// route params are plain strings, narrow them to a supported locale
export async function resolveLocale(params: Promise<{ locale: string }>): Promise<Locale> {
	const { locale } = await params

	return hasLocale(routing.locales, locale) ? locale : routing.defaultLocale
}

// how each language names itself (used by the language switcher)
export const localeNames: Record<Locale, string> = {
	en: 'English',
	pt: 'Português'
}

// region tags for <html lang> and og:locale
export const localeTags: Record<Locale, { html: string, openGraph: string }> = {
	en: { html: 'en-US', openGraph: 'en_US' },
	pt: { html: 'pt-BR', openGraph: 'pt_BR' }
}
