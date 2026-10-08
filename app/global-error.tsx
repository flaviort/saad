'use client'

// last resort when the root layout itself fails, so no fonts, styles or translations
export default function GlobalError({ reset }: { error: Error & { digest?: string }, reset: () => void }) {
	return (
		<html lang='en-US'>
			<body style={{ margin: 0, minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#0d0e13', color: '#e4dcd1', fontFamily: 'sans-serif' }}>
				<main style={{ textAlign: 'center', padding: '1rem' }}>
					<h1>Something went wrong</h1>
					<p>Algo deu errado</p>
					<button type='button' onClick={reset} style={{ color: 'inherit', background: 'none', border: '1px solid currentColor', padding: '.5rem 1rem', cursor: 'pointer' }}>
						Try again · Tentar novamente
					</button>
				</main>
			</body>
		</html>
	)
}
