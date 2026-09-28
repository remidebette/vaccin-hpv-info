'use client'

import {useState} from 'react'
import Button from '@/components/ui/Button'
import Message from '@/components/ui/Message'

const mailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function Field({id, label, error, children}) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-bold">{label}</label>
            {children}
            {error && <p id={`${id}-error`} className="mt-1 text-sm text-red-700">{error}</p>}
        </div>
    )
}

const control = (invalid) =>
    `mt-1 block w-full rounded-md border bg-white px-3 py-2 placeholder:text-neutral-500 focus:outline-2 focus:outline-offset-0 ${
        invalid ? 'border-red-600 focus:outline-red-600' : 'border-neutral-300 focus:border-brand focus:outline-brand'}`

// Opens the visitor's mail client with a message to the authors
export default function ContactForm() {
    // Fields are only checked once the visitor has typed in them
    const [values, setValues] = useState({mail: null, subject: null, message: null})
    const [sent, setSent] = useState(false)

    const errors = {
        mail: values.mail !== null && !mailFormat.test(values.mail) && 'Adresse mail invalide',
        subject: values.subject === '' && 'Veuillez indiquer un sujet',
        message: values.message === '' && 'Veuillez écrire un message',
    }
    const isValid = mailFormat.test(values.mail ?? '') && values.subject && values.message

    function onChange(event) {
        setValues({...values, [event.target.name]: event.target.value})
    }

    function onSubmit(event) {
        event.preventDefault()
        window.location.href = 'mailto:contact@vaccin-hpv-info.fr'
            + '?cc=' + values.mail
            + '&subject=' + encodeURIComponent(values.subject)
            + '&body=' + encodeURIComponent(values.message + '\n\n')
        setSent(true)
    }

    if (sent) {
        return (
            <Message variant="success" className="mt-6" role="status">
                <p className="font-bold">Nous avons ouvert votre éditeur de mail !</p>
                <p className="mt-1">Pensez à vérifier vos mails pour notre réponse.</p>
            </Message>
        )
    }

    const props = (name) => ({
        id: `contact-${name}`,
        name,
        value: values[name] ?? '',
        onChange,
        'aria-invalid': Boolean(errors[name]),
        'aria-describedby': errors[name] ? `contact-${name}-error` : undefined,
        className: control(errors[name]),
    })

    return (
        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
            <Field id="contact-mail" label="Adresse mail" error={errors.mail}>
                <input type="email" autoComplete="email" placeholder="nom@exemple.fr" {...props('mail')}/>
            </Field>
            <Field id="contact-subject" label="Sujet" error={errors.subject}>
                <input type="text" {...props('subject')}/>
            </Field>
            <Field id="contact-message" label="Votre message" error={errors.message}>
                <textarea rows={8} placeholder="Dites nous en plus..." {...props('message')}/>
            </Field>
            <Button type="submit" disabled={!isValid}>Envoyer</Button>
        </form>
    )
}
