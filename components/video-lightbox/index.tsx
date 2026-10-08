'use client'

// libraries
import { useState, type ReactNode, type Ref } from 'react'
import Vimeo from '@u-wave/react-vimeo'

// components
import Dialog from '@/components/dialog'

// css
import styles from './video-lightbox.module.scss'

type VideoLightboxProps = {
    videoId: string
    label: string
    className?: string
    ref?: Ref<HTMLAnchorElement>
    children: ReactNode
}

// a link to the vimeo page that opens the full video in a dialog instead
// (without javascript the link still works)
export default function VideoLightbox({ videoId, label, className, ref, children }: VideoLightboxProps) {

    const [isOpen, setIsOpen] = useState(false)

    return (
        <>
            <a
                ref={ref}
                href={`https://vimeo.com/${videoId}`}
                className={className}
                onClick={(e) => {
                    e.preventDefault()
                    setIsOpen(true)
                }}
            >
                {children}
            </a>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                label={label}
                variant='fullscreen'
            >
                <Vimeo
                    video={videoId}
                    className={styles.player}
                    autoplay
                    responsive={false}
                />
            </Dialog>
        </>
    )
}
