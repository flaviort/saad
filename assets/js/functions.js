gsap.registerPlugin(SplitText)

const select = (e) => document.querySelector(e)
const selectAll = (e) => document.querySelectorAll(e)
const selectId = (id) => document.getElementById(id)
const vh = (coef) => window.innerHeight * (coef/100)
const vw = (coef) => window.innerWidth * (coef/100)

// page load animation
function initOpening() {
    const tl = gsap.timeline()

    const words = select('.words')
    const lines = selectAll('.lines')

    const splitWords = new SplitText(words, {
        type: 'lines, words',
        linesClass: 'split-line'
    })

    const splitLines = new SplitText(lines, {
        type: 'lines',
        linesClass: 'split-line'
    })

    tl.to('#main-content', {
        opacity: 1,
        duration: 0
    })

    tl.from(splitWords.words, {
        y: 10,
        opacity: 0,
        duration: .75,
        stagger: 0.05
    })

    tl.from(splitLines.lines, {
        y: 10,
        opacity: 0,
        duration: .75,
        stagger: 0.05
    }, '-=.75')

    tl.from('#logo svg path', {
        yPercent: 110,
        stagger: 0.2,
        duration: .75
    }, '-=1')

    tl.from('.circle', {
        scale: 0,
        opacity: 0,
        duration: 2,
        ease: 'back.out(1.7)'
    }, '-=1')

    tl.fromTo('.sliding-link', {
        y: -25,
        autoAlpha: 0
    }, {
        y: 0,
        autoAlpha: 1,
        duration: .75
    }, '-=1.5')

    tl.call(function(){
        select('.sliding-link').style.transition = "all 0.3s ease-in-out";
    })

    const images = document.querySelectorAll('.image')
    let currentIndex = 0

    function crossFade() {
        const currentImage = images[currentIndex]
        const nextIndex = (currentIndex + 1) % images.length
        const nextImage = images[nextIndex]

        gsap.to(currentImage, { duration: .5, autoAlpha: 0 })
        gsap.to(nextImage, { duration: .5, autoAlpha: 1 })

        currentIndex = nextIndex
    }

    setInterval(crossFade, 3000)
}

// here goes all the scroll related animations
function scrollTriggerAnimations() {

    var timeout = null

    window.addEventListener('scroll', function() {
        if (!timeout) {
            timeout = setTimeout(function() {
                var scrolled = document.documentElement.scrollTop || document.body.scrollTop

                if (scrolled >= vh(45)) {
                    select('.scroll').classList.add('hidden')
                    select('.arrow svg').classList.add('reverse')
                    select('.arrow').setAttribute('href', '#home')
                } else {
                    select('.scroll').classList.remove('hidden')
                    select('.arrow svg').classList.remove('reverse')
                    select('.arrow').setAttribute('href', '#about')
                }

                timeout = null
            }, 500)
        }
    })
    
}

// init all click, mouseover and keyup functions
function initClickAndKeyFunctions() {

	// make anchor links scroll smoothy
	document.querySelectorAll('.sliding-link').forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault()
            var aid = this.getAttribute('href')
            var targetOffsetTop = document.querySelector(aid).offsetTop
            var scrollOptions = {
                top: targetOffsetTop,
                behavior: 'smooth'
            }
            window.scrollTo(scrollOptions)
        })
    })    
}

// disable console warnings and show the copyright message
function initCopyright() {
	const message = 'Design Gabriel Leon 🔗 www.behance.net/leonngabr \nCode Senz Design 🔗 www.senzdsn.com'
	const style = 'color: #f8f8f8; font-size: 12px; font-weight: bold; background-color: #0d0e13; padding: 8px'
	console.log(`%c${message}`, style)
}

// init lazyload
function initLazyLoad() {
	const lazyLoadInstance = new LazyLoad({ 
		elements_selector: '.lazy',
		container: selectId('main-content')
	})
}

// fire all scripts on page load
function initScripts() {
    initOpening()
	scrollTriggerAnimations()
    initLazyLoad()
	initClickAndKeyFunctions()
	initCopyright()
}

// init
document.fonts.ready.then(() => {
    initScripts()
})