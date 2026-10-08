'use client'

// libraries
import clsx from 'clsx'
import { useEffect, useId, useState, useRef, type MouseEvent } from 'react'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// i18n
import { useLocale, useTranslations, type Locale } from 'next-intl'
import { Link, usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { localeNames } from '@/i18n/locale'

// components
import { transitionLocaleSwitch } from '@/components/page-transition'

// routes / utils
import routes from '@/utils/routes'

// svgs
import Logo from '@/assets/svg/logos/logo.svg'

// css
import styles from './menu.module.scss'

export default function Menu() {

    const locale = useLocale()
    const pathname = usePathname()
    const router = useRouter()

    const t = useTranslations('Menu')

    // animation ref
    const menuAnimationRef = useRef<gsap.core.Timeline>(null)
    
    // current route is the homepage (pathname comes without the locale prefix)
    const isHomepage = pathname === '/'

    // the top bar swaps its intro text for the tags once the user scrolls,
    // only re-renders when crossing the threshold
    const [isScrolled, setIsScrolled] = useState(false)
    const lenis = useLenis(({ progress }) => setIsScrolled(progress > .01))
    const showScrollTexts = !isHomepage || isScrolled

    // selector strings below are scoped to these elements by useGSAP
    const menuRef = useRef<HTMLDivElement>(null)
    const topMenuRef = useRef<HTMLElement>(null)
    const fsMenuRef = useRef<HTMLElement>(null)
    const languageRef = useRef<HTMLUListElement>(null)
    const lastIsHomepage = useRef<boolean>(null)

    // menu items
	const menuItems = [
		{
			name: t('Items.home'),
			url: routes.home
		},
		{
			name: t('Items.work'),
			url: routes.work
		},
		{
			name: t('Items.about'),
			url: routes.about
		},
		{
			name: t('Items.contact'),
			url: routes.contact
		}
	]

    // open / close fs menu
    const [isShown, setIsShown] = useState(false)
    const fsMenuId = useId()

	const openCloseFsMenu = () => {
		setIsShown(!isShown)

        if(!isShown) {
            lenis?.stop()
        } else {
            lenis?.start()
        }
	}

    // same page in the other language, behind the page curtain
    const switchLocale = (e: MouseEvent<HTMLAnchorElement>, nextLocale: Locale) => {
        if (nextLocale === locale) {
            openCloseFsMenu()
            return
        }

        // the layout remounts with the new language, which also resets the menu
        e.preventDefault()
        transitionLocaleSwitch(() => router.push(pathname, { locale: nextLocale, scroll: false }))
    }

    const closeFsMenu = (e: MouseEvent<HTMLAnchorElement>) => {
        const hrefParts = e.currentTarget.href.split('/')
        const currentPageName = hrefParts[hrefParts.length - 1]
        const pathnameWithoutSlash = pathname.substring(1)

        if (currentPageName  === pathnameWithoutSlash) {
            if (isShown === true) {
                setIsShown(!isShown)

                if (!isShown) {
                    lenis?.stop()
                } else {
                    lenis?.start()
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
        if (menuAnimationRef.current) {
            if (isShown) {
                menuAnimationRef.current.play()
            } else {
                menuAnimationRef.current.reverse()
            }
        }
	}, [isShown])

    // top bar texts: instant on route changes, animated while scrolling
    useGSAP(() => {
        const routeChanged = lastIsHomepage.current !== isHomepage
        lastIsHomepage.current = isHomepage

        const staticText = { autoAlpha: showScrollTexts ? 0 : 1 }
        const scrollText = { autoAlpha: showScrollTexts ? 1 : 0 }

        if (routeChanged) {
            gsap.set('.top-menu-texts-static', staticText)
            gsap.set('.top-menu-texts-scroll', scrollText)
        } else {
            gsap.to('.top-menu-texts-static', { ...staticText, delay: .3, overwrite: 'auto' })
            gsap.to('.top-menu-texts-scroll', { ...scrollText, delay: .3, overwrite: 'auto' })
        }
    }, { dependencies: [showScrollTexts, isHomepage], scope: menuRef })

    // menu animation
    useGSAP(() => {
        const menuAnimation = gsap.timeline({
            paused: true
        })

        menuAnimation.to(fsMenuRef.current, {
            clipPath: 'inset(0% 0% 0% 0%)',
            ease: 'power2.inOut',
            duration: 1
        })

        menuAnimation.to(topMenuRef.current, {
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
    
        menuAnimation.fromTo(languageRef.current, {
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
    }, { scope: menuRef })

    return (
        // display: contents, so the wrapper only gives the animations a scope
        <div ref={menuRef} style={{ display: 'contents' }}>
            <section ref={topMenuRef} className={styles.topMenu} style={{ viewTransitionName: 'site-menu' }}>
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
                                    {t('description')}
                                </div>

								<div className={clsx(styles.second, 'top-menu-texts-scroll')}>
                                    {t.rich('tags', {
                                        dot: (chunks) => <span>{chunks}</span>
                                    })}
                                </div>

							</div>

							<ul ref={languageRef} className={styles.language}>
								{routing.locales.map(item => (
									<li key={item}>
										<Link
											scroll={false}
											href={pathname}
											locale={item}
											className={clsx(locale === item && styles.active)}
											onClick={(e) => switchLocale(e, item)}
										>
											{localeNames[item]}
										</Link>
									</li>
								))}
							</ul>

						</div>

						<div className={clsx(styles.last, 'grid-md-6-7')}>
							<button
                                type='button'
                                className={styles.openFs}
                                onClick={openCloseFsMenu}
                                aria-expanded={isShown}
                                aria-controls={fsMenuId}
                            >
								
								<span className={styles.text}>
									<span className='fs-text-open'>{t('open')}</span>
                                    <span className='fs-text-close'>{t('close')}</span>
								</span>

								<span className={styles.block}></span>

							</button>
						</div>
						
					</div>
				</div>
			</section>

            {/* inert while closed: it's only clipped off screen, so keep its links out of tab order */}
            <section ref={fsMenuRef} id={fsMenuId} className={styles.fsMenu} inert={!isShown}>
                <div className='container'>
                    <div className='grid-container'>
                        <ul className={clsx(styles.menu, 'grid-md-2-7')}>
                            {menuItems.map((item, i) => (
                                <li key={i} className={clsx('fsMenuLi', locale === 'pt' && styles.pt)}>
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
        </div>
    )

}
