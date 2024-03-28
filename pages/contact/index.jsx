import clsx from 'clsx'

// components
import SeoContainer from '@/components/utils/seo-container'

// svgs


// css
import styles from './contact.module.scss'

export default function Contact() {

    return (
		<>
			<SeoContainer
				pageTitle='Get in touch with us'
				pageDescription="Simple, fast, and efficient. Fill out our form and get in touch with us."
			/>

			<section style={{backgroundColor: '#333', height: '70vh'}}></section>
			<section style={{backgroundColor: '#555', height: '70vh'}}></section>
			<section style={{backgroundColor: '#777', height: '70vh'}}></section>
		</>
    )
}