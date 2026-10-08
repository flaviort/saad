'use client'

// libraries
import { GoogleTagManager } from '@next/third-parties/google'

// consent
import { useCookieConsent } from '@/components/cookies/consent'

// tag manager only loads once the visitor accepts cookies
export default function Analytics() {
    const hasConsent = useCookieConsent()

    if (!hasConsent) return null

    return <GoogleTagManager gtmId='GTM-W7HLMBNK' />
}
