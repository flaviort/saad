import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

export default function StaggerUp(props) {
    
    const item = useRef(null)

	useGSAP(() => {
        if (item.current) {
            const children = item.current.children

            gsap.set(children, {
                opacity: 0,
                y: '25vh'
            })

            ScrollTrigger.batch(children, {
                start: '-50% 100%',
                onEnter: elements => {
                    gsap.to(elements, {
                        opacity: 1,
                        y: 0,
                        stagger: 0.25,
                        duration: 1
                    })
                }
            })
        }
	}, [])

    return (
        <div ref={item} {...props} data-stagger>
            {props.children}
        </div>
    )
}