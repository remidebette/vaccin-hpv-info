'use client'

import Button from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import Message, {MessageHeader} from '@/components/ui/Message'
import {cn} from '@/components/ui/cn'
import useForm from '@/utils/useForm'

const mailFormat = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const field = 'clear-both mt-0 mx-0 mb-[1em] last:mb-0'
const label = 'block mt-0 mx-0 mb-[.285715rem] text-[.928572em] font-bold normal-case'
const control = cn(
    'm-0 max-w-full outline-none appearance-none text-left py-[.678572em] px-[1em] text-[1em] bg-white border border-[rgba(34,36,38,.15)] rounded-[.285715rem] text-[rgba(0,0,0,.87)] shadow-[inset_0_0_0_0_transparent]',
    'transition-[color,border-color] duration-100 ease-[ease] placeholder:text-[rgba(191,191,191,.87)] focus:placeholder:text-[rgba(115,115,115,.87)]',
    'focus:text-[rgba(0,0,0,.95)] focus:border-[#85b7d9] focus:bg-white focus:shadow-[inset_0_0_0_0_rgba(34,36,38,.35)]',
)
const inputControl = cn(control, 'flex-[1_0_auto] font-lato leading-[1.21429em] align-top [-webkit-tap-highlight-color:rgba(255,255,255,0)]')
const errorControl = cn(
    'bg-[#fff6f6] border-[#e0b4b4] text-[#9f3a38] shadow-none placeholder:text-[#e7bdbc] focus:placeholder:text-[#da9796]',
    'focus:bg-[#fff6f6] focus:border-[#e0b4b4] focus:text-[#9f3a38] focus:shadow-none',
)

const Field = ({id, text, error, children}) => (
    <div className={cn(field, error && 'text-[#9f3a38]')}>
        <label htmlFor={id} className={cn(label, error ? 'text-[#9f3a38]' : 'text-[rgba(0,0,0,.87)]')}>{text}</label>
        {children}
    </div>
)

// Opens the visitor's mail client with a message to the authors
export default function ContactForm() {
    const initialState = {
        "mail": undefined,
        "subject": undefined,
        "message": undefined,
        "sent": false
    };
    const {values, handleChange, handleSubmit} = useForm(initialState, sendMail);

    const isProperMail = mailFormat.test(values.mail);
    const isProperSubject = values.subject !== "";
    const isProperMessage = values.message !== "";

    const isErrorMail = values.mail !== undefined && !isProperMail;
    const isErrorSubject = values.subject !== undefined && !isProperSubject;
    const isErrorMessage = values.message !== undefined && !isProperMessage;

    const isButtonActive = isProperMail && isProperSubject && isProperMessage;

    function sendMail() {
        const link = "mailto:contact@vaccin-hpv-info.fr"
            + "?cc=" + values.mail
            + "&subject=" + encodeURIComponent(values.subject)
            + "&body=" + encodeURIComponent(values.message + "\n\n")
        ;

        window.location.href = link;

        handleChange("sent", true);
    }

    const onChange = (event) => handleChange(event.target.name, event.target.value)

    if (values.sent) {
        return (
            <>
                <Message>
                    <MessageHeader>Nous avons ouvert votre éditeur de mail !</MessageHeader>
                    <p>
                        Pensez à vérifiez vos mails pour notre réponse.
                    </p>
                </Message>

                {Array.from({length: 12}, (_, i) => <Divider hidden key={i}/>)}
            </>
        )
    }

    return (
        <form className="relative max-w-full text-[1rem]">
            <Field id="contact-mail" text="Adresse mail" error={isErrorMail}>
                <div className="relative inline-flex w-full font-normal not-italic text-[1em]">
                    <input id="contact-mail" type="text" placeholder="Adresse mail" name="mail" value={values.mail ?? ''}
                           onChange={onChange} className={cn(inputControl, 'w-auto', isErrorMail && errorControl)}/>
                </div>
            </Field>

            <Field id="contact-subject" text="Sujet" error={isErrorSubject}>
                <div className="relative flex w-full font-normal not-italic text-[1em]">
                    <input id="contact-subject" type="text" placeholder="Sujet" name="subject" value={values.subject ?? ''}
                           onChange={onChange} className={cn(inputControl, 'w-0!', isErrorSubject && errorControl)}/>
                </div>
            </Field>

            <Field id="contact-message" text="Votre message" error={isErrorMessage}>
                <textarea id="contact-message" placeholder="Dites nous en plus..." rows={10} name="message" value={values.message ?? ''}
                          onChange={onChange}
                          className={cn(control, 'w-full align-top py-[.785715em] leading-[1.2857] resize-y', isErrorMessage && errorControl)}/>
            </Field>

            <div className={cn(field, !isButtonActive && 'pointer-events-none opacity-45')}>
                <Button type="button" size="large" disabled={!isButtonActive} tabIndex={isButtonActive ? undefined : -1}
                        onClick={handleSubmit}>Envoi</Button>
            </div>
        </form>
    )
}
