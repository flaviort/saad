'use client'

// libraries
import { createContext, use, useEffect, useEffectEvent, useState, type ReactNode } from 'react'

// moments the page animations hook into:
// intro-done: the opening logo animation finished (first visit only)
// page-enter: the page curtain covers the screen and the new page is ready
export type SiteEvent = 'intro-done' | 'page-enter'

type Listener = () => void

type SiteEvents = {
    emit: (event: SiteEvent) => void
    subscribe: (event: SiteEvent, listener: Listener) => () => void
}

const SiteEventsContext = createContext<SiteEvents | null>(null)

function createSiteEvents(): SiteEvents {
    const listeners = new Map<SiteEvent, Set<Listener>>()

    return {
        emit(event) {
            listeners.get(event)?.forEach(listener => listener())
        },
        subscribe(event, listener) {
            const set = listeners.get(event) ?? new Set()
            set.add(listener)
            listeners.set(event, set)

            return () => {
                set.delete(listener)
            }
        }
    }
}

export function SiteEventsProvider({ children }: { children: ReactNode }) {

    // one emitter per mounted layout
    const [events] = useState(createSiteEvents)

    return (
        <SiteEventsContext value={events}>
            {children}
        </SiteEventsContext>
    )
}

export function useSiteEvents() {
    const events = use(SiteEventsContext)

    if (!events) {
        throw new Error('useSiteEvents must be used inside <SiteEventsProvider>')
    }

    return events
}

// runs the listener every time the event fires, unsubscribes on unmount
export function useSiteEvent(event: SiteEvent, listener: Listener) {
    const { subscribe } = useSiteEvents()
    const onEvent = useEffectEvent(listener)

    useEffect(() => subscribe(event, () => onEvent()), [event, subscribe])
}
