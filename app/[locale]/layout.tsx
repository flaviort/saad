// libraries
import type { Metadata } from 'next'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import localFont from 'next/font/local'

// i18n
import { routing } from '@/i18n/routing'

// components
import SmoothScrolling from '@/components/utils/smooth-scrolling'
import Opening from '@/components/opening'
import PageTransition from '@/components/page-transition'
import Menu from '@/components/menu'
import Cookies from '@/components/cookies'
import Analytics from '@/components/analytics'
import { SiteEventsProvider } from '@/components/site-events'

// i18n
import { localeTags, resolveLocale } from '@/i18n/locale'

// utils
import { pageMetadata, siteUrl } from '@/utils/metadata'

// css
import '@/assets/css/normalize.min.css'
import '@/assets/scss/main.scss'

const antarctica = localFont({
	src: '../../assets/fonts/Antarctica-Regular.woff2'
})

export const dynamicParams = false

export function generateStaticParams() {
	return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: LayoutProps<'/[locale]'>): Promise<Metadata> {
	const locale = await resolveLocale(params)

	return {
		...pageMetadata({ locale }),
		metadataBase: siteUrl,
		authors: [{ name: 'The Skyline Agency' }],
		formatDetection: { telephone: false },
		robots: { index: true, follow: true },
		icons: { icon: '/favicon.svg' }
	}
}

export default async function LocaleLayout({ children, params }: LayoutProps<'/[locale]'>) {
	const { locale } = await params

	if (!hasLocale(routing.locales, locale)) {
		notFound()
	}

	// enables static rendering for everything below
	setRequestLocale(locale)

	return (
		<html lang={localeTags[locale].html}>
			<body>
				<NextIntlClientProvider>
					<SiteEventsProvider>
						<div className={antarctica.className}>

							<Opening />

							<Menu />

							<Cookies />

							<Analytics />

							<SmoothScrolling>

								<main role='main'>
									<PageTransition>
										{children}
									</PageTransition>
								</main>

							</SmoothScrolling>

						</div>
					</SiteEventsProvider>
				</NextIntlClientProvider>
			</body>
		</html>
	)
}
