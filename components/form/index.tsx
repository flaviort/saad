'use client'

// libraries
import { useTranslations } from 'next-intl'
import clsx from 'clsx'
import { Fancybox } from '@fancyapps/ui/dist/fancybox/fancybox.js'
import { useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { useForm, FormProvider, useFormContext, type RegisterOptions } from 'react-hook-form'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// utils
import { slugify } from '@/utils/functions'

// svg
import UxClose from '@/assets/svg/ux/close.svg'

// css
import styles from './form.module.scss'

// every field is a plain string, keyed by its label
type FormValues = Record<string, string>

type FormProps = {
    className?: string
    children: ReactNode
}

export const Form = ({ className, children }: FormProps) => {

    const t = useTranslations('Form')
    const [isSending, setIsSending] = useState(false)

    // form validations
    const methods = useForm<FormValues>({
        criteriaMode: 'all',
        mode: 'onBlur'
    })
    
    // submit function
    const onSubmit = (data: FormValues) => {
        setIsSending(true)

        fetch('/api/sendgrid', {
            method: 'post',
            body: JSON.stringify(data)
        })

        .then(response => {
            //console.log(JSON.stringify(data))

            if (response.ok) {
                return response.json()
            } else {
                throw new Error(t('sendFailed'))
            }
        })

        // if success
        .then(() => {
            setTimeout(() => {
                Fancybox.show([{
                    src: '#success',
                    type: 'inline',
                }])
                setIsSending(false)
                methods.reset()
            }, 500)
        })

        // if error
        .catch(error => {
            console.error('Error:', error)

            setTimeout(() => {
                Fancybox.show([{
                    src: '#error',
                    type: 'inline'
                }])
                setIsSending(false)
            }, 500)
        })
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={(e) => methods.handleSubmit(onSubmit)(e)}
                className={clsx(className, isSending && 'sending')}
            >
                {children}
            </form>

            <div className={styles.popup} id='success'>
                <div className={styles.wrapper}>

                    <p className={clsx(styles.title, 'font-bigger')}>
                        {t('Success.title')}
                    </p>

                    <p className={styles.text}>
                        {t('Success.line_01')} <br />
                        {t('Success.line_02')}
                    </p>

                    <button className={clsx(styles.button, 'font-small')} data-fancybox-close>
                        {t('close')} <UxClose />
                    </button>

                </div>
            </div>

            <div className={styles.popup} id='error'>
                <div className={styles.wrapper}>

                    <p className={clsx(styles.title, styles.error, 'font-bigger')}>
                        {t('Error.title')}
                    </p>

                    <p className={styles.text}>
                        {t('Error.line_01')} <br />
                        {t('Error.line_02')}
                    </p>

                    <button className={clsx(styles.button, 'font-small')} data-fancybox-close>
                        {t('close')} <UxClose />
                    </button>

                </div>
            </div>

        </FormProvider>
    )
}

type InputProps = {
    label: string
    type: 'text' | 'email' | 'tel'
    placeholder: string
    required?: boolean
    maxLength?: number
    className?: string
}

export const Input = ({ label, type, placeholder, required, maxLength, className }: InputProps) => {

    const t = useTranslations('Form')
    const { register, watch, formState: { errors } } = useFormContext()

    const validations: RegisterOptions<FormValues> = {
        required: required ? t('Validation.required') : false,
        maxLength: maxLength ? {
            value: maxLength,
            message: t('Validation.maxLength'),
        } : undefined,

        // email fields also need a valid address
        pattern: type === 'email' ? {
            value: /\S+@\S+\.\S+/,
            message: t('Validation.email'),
        } : undefined
    }

    // the visible text mirrors the field value (cleared by reset() after sending)
    const value = watch(label)

    // timeout
    const scope = useRef<HTMLDivElement>(null)
    const error = useRef<HTMLParagraphElement>(null)

    useGSAP(() => {
        if(error.current) {
            const tl = gsap.timeline({
                paused: true,
                onComplete: () => {
                    tl.seek(0).pause()
                }
            })

            tl.to('.gsap-error', {
                opacity: 1,
                y: 0,
            })
            
            tl.to('.gsap-error', {
                opacity: 0,
                y: -20,
                delay: 2
            })

            tl.play()
        }
    }, { dependencies: [errors[label]], scope: scope })

    return (
        <div
            className={clsx(styles.inputWrapper, errors[label] && styles.error)}
            style={{ '--placeholder-length': placeholder.length } as CSSProperties}
            ref={scope}
        >

            <p
                className={clsx(styles.text)}
                contentEditable='true'
                suppressContentEditableWarning={true}
                tabIndex={-1}
            >
                {value || placeholder}
            </p>

            <input
                type={type}
                id={slugify(label)}
                placeholder={placeholder}
                className={clsx(styles.input, className)}
                autoComplete='none'
                role='presentation'
                {...register(label, validations)}
            />

            {errors[label] && (
                <p ref={error} className={clsx(styles.errorMsg, 'gsap-error font-smaller')}>
                    {String(errors[label]?.message ?? '')}
                </p>
            )}

        </div>
    )
}

type SelectProps = {
    label: string
    required?: boolean
    children: ReactNode
    className?: string
}

export const Select = ({ label, required, children, className }: SelectProps) => {

    const t = useTranslations('Form')
    const { register, formState: { errors }, watch } = useFormContext()
    
    // Watch the value of this select field
    const selectValue = watch(label)
    
    // Track if an option has been selected
    const hasSelection = Boolean(selectValue)

    const validations: RegisterOptions<FormValues> = {
        required: required ? t('Validation.required') : false
    }

    // timeout
    const scope = useRef<HTMLDivElement>(null)
    const error = useRef<HTMLParagraphElement>(null)
    

    useGSAP(() => {
        if(error.current) {
            const tl = gsap.timeline({
                paused: true,
                onComplete: () => {
                    tl.seek(0).pause()
                }
            })

            tl.to('.gsap-error', {
                opacity: 1,
                y: 0,
            })
            
            tl.to('.gsap-error', {
                opacity: 0,
                y: -20,
                delay: 2
            })

            tl.play()
        }
    }, { dependencies: [errors[label]], scope: scope })

    return (
        <div className={clsx(styles.inputWrapper, errors[label] && styles.error)} ref={scope}>

            <select
                id={slugify(label)}
                className={clsx(styles.input, styles.select, hasSelection && styles.selected, className)}
                defaultValue=""
                {...register(label, validations)}
            >
                {children}
            </select>

            {errors[label] && (
                <p ref={error} className={clsx(styles.errorMsg, 'gsap-error font-smaller')}>
                    {String(errors[label]?.message ?? '')}
                </p>
            )}

        </div>
    )
}