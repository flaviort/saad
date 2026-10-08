import { notFound } from 'next/navigation'

// any unknown path inside a locale renders app/[locale]/not-found.jsx
export default function CatchAll() {
	notFound()
}
