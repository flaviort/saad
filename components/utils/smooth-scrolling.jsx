'use client'

import { ReactLenis } from '@studio-freight/react-lenis'

export default function SmoothScrolling({ children }) {
    return (
        <ReactLenis
            root
            options={{
                duration: 2,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            }}
        >
            {children}
        </ReactLenis>
    )
}