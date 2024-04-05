// libraries
import clsx from 'clsx'
import { Fancybox } from '@fancyapps/ui'
import { useRef, useState, useEffect } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

// utils
import { debounce, slugify } from '@/utils/functions'

// svg
import UxClose from '@/assets/svg/ux/close.svg'

// css
import styles from './form.module.scss'

export const Form = ({ className, children }) => {

    const form = useRef(null)

    // form validations
    const methods = useForm({
        criteriaMode: 'all',
        mode: 'onBlur'
    })
    
    // submit function
    const onSubmit = (data) => {
        form.current.classList.add('sending')

        fetch('../api/sendgrid', {
            method: 'post',
            body: JSON.stringify(data)
        })

        .then(response => {
            //console.log(JSON.stringify(data))

            if (response.ok) {
                return response.json()
            } else {
                throw new Error('Failed to send message.')
            }
        })

        // if success
        .then(() => {
            setTimeout(() => {
                Fancybox.show([{
                    src: '#success',
                    type: 'inline',
                }])
                form.current.classList.remove('sending')
                form.current.reset()
            }, 500)
        })

        // if error
        .catch(error => {
            console.error('Error:', error)

            setTimeout(() => {
                Fancybox.show([{
                    src: '#error',
                    type: 'inline',
                    contentClick: true
                }])
                form.current.classList.remove('sending')
            }, 500)
        })
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className={className}
                ref={form}
            >
                {children}
            </form>

            <div className={styles.popup} id='success'>
                <div className={styles.wrapper}>

                <p className={clsx(styles.title, 'font-bigger')}>
                        Success
                    </p>

                    <p className={styles.text}>
                        Your message has been sent! <br />
                        We will contact you as soon as possible.
                    </p>

                    <button className={clsx(styles.button, 'font-small')} data-fancybox-close>
                        Close <UxClose />
                    </button>

                </div>
            </div>

            <div className={styles.popup} id='error'>
                <div className={styles.wrapper}>

                    <p className={clsx(styles.title, styles.error, 'font-bigger')}>
                        Error
                    </p>

                    <p className={styles.text}>
                        An error occurred while sending your message! <br />
                        Please wait a moment and try again.
                    </p>

                    <button className={clsx(styles.button, 'font-small')} data-fancybox-close>
                        Close <UxClose />
                    </button>

                </div>
            </div>

        </FormProvider>
    )
}

export const Input = ({ label, type, placeholder, required, maxLength }) => {

    const { register, formState: { errors } } = useFormContext()

    let validations = {
        required: required && 'This field is required',
        maxLength: maxLength && {
            value: maxLength,
            message: `Maximum character limit reached`,
        }
    }

    // add pattern validation for email type
    if (type === 'email') {
        validations = {
            ...validations,
            pattern: {
                value: /\S+@\S+\.\S+/,
                message: 'Invalid email',
            },
        }
    }

    const [content, setContent] = useState('')

    const handleContentChange = (e) => {
        let inputContent = e.target.value
        setContent(inputContent)
    }

    // set min width for input
    const [minWidth, setMinWidth] = useState('')

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            const newMinWidth = width > 768 ? `calc(${placeholder.length}rem)` : `calc(${placeholder.length}rem - 3.75rem)`
            setMinWidth(newMinWidth)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [placeholder.length])

    // timeout
    const scope = useRef()
    const error = useRef()

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

            <p
                className={clsx(styles.text)}
                contentEditable='true'
                suppressContentEditableWarning={true}
                tabIndex={-1}
                style={{ minWidth: minWidth }}
            >
                {content || placeholder}
            </p>

            <input
                type={type}
                id={slugify(label)}
                placeholder={placeholder}
                className={styles.input}
                onChange={handleContentChange}
                onInput={handleContentChange}
                autoComplete='none'
                role='presentation'
                style={{ minWidth: minWidth }}
                {...register(label, validations)}
            />

            {errors[label] && (
                <p ref={error} className={clsx(styles.errorMsg, 'gsap-error font-smaller')}>
                    {errors[label].message}
                </p>
            )}

        </div>
    )
}