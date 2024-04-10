// libraries
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

export default function SEOContainer({ pageTitle, pageDescription, bodyClass }) {

    const router = useRouter()
    const { asPath } = useRouter()

    const origin = typeof window !== 'undefined' && window.location.origin ? window.location.origin : ''
    const urlAddress = `${origin}${asPath}`

    const siteName = 'Saad'

	const defaultPageTitle = 'Impactful Tailored Brands'
	const defaultPageDesc = 'Saad® is an internationally award-winning boutique brand consultancy specialized in building and transforming the future of businesses.'

	const image = router.basePath + '/img/og-image.gif'

    // update body class
    useEffect(() => {
        document.body.classList.add(bodyClass)

        const handlePageTransition = () => {
            document.body.classList.value = ''
    
            setTimeout(() => {
                document.body.classList.add(bodyClass)
            }, 10)
        }
    
        document.addEventListener('page-transition', handlePageTransition)
    
        return () => {
            document.removeEventListener('page-transition', handlePageTransition)
        }
    }, [router, bodyClass])    

    return (
        <Head>
			<meta httpEquiv='Content-Type' content='text/html; charset=utf-8' />
			<meta name='viewport' content='width=device-width, initial-scale=1, shrink-to-fit=no' />
			<meta name='format-detection' content='telephone=no' />
			<meta name='author' content='The Skyline Agency' />
			<link rel='shortcut icon' href='/favicon.svg' />

            <title>{siteName + ' | ' + (pageTitle ?? defaultPageTitle)}</title>
            <meta name='description' content={(pageDescription ?? defaultPageDesc)} />

            <meta name='Robots' content='all' />

            {/* facebook */}
            <meta property='og:locale' content='en-US' />
            <meta property='og:type' content='website' />
            <meta property='og:image:width' content='1200' />
            <meta property='og:image:height' content='630' />
            <meta property='og:title' content={siteName + ' | ' + (pageTitle ?? defaultPageTitle)} />
            <meta property='og:description' content={(pageDescription ?? defaultPageDesc)} />
            <meta property='og:url' content={urlAddress} />
            <meta property='og:site_name' content={siteName} />
            <meta property='og:image:secure_url' content={image} />

            {/* twitter */}
            <meta name='twitter:title' content={siteName + ' | ' + (pageTitle ?? defaultPageTitle)} />
            <meta name='twitter:description' content={(pageDescription ?? defaultPageDesc)} />
            <meta name='twitter:url' content={urlAddress} />
            <meta name='twitter:image' content={image} />
            <meta name='twitter:card' content='summary' />

        </Head>
    )
}