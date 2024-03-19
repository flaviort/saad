// import libraries
import { gsap } from 'gsap'
import Swup from 'swup'
import SwupHeadPlugin from '@swup/head-plugin'
import SwupScriptsPlugin from '@swup/scripts-plugin'
import SwupBodyClassPlugin from '@swup/body-class-plugin'

// init copyright
function initCopyright() {
    const message = 'Design Gabriel Leon 🔗 www.behance.net/leonngabr \nCode Senz Design 🔗 www.senzdsn.com'
    const style = 'color: #f8f8f8; font-size: 12px; font-weight: bold; background-color: #0d0e13; padding: 8px'
    console.log(`%c${message}`, style)
}

// init menu
document.querySelector('.open-fs').addEventListener('click', () => {
    
})

// init swup
function initSwup() {

    const swup = new Swup({
        plugins: [
            new SwupHeadPlugin(),
            new SwupScriptsPlugin(),
            new SwupBodyClassPlugin()
        ]
    })

    const fadeOut = () => {
        return new Promise((resolve) => {
            gsap.to('#page-transition', {
                opacity: 0,
                duration: 2,
                onComplete: resolve
            });
        });
    };
    
    const fadeIn = () => {
        return new Promise((resolve) => {
            gsap.to('#page-transition', {
                opacity: 1,
                duration: 2,
                onComplete: resolve
            });
        });
    };
    
    swup.hooks.on('visit:start', async () => {
        await fadeOut();
    });
    
    swup.hooks.on('visit:end', async () => {
        await fadeIn();
    });
    
}

function initEverything(){
    initSwup()
    initCopyright()
}

initEverything()