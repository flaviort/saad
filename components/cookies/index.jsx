// libraries
import clsx from 'clsx'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// routes / utils
import routes from '@/utils/routes'

// css
import styles from './cookies.module.scss'

export default function Cookies() {
	const [isVisible, setIsVisible] = useState(true)
	const cookiesRef = useRef(null)

    useEffect(() => {
        
        // only check localStorage if cookies were previously accepted
        const consent = localStorage.getItem('saad-gdpr-consent')

        if (consent === 'accepted') {
            setIsVisible(false)
        }
    }, [])

    const handleConsent = (accepted) => {
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
                setIsVisible(false)
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
		<aside ref={cookiesRef} className={styles.cookies}>
			<div className={styles.wrapper}>

				<p>
					Our website uses cookies to improve your experience. By continuing to use our site, you agree to our <Link href={routes.privacy} className='hover-underline-white'>Privacy Policy</Link>.
				</p>

				<div className={clsx(styles.buttons, 'font-small')}>

					<button onClick={() => handleConsent(true)}>
						Accept
					</button>

					<button onClick={() => handleConsent(false)}>
						Reject
					</button>

				</div>
				
			</div>
		</aside>
	)
}
