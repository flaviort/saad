import clsx from 'clsx'

// svgs
import UxSpinner from '@/assets/svg/ux/spinner.svg'

// css
import styles from './button.module.scss'

export default function Button({ center, children, small, medium, big, hollow, hollowWhite, white, dark, spinner }){
    return (
        <div className={clsx(
            styles.button,

            // sizes
            small && styles.small,
            medium && styles.medium,
            big && styles.big,

            // styles
            hollow && styles.hollow,
            hollowWhite && styles.hollowWhite,
            white && styles.white,
            dark && styles.dark,

            // alignment
            center && styles.center
        )}>
            {children}

            {/* if the button needs a spinner for a form */}
            { spinner && (
                <div className={clsx(styles.spinner, 'spinner')}>
                    <UxSpinner />
                </div>
            )}
        </div>
    )
}