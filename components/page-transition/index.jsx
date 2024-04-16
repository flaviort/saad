// components
import TransitionComponent from '@/components/page-transition/transition'

// svgs
import Logo from '@/assets/svg/logos/logo.svg'

// css
import styles from './page-transition.module.scss'

export default function PageTransition({ settings, children }) {
    return (
        <>
            
            <aside id='loader' data-loader className={styles.loader}>
					
                <div data-loader-bg className={styles.loaderBg}></div>

                <div data-loader-logo className={styles.loaderLogo}>
                    <Logo />
                </div>

            </aside>

            <TransitionComponent settings={settings}>
                {children}
            </TransitionComponent>

        </>
    )
}