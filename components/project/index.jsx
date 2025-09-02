// libraries
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Image from 'next/image'
import Link from 'next/link'

// components
import { ScrollingImage } from '@/components/utils/animations'

// svgs
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// css
import styles from './project.module.scss'

export default function Project({ link, image, darkText = false, title, subtitle, category, tags }) {

    const { locale } = useRouter()

    return (
        <Link
            scroll={false}
            href={link}
            className={styles.project}
        >
            <div className={clsx(styles.inner, darkText && styles.dark)}>

                <div className={styles.bgImage}>
                    <ScrollingImage>
                        <Image
                            src={image}
                            alt={title}
                            fill
                            style={{ objectFit: 'cover' }}
                            quality={100}
                        />
                    </ScrollingImage>
                </div>

                <div className={styles.gradient}></div>

                <div className={clsx(styles.container, 'container')}>
                    <div className={clsx(styles.grid, 'grid-container')}>

                        <div className={clsx(styles.fullLine, 'grid-md-1-5')}>

                            <p>
                                {title}
                            </p>

                            <h3 className='font-medium'>
                                {subtitle}
                            </h3>

                        </div>

                        <div className={clsx(styles.hideMobile, 'grid-md-5-6')}>
                            <p className={styles.small}>
                                {category}
                            </p>
                        </div>

                        <div className={clsx(styles.hideMobile, 'grid-md-6-7')}>
                            <p className={clsx(styles.tags, styles.small)}>
                                {tags.map((item, i) => (
                                    <span key={i}>
                                        {item}
                                    </span>
                                ))}
                            </p>
                        </div>

                        <p className={clsx(styles.viewMobile, 'font-small')}>
                            {locale === 'en' ? 'View' : 'Ver projeto'} <UxArrowRight />
                        </p>

                    </div>
                </div>

            </div>
        </Link>
    )
}