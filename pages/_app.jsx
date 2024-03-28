// libraries
import { RecoilRoot } from 'recoil'
import { useEffect } from 'react'

// components
import SmoothScrolling from '@/components/utils/smooth-scrolling'
import PageTransition from '@/components/page-transition'
import Menu from '@/components/menu'
import Footer from '@/components/footer'

// css
import '@/assets/css/normalize.min.css'
import '@/assets/scss/main.scss'

// fonts
import localFont from 'next/font/local'

const antarctica = localFont({
    src: '../assets/fonts/Antarctica-Regular.woff2'
})

export default function App({ Component, pageProps, router }) {

	useEffect(() => {
		const message = 'Design Gabriel Leon 🔗 www.behance.net/leonngabr \nCode Senz Design 🔗 www.senzdsn.com'
		const style = 'color: #f8f8f8; font-size: 12px; font-weight: bold; background-color: #0d0e13; padding: 8px'
		console.log(`%c${message}`, style)
	}, [])

	return (
		<div className={antarctica.className}>
			<RecoilRoot>

				<PageTransition />

				<Menu />

				<SmoothScrolling>

					<main role='main'>
						<Component key={router.route} {...pageProps} />
					</main>

					<Footer />

				</SmoothScrolling>

			</RecoilRoot>
		</div>
	)
}