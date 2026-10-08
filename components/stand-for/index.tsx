'use client'

// libraries
import clsx from 'clsx'
import { useState } from 'react'

// i18n
import { useTranslations } from 'next-intl'

// svgs
import UxArrowDown from '@/assets/svg/ux/arrow-down.svg'

// css
import styles from './stand-for.module.scss'

export default function StandFor() {

    const t = useTranslations('StandFor')

    const standFor = [
        {
            title: t('first.title'),
            text: t('first.text')
        }, {
            title: t('second.title'),
            text: t('second.text')
        }, {
            title: t('third.title'),
            text: t('third.text')
        }
    ]

    // toggle effect
    const [activeItems, setActiveItems] = useState([true, false, false])

    const toggle = (index: number) => {
        setActiveItems(prevActiveItems => {
            const newActiveItems = [...prevActiveItems]
            newActiveItems[index] = !newActiveItems[index]
            return newActiveItems
        })
    }

    return (
        <section className={clsx(styles.standFor, 'padding-top')}>
            <div className='container'>

                <p className={styles.topTitle}>
                    {t('title')}
                </p>

                <div className={styles.accordion}>
                    {standFor.map((item, index) => (
                        <div
                            className={clsx(styles.item, activeItems[index] && styles.active)}
                            key={index}
                            onClick={() => toggle(index)}
                        >
                            
                            <h3 className={clsx(styles.title, 'font-bigger')}>
                                {item.title}
                            </h3>

                            <div className={styles.flex}>
                                <div className='grid-container'>
                                    <div className='grid-md-3-6'>
                                        <p>
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.last}>
                                <button>
                                    <UxArrowDown />
                                </button>
                            </div>

                            <div className={styles.line} />

                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}