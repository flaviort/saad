import { useEffect, useState } from 'react'
import { PageTransitionAnimation } from '@/components/page-transition'
import { useRouter } from 'next/router'

export default function AnimatedLink({ href, children, onClick, ...props }) {
    
    const router = useRouter()
    const [isAnimating, setIsAnimating] = useState(false)

    useEffect(() => {
        if (isAnimating) {
            setIsAnimating(false)
        }
    }, [isAnimating])

    const handleClick = (e) => {
        e.preventDefault()

        // check if the href is different from the current page before doing anything
        if (router.pathname !== href) {
            if (!isAnimating) {
                setIsAnimating(true)
            }

            // if <a> receives another onClick function from it´s props, renders handleClick along with it
            if (onClick && typeof onClick === 'function') {
                onClick(e)
            }
        }

        // dispatch page transition event
        router.events.on('routeChangeComplete', () => {
            setTimeout(() => {
                document.dispatchEvent(new Event('page-transition'))
            }, 10)
        })
    }

    return (
        <>
            {isAnimating && <PageTransitionAnimation href={href} />}
            <a
                href={href}
                onClick={handleClick}
                {...props}
            >
                {children}
            </a>
        </>
    )
}
