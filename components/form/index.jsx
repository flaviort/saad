// libraries
import clsx from 'clsx'
import { Fancybox } from '@fancyapps/ui'
import { useRef, useState, useEffect } from 'react'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'

// utils
import { slugify } from '@/utils/functions'

// svg
import UxArrowRight from '@/assets/svg/ux/arrow-right.svg'

// css
import styles from './form.module.scss'

export const Form = ({ className, children }) => {

    const form = useRef(null)

    // form validations
    const methods = useForm({
        criteriaMode: 'all',
        mode: 'all'
    })
    
    // submit function
    const onSubmit = (data) => {
        form.current.classList.add('sending')

        fetch('../api/sendgrid', {
            method: 'post',
            body: JSON.stringify(data)
        })

        .then(response => {
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

    const closeFancybox = () => {
        console.log('close?')
        Fancybox.close()
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

                <p className={clsx(styles.title, 'font-big')}>
                        Success
                    </p>

                    <p className={styles.text}>
                        Your message has been sent! <br />
                        We will contact you as soon as possible.
                    </p>

                    <button className={styles.button} data-fancybox-close>
                        Close <UxArrowRight />
                    </button>

                </div>
            </div>

            <div className={styles.popup} id='error'>
                <div className={styles.wrapper}>

                    <p className={clsx(styles.title, 'font-big')}>
                        Error
                    </p>

                    <p className={styles.text}>
                        An error occurred while sending your message! <br />
                        Please wait a moment and try again.
                    </p>

                    <button className={styles.button} data-fancybox-close>
                        Close <UxArrowRight />
                    </button>

                </div>
            </div>

        </FormProvider>
    )
}

export const Input = ({ label, type, placeholder, required, maxLength }) => {

    const { register, trigger, formState: { errors } } = useFormContext()

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
    const [isTyping, setIsTyping] = useState(false)

    const handleContentChange = (e) => {
        let inputContent = e.target.value
        setContent(inputContent)
        trigger(label)

        if (inputContent.trim() !== '') {
            setIsTyping(true)
        } else {
            setIsTyping(false)
        }
    }

    const [minWidth, setMinWidth] = useState('');

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth
            const newMinWidth = width > 768 ? `calc(${placeholder.length}rem)` : `calc(${placeholder.length}rem - 4rem)`
            setMinWidth(newMinWidth)
        }

        handleResize()

        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [placeholder.length])

    return (
        <div className={clsx(styles.inputWrapper, errors[label] && styles.error)}>

            <p
                className={clsx(styles.text, isTyping && styles.active)}
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
                className={styles.input}
                onChange={handleContentChange}
                onInput={handleContentChange}
                autoComplete='none'
                role='presentation'
                {...register(label, validations)}
            />

            {errors[label] && (
                <p className={clsx(styles.errorMsg, 'font-smaller')}>
                    {errors[label].message}
                </p>
            )}

        </div>
    )
}