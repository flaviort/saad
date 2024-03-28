// libraries
import { RecoilRoot } from 'recoil'

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

	return (
		<div className={antarctica.className}>
			<RecoilRoot>

				<PageTransition />

				<Menu />

				<SmoothScrolling>
					<div id='website-wrapper'>

						<main role='main'>
							<Component key={router.route} {...pageProps} />
						</main>

						<Footer />

					</div>
				</SmoothScrolling>

			</RecoilRoot>
		</div>
	)
}