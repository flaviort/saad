// libraries
import clsx from 'clsx'

// components
import AnimatedLine from '@/components/utils/animated-line'
import FillTitle from '@/components/utils/fill-title'

// svgs
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// css
import styles from './list-section.module.scss'

export default function ListSection({ className, title, infos, small, about, singleColumn, noScroll }) {
    return (
        <section className={clsx(styles.listSection, className)}>
            <div className='container padding-top'>
                <div className='grid-container'>

                    <div className='grid-md-1-2'>
                        <h2 className={clsx(
                            styles.title,
                            noScroll && styles.noScroll,
                            'title'
                        )}>
                            {title}
                        </h2>
                    </div>

                    { about ? (
                        <div className={clsx(styles.right, 'grid-md-3-7')}>
                            <div
                                className={styles.about}
                                dangerouslySetInnerHTML={{__html: about}}
                            />
                        </div>
                    ): (
                        <div className={clsx(styles.right, 'grid-md-2-7')}>
                            { infos.map((item, i) => (
                                <div className={styles.mapping} key={i}>

                                    <div className={styles.innerGrid}>

                                        {item.subTitle && (
                                            <h3 className={styles.subTitle}>
                                                <FillTitle text={item.subTitle} />
                                            </h3>
                                        )}

                                        { small ? (
                                            <div className={clsx(styles.list, styles.small)}>
                                                {item.items.map((subItem, i2) => (
                                                    <div className={styles.item} key={i2}>

                                                        <UxArrowRight />

                                                        <p>
                                                            {subItem}
                                                        </p>

                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className={clsx(styles.list, singleColumn && styles.singleColumn)}>
                                                {item.items.map((subItem, i2) => (
                                                    <div className={styles.item} key={i2}>

                                                        <UxArrowRight />

                                                        {subItem.year && (
                                                            <p className={styles.year}>
                                                                {subItem.year}
                                                            </p>
                                                        )}

                                                        <p className={styles.text}>
                                                            {subItem.text}
                                                        </p>

                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                        
                                    </div>

                                    <AnimatedLine opacity={.5} />

                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}