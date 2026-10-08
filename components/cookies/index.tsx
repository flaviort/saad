'use client'

// libraries
import clsx from 'clsx'
import { useState, useRef } from 'react'
import gsap from 'gsap'
import { useTranslations } from 'next-intl'

// consent
import { acceptCookies, useCookieConsent } from './consent'

// css
import styles from './cookies.module.scss'

export default function Cookies() {
	const [isDismissed, setIsDismissed] = useState(false)
	const cookiesRef = useRef<HTMLElement>(null)

    const t = useTranslations('Cookies')

    // a declined banner comes back on the next visit, an accepted one doesn't
    const hasConsent = useCookieConsent()
    const isVisible = !isDismissed && !hasConsent

    const handleConsent = (accepted: boolean) => {
        // Create fadeOut animation
        const tl = gsap.timeline({
            onComplete: () => {
                // store consent after the animation, this also loads analytics
                if (accepted) {
                    acceptCookies()
                }
                
                // hide the banner after animation
                setIsDismissed(true)
            }
        })

        // Fade out animation
        tl.to(cookiesRef.current, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            ease: 'power2.inOut'
        })
    }

    if (!isVisible) return null

	return (
		<aside ref={cookiesRef} className={styles.cookies} style={{ viewTransitionName: 'cookie-banner' }}>
			<div className={styles.wrapper}>

				<p className='font-small'>
					{t('message')}
				</p>

				<div className={clsx(styles.buttons, 'font-small')}>

					<button onClick={() => handleConsent(true)}>
						{t('accept')}
					</button>

					<button onClick={() => handleConsent(false)}>
						{t('reject')}
					</button>

				</div>
				
			</div>
		</aside>
	)
}
