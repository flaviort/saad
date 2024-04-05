// libraries
import clsx from 'clsx'
import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { useRef, useState, useEffect } from 'react'

// utils
import { slugify } from '@/utils/functions'

// components


// svgs
import UxAngleDown from '@/assets/svg/ux/angle-down.svg'

// css
import styles from './form.module.scss'

export const Form = ({ className, children }) => {
    
    // define all refs
    const modalSuccess = useRef(null)
    const modalError = useRef(null)
    const form = useRef(null)

    // useState to make the Modals invisible
    const [ renderSuccessModal, setRenderSuccessModal ] = useState(false)
    const [ renderErrorModal, setRenderErrorModal ] = useState(false)

    // close success modal
    const closeSuccessModal = () => {
        modalSuccess?.current?.close()
        setRenderSuccessModal(false)
    }

    // close error modal
    const closeErrorModal = () => {
        modalError?.current?.close()
        setRenderErrorModal(false)
    }

    // form validations
    const methods = useForm({
        criteriaMode: 'all',
        mode: 'all'
    })
    
    // submit function
    const onSubmit = (data) => {

        form.current.classList.add('sending')

        fetch('/api/sendgrid', {
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
            setRenderSuccessModal(true)

            setTimeout(() => {
                modalSuccess.current.showModal()
                form.current.classList.remove('sending')
                form.current.reset()
            }, 500)
        })

        // if error
        .catch(error => {
            console.error('Error:', error)
            setRenderErrorModal(true)

            setTimeout(() => {
                modalError.current.showModal()
                form.current.classList.remove('sending')
            }, 500)
        })
    }

    return (
        <FormProvider {...methods}>
            <form
                onSubmit={methods.handleSubmit(onSubmit)}
                autoComplete='new-password'
                className={className}
                ref={form}
            >
                {children}
            </form>

            {renderSuccessModal && 
                <p>
                    Success
                </p>
            }

            { renderErrorModal &&
                <p>
                    Error
                </p>
            }
            
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

    useEffect(() => {
        setTimeout(() => {
            document.querySelector('input').setAttribute('autocomplete','none11');
            console.log('done')
        }, 100)
    })

    return (
        <div className={clsx(styles.inputWrapper, errors[label] && styles.error)}>

            <p
                className={clsx(styles.text, isTyping && styles.active)}
                contentEditable='true'
                suppressContentEditableWarning={true}
                tabIndex={-1}
                style={{
                    minWidth: `calc(${placeholder.length}rem - 3.75rem)`,
                }}
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