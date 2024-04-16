'use client'

// libraries
import { useRef } from 'react'
import { useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'
import Draggable from 'gsap/dist/Draggable'
gsap.registerPlugin(ScrollTrigger, Draggable)

// css
import styles from './custom-scrollbar.module.scss'

export default function CustomScrollbar() {

    const scrollbar = useRef()
    const thumb = useRef()
    const lenis = useLenis()

    useGSAP(() => {
        function updateScroll() {
            let scrollbarHeight = scrollbar?.current?.getBoundingClientRect().height
            let thumbHeight = thumb?.current?.getBoundingClientRect().height
            let content = document.querySelector('[data-scroll-container]')
            let contentHeight = content.getBoundingClientRect().height
    
            if(document.querySelector('[data-scrollbar-thumb-height="variable"]')) {
                gsap.set(thumb.current, {
                    height: (scrollbarHeight / contentHeight * scrollbarHeight)
                })
    
                thumbHeight = (scrollbarHeight / contentHeight * scrollbarHeight)
            }
    
            let scrollTween = gsap.to(thumb.current, {
                y: scrollbarHeight - thumbHeight,
                ease: 'none',
                scrollTrigger: {
                    start: 'top top',
                    end: 'bottom bottom',
                    scrub: true
                }
            })
            
            Draggable.create(thumb.current, {
                type: 'y',
                bounds: scrollbar.current,
                inertia: false,
                onDrag() {
                    setTimeout(() => {
                        let progress = gsap.utils.normalize(this.minY, this.maxY, this.y)
                        lenis.scrollTo((contentHeight - scrollbarHeight) * progress, {
                            immediate: true
                        })
                        scrollbar.current.setAttribute('data-scrollbar-drag', 'true')    
                    }, 1)
                    
                },
                onRelease() {
                    let progress = gsap.utils.normalize(this.minY, this.maxY, this.y)
                    scrollTween.scrollTrigger.enable()
                    scrollTween.progress(progress)
                    scrollbar.current.setAttribute('data-scrollbar-drag', 'false')
                }
            })
        }

        updateScroll()

        document.addEventListener('page-transition', updateScroll)

    }, { dependencies: [lenis] })

    return (
        <div
            className={styles.scrollbar}
            data-scrollbar
            data-scrollbar-drag='false'
            ref={scrollbar}
        >
            <div
                className={styles.thumb}
                data-scrollbar-thumb
                data-scrollbar-thumb-height='variable'
                ref={thumb}
            ></div>
        </div>
    )
}