// libraries
import clsx from 'clsx'
import { useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger)

// components
import FillTitle from '@/components/utils/fill-title'
import AnimatedLine from '@/components/utils/animated-line'

// svgs
import UxArrowDown from '@/assets/svg/ux/arrow-down.svg'

// css
import styles from './stand-for.module.scss'

export default function StandFor() {

    const standFor = [
        {
            title: 'Clear-Cut Strategy',
            text: 'We look at all aspects of the business and delve into each of them to create business strategies. Clear, precise and distinct brands.'
        }, {
            title: 'Clever Design',
            text: 'We communicate your brand’s uniqueness to the world through sharp, smart and timeless design.'
        }, {
            title: 'Tailor-Made',
            text: 'We are a boutique, which means: working closer to our clients, more focus, quality over quantity, high attention to details and control throughout the whole process.'
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
                    What we stand for
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