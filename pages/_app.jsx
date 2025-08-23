// libraries
import { GoogleTagManager } from '@next/third-parties/google'
import { NextIntlClientProvider } from 'next-intl'

// components
import SmoothScrolling from '@/components/utils/smooth-scrolling'
import Opening from '@/components/opening'
import PageTransition from '@/components/page-transition'
import Menu from '@/components/menu'
import Cookies from '@/components/cookies'

// css
import '@/assets/css/normalize.min.css'
import '@/assets/scss/main.scss'

// fonts
import localFont from 'next/font/local'

const antarctica = localFont({
    src: '../assets/fonts/Antarctica-Regular.woff2'
})

export default function App({ Component, pageProps, router }){
	return (
		<NextIntlClientProvider
			locale={router.locale}
      		messages={pageProps.messages}
			now={new Date(pageProps.now)}
			timeZone='America/Sao_Paulo'
		>
			<div className={antarctica.className}>

				<Opening />

				<Menu />

				<Cookies />

				<SmoothScrolling>

					<main role='main' data-scroll-container>

						<GoogleTagManager gtmId='GTM-W7HLMBNK' />

						<PageTransition>
							<Component key={router.route} {...pageProps} />
						</PageTransition>

					</main>

				</SmoothScrolling>

			</div>
		</NextIntlClientProvider>
	)
}