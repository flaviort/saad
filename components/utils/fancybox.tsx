'use client'

//libraries
import { useRef, useEffect, type ReactNode } from 'react'
import { Fancybox as NativeFancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js'
import '@fancyapps/ui/dist/fancybox/fancybox.css'

type FancyboxOptions = NonNullable<Parameters<typeof NativeFancybox.show>[1]>

type FancyboxProps = {
    delegate?: string
    options?: FancyboxOptions
    children: ReactNode
}

export default function Fancybox(props: FancyboxProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const container = containerRef.current

        const delegate = props.delegate || '[data-fancybox]'
        const options = props.options || {}

        NativeFancybox.bind(container, delegate, options)

        return () => {
            NativeFancybox.unbind(container)
            NativeFancybox.close()
        }
    })

    return (
        <div ref={containerRef}>
            {props.children}
        </div>
    )
    
}