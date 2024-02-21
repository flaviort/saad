// register scrolltrigger and split text plugins
gsap.registerPlugin(ScrollTrigger, SplitText)

const select = (e) => document.querySelector(e)
const selectAll = (e) => document.querySelectorAll(e)
const selectId = (id) => document.getElementById(id)
const vh = (coef) => window.innerHeight * (coef/100)
const vw = (coef) => window.innerWidth * (coef/100)

// page load animation
function initOpening() {

    const words = $('.words')
    const lines = $('.lines')

    const splitWords = new SplitText(words, {
        type: 'lines, words',
        linesClass: 'split-line'
    })

    const splitLines = new SplitText(lines, {
        type: 'lines',
        linesClass: 'split-line'
    })

    const tl = gsap.timeline()

    tl.from(splitWords.words, {
        y: 10,
        opacity: 0,
        duration: .75,
        stagger: 0.05,
    })

    tl.from(splitLines.lines, {
        y: 10,
        opacity: 0,
        duration: .75,
        stagger: 0.05,
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

    tl.from('.arrow', {
        y: -25,
        opacity: 0,
        duration: .75
    }, '-=1.5')

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

    var timeout
	
    $(window).scroll(function() {
        if (!timeout) {
            timeout = setTimeout(function() {

                var scrolled = $(document).scrollTop()
    
                if (scrolled >= vh(45)) {
                    $('.scroll').addClass('hidden')
                    $('.arrow svg').addClass('reverse')
                    $('.arrow').attr('href', '#home')
                } else {
                    $('.scroll').removeClass('hidden')
                    $('.arrow svg').removeClass('reverse')
                    $('.arrow').attr('href', '#about')
                }
    
                timeout = null
            }, 500)
        }
    })

    
}

// init all click, mouseover and keyup functions
function initClickAndKeyFunctions() {

	// make anchor links scroll smoothy
	$('.sliding-link').click(function(e) {
		e.preventDefault()
		var aid = $(this).attr('href')
		$('html, body').animate({ scrollTop: $(aid).offset().top }, 600)
	})
}

// disable console warnings and show the copyright message
function initCopyright() {
	const message = 'Design Gabriel Leon 🔗 www.behance.net/leonngabr \nCode Senz Design 🔗 www.senzdsn.com'
	const style = 'color: #f8f8f8; font-size: 12px; font-weight: bold; background-color: #0d0e13; padding: 8px'
	console.log(`%c${message}`, style)
}

// fire all scripts on page load
function initScripts() {
    initOpening()
	scrollTriggerAnimations()
	initClickAndKeyFunctions()
	initCopyright()
}

// init
initScripts()