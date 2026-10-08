import Link from 'next/link'

// fallback for requests outside the locale routing (paths with a file extension, etc.)
export default function GlobalNotFound() {
	return (
		<html lang='en-US'>
			<body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0d0e13', color: '#e4dcd1', fontFamily: 'sans-serif' }}>
				<main style={{ textAlign: 'center' }}>
					<h1>404</h1>
					<p>This page could not be found.</p>
					<Link href='/' style={{ color: 'inherit' }}>Back to home</Link>
				</main>
			</body>
		</html>
	)
}
