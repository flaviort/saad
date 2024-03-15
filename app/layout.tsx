// import libraries
import type { Metadata } from 'next'

// import fonts
import localFont from 'next/font/local'

const antarctica = localFont({
    src: '../fonts/Antarctica-Regular.woff2',
	display: 'swap',
	variable: '--font-antarctica'
})

// define metadata
export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
}

// import css
//import '@/styles/plugins/normalize.min.css'
//import '@/styles/plugins/bootstrap-grid.css'
import '@/styles/main.scss'

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={antarctica.className}>
				{children}
			</body>
		</html>
	)
}