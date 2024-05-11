// libraries
import clsx from 'clsx'
import { useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// i18n
import { useMessages } from 'next-intl'

// components
import FillTitle from '@/components/utils/fill-title'
import AnimatedLine from '@/components/utils/animated-line'

// svgs
import UxArrowDown from '@/assets/svg/ux/arrow-down.svg'

// css
import styles from './stand-for.module.scss'

export default function StandFor() {

    const messages = useMessages()

    const standFor = [
        {
            title: messages.StandFor.first.title,
            text: messages.StandFor.first.text
        }, {
            title: messages.StandFor.second.title,
            text: messages.StandFor.second.text
        }, {
            title: messages.StandFor.third.title,
            text: messages.StandFor.third.text
        }
    ]

    // toggle effect
    const [activeItems, setActiveItems] = useState([true, false, false])

    const toggle = (index) => {
        setActiveItems(prevActiveItems => {
            const newActiveItems = [...prevActiveItems]
            newActiveItems[index] = !newActiveItems[index]
            return newActiveItems
        })

        setTimeout(() => {
            ScrollTrigger.refresh()
        }, 350)
    }

    return (
        <section className={clsx(styles.standFor, 'padding-top')}>
            <div className='container'>

                <p className={styles.topTitle}>
                    {messages.StandFor.title}
                </p>

                <div className={styles.accordion}>
                    {standFor.map((item, index) => (
                        <div
                            className={clsx(styles.item, activeItems[index] && styles.active)}
                            key={index}
                            onClick={() => toggle(index)}
                        >
                            
                            <h3 className={clsx(styles.title, 'font-bigger')}>
                                <FillTitle text={item.title} />
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

                            <AnimatedLine opacity={.5} />

                        </div>
                    ))}
                </div>

            </div>
        </section>
    )
}