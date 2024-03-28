import { ReactLenis } from '@studio-freight/react-lenis'
import { useRecoilState } from 'recoil'
import { useEffect, useRef } from 'react'

// utils
import { fsMenuState, pageTransitionState } from '@/utils/atoms'

export default function SmoothScrolling({ children }) {

    // import the fsmenu state to check if the fsmenu is open or not
    const [fsMenu] = useRecoilState(fsMenuState)
    const [pageTransition] = useRecoilState(pageTransitionState)

    const lenisRef = useRef()

    // pause lenis when the fsmenu is open and restart it when it´s closed
    useEffect(() => {
        if (fsMenu) {
            lenisRef.current?.lenis?.stop()
            document.body.classList.add('no-scroll')
        } else {
            lenisRef.current?.lenis?.start()
            document.body.classList.remove('no-scroll')
        }
    }, [fsMenu])

    // pause lenis when on page transition starts and restart it when it´s finished
    useEffect(() => {
        if (pageTransition) {
            lenisRef.current?.lenis?.stop()
            document.body.classList.add('no-scroll')
        } else {
            lenisRef.current?.lenis?.start()
            document.body.classList.remove('no-scroll')
        }
    }, [pageTransition])

    return (
        <ReactLenis
            root
            options={{
                lerp: 0.1,
                duration: 1.5,
                smoothTouch: false
            }}
            ref={lenisRef}
        >
            {children}
        </ReactLenis>
    )
}