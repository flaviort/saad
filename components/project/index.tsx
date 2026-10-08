'use client'

// libraries
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import Image from 'next/image'
import { Link } from '@/i18n/navigation'

// components
import { ScrollingImage } from '@/components/utils/animations'

// svgs
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// css
import styles from './project.module.scss'

type ProjectProps = {
    link: string
    image?: string
    darkText?: boolean
    title?: string | null
    subtitle?: string | null
    category?: string | null
    // only shown in the commented-out tags row below
    tags?: string[]
    // load the image right away instead of lazily (for a card that starts in view)
    eager?: boolean
}

export default function Project({ link, image, darkText = false, title, subtitle, category, eager = false }: ProjectProps) {

    const t = useTranslations('Project')

    return (
        <Link
            scroll={false}
            href={link}
            className={styles.project}
        >
            <div className={clsx(styles.inner, darkText && styles.dark)}>

                <div className={styles.bgImage}>
                    {image && (
                        <ScrollingImage>
                            <Image
                                src={image}
                                alt={title ?? ''}
                                fill
                                style={{ objectFit: 'cover' }}
                                sizes='100vw'
                                quality={90}
                                loading={eager ? 'eager' : 'lazy'}
                                fetchPriority={eager ? 'high' : 'auto'}
                            />
                        </ScrollingImage>
                    )}
                </div>

                <div className={styles.gradient}></div>

                <div className={clsx(styles.container, 'container')}>
                    <div className={clsx(styles.grid, 'grid-container')}>

                        <div className={clsx(styles.fullLine, 'grid-xl-1-3')}>

                            <p>
                                {title}
                            </p>

                            <h2 className='font-medium'>
                                {subtitle}
                            </h2>

                        </div>

                        <div className={clsx(styles.hideMobile, 'grid-xl-3-7')}>
                            <p className={styles.small}>
                                {category}
                            </p>
                        </div>

                        {/*
                        <div className={clsx(styles.hideMobile, 'grid-md-6-7')}>
                            <p className={clsx(styles.tags, styles.small)}>
                                {tags.map((item, i) => (
                                    <span key={i}>
                                        {item}
                                    </span>
                                ))}
                            </p>
                        </div>
                        */}

                        <p className={clsx(styles.viewMobile, 'font-small')}>
                            {t('view')} <UxArrowRight />
                        </p>

                    </div>
                </div>

            </div>
        </Link>
    )
}