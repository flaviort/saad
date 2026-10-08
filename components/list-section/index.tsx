'use client'

// libraries
import clsx from 'clsx'

// css
import styles from './list-section.module.scss'

export type ListSectionItem = {
    year?: string
    text: string
}

export type ListSectionInfo = {
    subTitle?: string
    items: ListSectionItem[]
}

export type ListSectionData = {
    title: string
    infos: ListSectionInfo[]
}

type ListSectionProps = {
    className?: string
    title: string
    infos?: ListSectionInfo[]
    small?: boolean
    about?: string | null
    singleColumn?: boolean
    noScroll?: boolean
}

export default function ListSection({ className, title, infos = [], small, about, singleColumn, noScroll }: ListSectionProps) {
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
                                                {item.subTitle}
                                            </h3>
                                        )}

                                        { small ? (
                                            <div className={clsx(styles.list, styles.small)}>
                                                {item.items.map((subItem, i2) => (
                                                    <div className={styles.item} key={i2}>

                                                        {/* <UxArrowRight /> */}

                                                        <p>
                                                            {subItem.text}
                                                        </p>

                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className={clsx(styles.list, singleColumn && styles.singleColumn)}>
                                                {item.items.map((subItem, i2) => (
                                                    <div className={styles.item} key={i2}>

                                                        {/* <UxArrowRight /> */}

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

                                    <div className={styles.line} />

                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </div>
        </section>
    )
}