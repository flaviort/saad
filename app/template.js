'use client'

// libraries
import { useEffect } from 'react'

// components
import PageTransition from '@/components/page-transition'

export default function Template({ children }) {
    
    // console log dev msg
    useEffect(() => {
		const message = 'Design Gabriel Leon 🔗 www.behance.net/leonngabr \nCode Senz Design 🔗 www.senzdsn.com'
		const style = 'color: #f8f8f8; font-size: 12px; font-weight: bold; background-color: #0d0e13; padding: 8px'
		console.log(`%c${message}`, style)
	})

    return (
        <PageTransition>
            {children}
        </PageTransition>
    )
}