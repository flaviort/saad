'use client'

// libraries
import { useSyncExternalStore } from 'react'

const storageKey = 'saad-gdpr-consent'
const listeners = new Set<() => void>()

// localStorage can throw (private mode, blocked storage), treat that as no consent
function readConsent() {
    try {
        return localStorage.getItem(storageKey) === 'accepted'
    } catch {
        return false
    }
}

// same-tab changes come from acceptCookies(), other tabs from the storage event
function subscribe(listener: () => void) {
    listeners.add(listener)
    window.addEventListener('storage', listener)

    return () => {
        listeners.delete(listener)
        window.removeEventListener('storage', listener)
    }
}

export function acceptCookies() {
    try {
        localStorage.setItem(storageKey, 'accepted')
    } catch {
        // nothing to persist, consent still applies to this visit
    }

    listeners.forEach(listener => listener())
}

// false on the server and until the visitor accepts
export function useCookieConsent() {
    return useSyncExternalStore(subscribe, readConsent, () => false)
}
