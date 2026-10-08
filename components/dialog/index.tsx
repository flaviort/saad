'use client'

// libraries
import clsx from 'clsx'
import { useEffect, useRef, useState, type ReactNode } from 'react'
import { useTranslations } from 'next-intl'
import { useLenis } from 'lenis/react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// svgs
import UxClose from '@/assets/svg/ux/close.svg'

// css
import styles from './dialog.module.scss'

type DialogProps = {
    open: boolean
    onClose: () => void

    // accessible name, read by screen readers when the dialog opens
    label: string

    // modal: centered panel, fullscreen: edge to edge (videos)
    variant?: 'modal' | 'fullscreen'

    // the corner close button, turn off when the content has its own
    closeButton?: boolean

    panelClassName?: string
    children: ReactNode
}

// native <dialog> (focus trap, Esc, top layer, focus return) with gsap fades.
// Children only render while the dialog is visible, so videos stop on close.
export default function Dialog({
    open,
    onClose,
    label,
    variant = 'modal',
    closeButton = true,
    panelClassName,
    children
}: DialogProps) {

    const t = useTranslations('Dialog')
    const lenis = useLenis()

    const dialogRef = useRef<HTMLDialogElement>(null)
    const overlayRef = useRef<HTMLDivElement>(null)
    const panelRef = useRef<HTMLDivElement>(null)
    const hasLockedScroll = useRef(false)

    // stays true until the closing animation finishes
    const [isRendered, setIsRendered] = useState(open)

    if (open && !isRendered) {
        setIsRendered(true)
    }

    useGSAP(() => {
        const dialog = dialogRef.current

        if (!dialog) return

        if (open) {
            // opacity only (no visibility: hidden), so showModal() can focus the
            // first control inside while the panel is still fading in
            if (!dialog.open) {
                dialog.showModal()
            }

            // the page behind shouldn't smooth scroll while the dialog is up
            lenis?.stop()
            hasLockedScroll.current = true

            gsap.timeline()
                .fromTo(overlayRef.current, {
                    opacity: 0
                }, {
                    opacity: 1,
                    duration: .4,
                    ease: 'power2.out'
                })
                .fromTo(panelRef.current, {
                    opacity: 0,
                    y: 30,
                    scale: .98
                }, {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: .5,
                    ease: 'power3.out'
                }, '-=.25')

            return
        }

        if (!dialog.open) return

        gsap.timeline({
            onComplete: () => {
                dialog.close()
                setIsRendered(false)
                lenis?.start()
                hasLockedScroll.current = false
            }
        })
            .to(panelRef.current, {
                opacity: 0,
                y: 20,
                duration: .3,
                ease: 'power2.in'
            })
            .to(overlayRef.current, {
                opacity: 0,
                duration: .3,
                ease: 'power2.in'
            }, '-=.15')
    }, { dependencies: [open], scope: dialogRef })

    // leaving the page with the dialog open: give scrolling back
    useEffect(() => () => {
        if (hasLockedScroll.current) {
            lenis?.start()
        }
    }, [lenis])

    return (
        <dialog
            ref={dialogRef}
            aria-label={label}
            className={clsx(styles.dialog, variant === 'fullscreen' && styles.fullscreen)}
            data-lenis-prevent

            // Esc: run the closing animation instead of closing instantly
            onCancel={(e) => {
                e.preventDefault()
                onClose()
            }}
        >
            {/* clicking anywhere outside the panel closes the dialog */}
            <div ref={overlayRef} className={styles.overlay} onClick={onClose} />

            <div className={styles.frame}>
                <div ref={panelRef} className={clsx(styles.panel, panelClassName)}>

                    {closeButton && (
                        <button
                            type='button'
                            className={styles.close}
                            onClick={onClose}
                            aria-label={t('close')}
                        >
                            <UxClose />
                        </button>
                    )}

                    {isRendered && children}

                </div>
            </div>
        </dialog>
    )
}
