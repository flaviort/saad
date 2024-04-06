// libraries
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState, useRef } from 'react'
import { useLenis } from '@studio-freight/react-lenis'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// routes / utils
import routes from '@/utils/routes'
import { debounce } from '@/utils/functions'

// svgs
import Logo from '@/assets/svg/logos/logo.svg'

// css
import styles from './menu.module.scss'

export default function Menu() {

    // animation ref
    const menuAnimationRef = useRef(null)
    
    const lenis = useLenis(({progress}) => {
        if(progress > .01) {
            debounce(() => {
                gsap.to('.top-menu-texts-static', {
                    autoAlpha: 0
                })
    
                gsap.to('.top-menu-texts-scroll', {
                    autoAlpha: 1
                })
            }, 300)()
        } else {
            debounce(() => {
                gsap.to('.top-menu-texts-static', {
                    autoAlpha: 1
                })

                gsap.to('.top-menu-texts-scroll', {
                    autoAlpha: 0
                })
            }, 300)()
        }
    })

    // menu items
	const menuItems = [
		{
			name: 'Home',
			url: routes.home
		},
		{
			name: 'Work',
			url: routes.work
		},
		{
			name: 'About',
			url: routes.about
		},
		{
			name: 'Contact',
			url: routes.contact
		}
	]

    // open / close fs menu
    const [isShown, setIsShown] = useState(false)

	const openCloseFsMenu = () => {
		setIsShown(!isShown)

        if(!isShown) {
            lenis.stop()
        } else {
            lenis.start()
        }
	}

    const router = useRouter()

    const closeFsMenu = (e) => {
        const { pathname } = router
        const hrefParts = e.currentTarget.href.split('/')
        const currentPageName = hrefParts[hrefParts.length - 1]
        const pathnameWithoutSlash = pathname.substring(1)

        if (currentPageName  === pathnameWithoutSlash) {
            if (isShown === true) {
                setIsShown(!isShown)

                if (!isShown) {
                    lenis.stop()
                } else {
                    lenis.start()
                }
            }
        } else {
            setTimeout(() => {
                setIsShown(false)
                if (menuAnimationRef.current) {
                    menuAnimationRef.current.seek(0).pause()
                }
            }, 1000)
        }
	}

    useEffect(() => {
		setIsShown(isShown)

        if (menuAnimationRef.current) {
            if (isShown) {
                menuAnimationRef.current.play()
            } else {
                menuAnimationRef.current.reverse()
            }
        }
	}, [isShown])

    // menu animation
    useGSAP(() => {
        const menuAnimation = gsap.timeline({
            paused: true
        })

        menuAnimation.to('#fs-menu', {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power2.inOut',
            duration: 1
        })

        menuAnimation.to('#top-menu', {
            color: '#0d0e13',
            mixBlendMode: 'normal',
            ease: 'power2.inOut',
            duration: .6
        }, '-=1')

        menuAnimation.to('.top-menu-texts', {
            y: 50,
            autoAlpha: 0
        }, '-=.9')
    
        menuAnimation.to('.fs-text-open', {
            autoAlpha: 0,
            duration: .3,
            ease: 'power2.inOut',
        }, '-=.9')

        menuAnimation.to('.fs-text-close', {
            autoAlpha: 1,
            duration: .3,
            ease: 'power2.inOut',
        }, '-=.9')
    
        menuAnimation.fromTo('#top-menu-language', {
            y: -50,
            autoAlpha: 0
        }, {
            y: 0,
            autoAlpha: 1
        }, '-=.5')
    
        menuAnimation.fromTo('.fsMenuLi', {
            y: -100,
            autoAlpha: 0
        }, {
            y: 0,
            autoAlpha: 1,
            stagger: .1
        }, '-=.7')
        
        // store the animation timeline in the ref
        menuAnimationRef.current = menuAnimation
    })

    return (
        <>
            <section id='top-menu' className={styles.topMenu}>
				<div className='container'>
					<div className={clsx(styles.grid, 'grid-container')}>

						<Link
                            scroll={false}
							href={routes.home}
							className={styles.logo}
                            onClick={closeFsMenu}
						>

							<div className={styles.original}>
								<Logo />
							</div>

							<div className={styles.hover}>
								<Logo />
							</div>

						</Link>

						<div className={clsx(styles.middle, 'grid-md-2-6')}>
							
							<div className={clsx(styles.texts, 'top-menu-texts')}>

								<div className={clsx(styles.first, 'top-menu-texts-static')}>
									<p>
										Saad® is an internationally award-winning boutique brand consultancy <br />
										specialized in building and transforming the future of businesses.
									</p>
								</div>

								<div className={clsx(styles.second, 'top-menu-texts-scroll')}>
									<p>
										Business <span>•</span> Branding <span>•</span> Design
									</p>
								</div>

							</div>

							<ul id='top-menu-language' className={styles.language}>

								<li>
									<Link
                                        scroll={false}
										href={routes.home}
										className={styles.active}
                                        onClick={closeFsMenu}
									>
										English
									</Link>
								</li>

								<li>
									<Link
                                        scroll={false}
										href='./pt-br'
                                        onClick={closeFsMenu}
									>
										Portuguese
									</Link>
								</li>
							</ul>

						</div>

						<div className={clsx(styles.last, 'grid-md-6-7')}>
							<button className={styles.openFs} onClick={openCloseFsMenu}>
								
								<span className={styles.text}>
									<span className='fs-text-open'>Menu</span>
                                    <span className='fs-text-close'>Close</span>
								</span>

								<span className={styles.block}></span>

							</button>
						</div>
						
					</div>
				</div>
			</section>

            <section id='fs-menu' className={styles.fsMenu}>
                <div className='container'>
                    <div className='grid-container'>
                        <ul className={clsx(styles.menu, 'grid-md-2-7')}>
                            {menuItems.map((item, i) => (
                                <li key={i} className='fsMenuLi'>
                                    <Link
                                        scroll={false}
                                        href={item.url}
                                        onClick={closeFsMenu}
                                    >
                                        {item.name}
                                    </Link>
                                </li> 
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </>
    )

}