// libraries
import type { ReactNode } from 'react'

// components
import Footer from '@/components/footer'

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <>
            { children }

            <Footer />
        </>
    )
}
