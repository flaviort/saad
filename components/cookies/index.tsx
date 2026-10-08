'use client'

// libraries
import clsx from 'clsx'
import { useState, useRef, useSyncExternalStore } from 'react'
import gsap from 'gsap'
import { useTranslations } from 'next-intl'

// css
import styles from './cookies.module.scss'

const subscribeToStorage = (callback: () => void) => {
    window.addEventListener('storage', callback)
    return () => window.removeEventListener('storage', callback)
}

export default function Cookies() {
	const [isDismissed, setIsDismissed] = useState(false)
	const cookiesRef = useRef(null)

    const t = useTranslations('Cookies')

    // only check localStorage if cookies were previously accepted (null on the server)
    const consent = useSyncExternalStore(
        subscribeToStorage,
        () => localStorage.getItem('saad-gdpr-consent'),
        () => null
    )

    const isVisible = !isDismissed && consent !== 'accepted'

    const handleConsent = (accepted: boolean) => {
        // Create fadeOut animation
        const tl = gsap.timeline({
            onComplete: () => {
                // Store consent data after animation completes
                if (accepted) {
                    // only store in localStorage if user accepts
                    localStorage.setItem('saad-gdpr-consent', 'accepted')
                    
                    // initialize your analytics/tracking services
                    //console.log('Cookies accepted - initialize tracking')
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
