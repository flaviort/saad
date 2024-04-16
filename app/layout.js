// libraries
import { GoogleTagManager } from '@next/third-parties/google'

// components
import CustomScrollbar from '@/components/utils/custom-scrollbar'
import SmoothScrolling from '@/components/utils/smooth-scrolling'
import Opening from '@/components/opening'
import Menu from '@/components/menu'

// css
import '@/assets/css/normalize.min.css'
import '@/assets/scss/main.scss'

// fonts
import localFont from 'next/font/local'

const antarctica = localFont({
    src: '../assets/fonts/Antarctica-Regular.woff2'
})

export default function RootLayout({ children }) {
    return (
        <html lang='en'>
            <body>
                <div className={antarctica.className}>

                    <Opening />

                    <Menu />

                    <SmoothScrolling>

                        <CustomScrollbar />

                        <main role='main' data-scroll-container>

                            <GoogleTagManager gtmId='GTM-W7HLMBNK' />

                            {children}

                        </main>

                    </SmoothScrolling>

                </div>
            </body>
        </html>
    )
}