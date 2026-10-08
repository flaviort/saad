'use client'

// libraries
import { useTranslations } from 'next-intl'

// i18n
import { Link } from '@/i18n/navigation'

export default function Error() {
	const t = useTranslations('NotFound')

	return (
		<div>
			<h1>500</h1>
			<p>{t('message')}</p>
			<Link href='/'>{t('button')}</Link>
		</div>
	)
}
