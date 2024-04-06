// components
import SeoContainer from '@/components/utils/seo-container'
import Footer from '@/components/footer'

export default function Layout({ bodyClass, pageTitle, pageDescription, children }) {
    return (
        <>
            <SeoContainer
				bodyClass={bodyClass}
				pageTitle={pageTitle}
				pageDescription={pageDescription}
			/>

            { children }

            <Footer />
        </>
    )
}