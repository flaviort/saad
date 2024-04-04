// libraries
import clsx from 'clsx'
import Image from 'next/image'

// components
import { ScrollingImage } from '@/components/utils/animations'
import AnimatedLink from '@/components/utils/animated-link'

// svgs
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// css
import styles from './project.module.scss'

export default function Project({ link, image, darkText = false, client, title, category, tags }) {

    return (
        <AnimatedLink href={link} className={styles.project}>
            <div className={clsx(styles.inner, darkText && styles.dark)}>

                <div className={styles.bgImage}>
                    <ScrollingImage>
                        <Image
                            src={image}
                            alt={title}
                            format='webp'
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
                                {client}
                            </p>

                            <h3 className='font-medium'>
                                {title}
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
                            View <UxArrowRight />
                        </p>

                    </div>
                </div>

            </div>
        </AnimatedLink>
    )
}