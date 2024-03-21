import { gsap } from 'gsap'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

let smoother

// init copyright
function initCopyright() {
    const message = 'Design Gabriel Leon 🔗 www.behance.net/leonngabr \nCode Senz Design 🔗 www.senzdsn.com'
    const style = 'color: #f8f8f8; font-size: 12px; font-weight: bold; background-color: #0d0e13; padding: 8px'
    console.log(`%c${message}`, style)
}

// init scroll smoother
function initScrollSmoother() {
    if (ScrollTrigger.isTouch !== 1) {

		// create scroll smoother
		smoother = ScrollSmoother.create({
			smooth: 2,
			speed: .75,
			effects: true,
            //smoothTouch: .1,
			//normalizeScroll: true
		})

		// parallax effect
		smoother.effects('.parallax-img', {
			speed: 'auto'
		})

        // listen to the event emitted from the PageTransition component
        document.addEventListener('updateScrollTrigger', function() {
            smoother.scrollTo(0, false)
            ScrollTrigger.refresh()
            
        })
	}
}

function initEverything(){
    initScrollSmoother()
    initCopyright()
}

initEverything()