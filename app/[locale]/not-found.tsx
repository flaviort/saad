// libraries
import { getTranslations } from 'next-intl/server'

// views
import FourOhFour from '@/views/not-found'

// nested not-found files can't export metadata, React hoists this <title> into <head>
export default async function NotFound() {
	const t = await getTranslations('NotFound')

	return (
		<>
			<title>{`Saad | ${t('title')}`}</title>
			<FourOhFour />
		</>
	)
}
