import { useEffect, useRef } from 'react'
import gsap, { Elastic, Power4 } from 'gsap'

const MagneticButton = ({ children, strength = 30 }) => {
    
    const buttonRef = useRef(null)

    useEffect(() => {
        const magnetButton = buttonRef.current

        if (magnetButton && window.innerWidth > 540) {
            magnetButton.addEventListener('mousemove', moveMagnet)
            magnetButton.addEventListener('mouseleave', handleMouseLeave)
        }

        function moveMagnet(event) {
            const bounding = magnetButton.getBoundingClientRect()

            gsap.to(magnetButton, {
                x: (((event.clientX - bounding.left) / magnetButton.offsetWidth) - 0.5) * strength,
                y: (((event.clientY - bounding.top) / magnetButton.offsetHeight) - 0.5) * strength,
                rotate: '0.001deg',
                ease: Power4.easeOut,
                duration: 1.5
            })
        }

        function handleMouseLeave(event) {
            gsap.to(event.currentTarget, {
                x: 0,
                y: 0,
                ease: Elastic.easeOut,
                duration: 1.5
            })
        }

        // clean up event listeners when the component unmounts
        return () => {
            if (magnetButton) {
                magnetButton.removeEventListener('mousemove', moveMagnet)
                magnetButton.removeEventListener('mouseleave', handleMouseLeave)
            }
        }
    }, [strength])

    return (
        <div ref={buttonRef} style={{ width: 'fit-content'}}>
            {children}
        </div>
    )
}

export default MagneticButton