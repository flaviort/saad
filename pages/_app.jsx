// libraries
import { useEffect } from 'react'
import { GoogleTagManager } from '@next/third-parties/google'

// hooks
import { usePageTransitionFix } from '@/utils/transition-fix'

// components
import CustomScrollbar from '@/components/utils/custom-scrollbar'
import SmoothScrolling from '@/components/utils/smooth-scrolling'
import Opening from '@/components/opening'
import PageTransition from '@/components/page-transition'
import Menu from '@/components/menu'
//import Footer from '@/components/footer'

// css
import '@/assets/css/normalize.min.css'
import '@/assets/scss/main.scss'

// fonts
import localFont from 'next/font/local'

const antarctica = localFont({
    src: '../assets/fonts/Antarctica-Regular.woff2'
})

export default function App({ Component, pageProps, router }) {

	usePageTransitionFix()

	useEffect(() => {
		const message = 'Design Gabriel Leon 🔗 www.behance.net/leonngabr \nCode Senz Design 🔗 www.senzdsn.com'
		const style = 'color: #f8f8f8; font-size: 12px; font-weight: bold; background-color: #0d0e13; padding: 8px'
		console.log(`%c${message}`, style)
	}, [])

	return (
		<div className={antarctica.className}>

			<Opening />

			{/* <PageTransition /> */}

			<Menu />

			<SmoothScrolling>

				<CustomScrollbar />

				<main role='main' data-scroll-container>

					<GoogleTagManager gtmId='GTM-W7HLMBNK' />

					<PageTransition>
						<Component key={router.route} {...pageProps} />
					</PageTransition>

				</main>

			</SmoothScrolling>

		</div>
	)
}