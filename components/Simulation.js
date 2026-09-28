'use client'

import {Fragment, useState} from 'react'
import RichText from '@/components/RichText'
import Button from '@/components/ui/Button'
import Icon from '@/components/ui/Icon'
import Message from '@/components/ui/Message'

// A question and its answers, shown as toggle buttons
function Question({label, options, value, onChange}) {
    return (
        <fieldset className="mt-8 text-center motion-safe:animate-appear">
            <legend className="mx-auto mb-3 font-bold">{label}</legend>
            <div className="flex flex-wrap items-center justify-center gap-2">
                {options.map((option, index) => (
                    <Fragment key={String(option.value)}>
                        {index > 0 && options.length === 2 && <span className="text-sm text-neutral-600">ou</span>}
                        <Button
                            variant="choice"
                            selected={option.value === value}
                            aria-pressed={option.value === value}
                            onClick={() => onChange(option.value)}
                        >
                            {option.icon && <Icon name={option.icon} className={option.iconClass}/>}
                            {option.label}
                        </Button>
                    </Fragment>
                ))}
            </div>
        </fieldset>
    )
}

// Personalised advice: the answers to a few questions select one of the messages of the et_vous document
export default function Simulation({data}) {
    const [parent, setParent] = useState(null)
    const [gender, setGender] = useState(null)
    const [ageBand, setAgeBand] = useState(null)
    const [doses, setDoses] = useState(null)

    const isVaccinable = ageBand === 'under_15' || ageBand === 'under_20'
    const canHave3Doses = ageBand === 'under_20' || ageBand === 'over_20'
    const isAdviceDisplayed = isVaccinable && doses !== null && (canHave3Doses || doses !== 3)

    // Name of the et_vous field holding the message, e.g. "under_15_2_parent_male"
    const suffix = (parent ? '_parent' : '') + (gender === 'male' ? '_male' : '')
    const message =
        ageBand === 'under_11' || ageBand === 'over_20' ? {variant: 'error', field: ageBand + suffix}
        : isAdviceDisplayed ? {variant: 'info', field: `${ageBand}_${doses}${suffix}`}
        : null

    return (
        <>
            <Question
                label="Vous recherchez des informations pour :"
                value={parent}
                onChange={setParent}
                options={[
                    {value: false, label: 'Vous-même', icon: 'hand point up'},
                    {value: true, label: 'Votre enfant', icon: 'child'},
                ]}
            />

            {parent !== null &&
                <Question
                    label={parent ? 'Votre enfant est :' : 'Vous êtes :'}
                    value={gender}
                    onChange={setGender}
                    options={[
                        {value: 'female', label: 'Une fille', icon: 'female'},
                        {value: 'male', label: 'Un garçon', icon: 'male'},
                    ]}
                />
            }

            {gender !== null &&
                <Question
                    label={!parent ? 'Vous avez :' : gender === 'male' ? 'Votre fils a :' : 'Votre fille a :'}
                    value={ageBand}
                    onChange={setAgeBand}
                    options={[
                        {value: 'under_11', label: 'Moins de 11 ans', icon: 'child', iconClass: 'text-sm'},
                        {value: 'under_15', label: '11 - 14 ans', icon: 'child', iconClass: 'text-base'},
                        {value: 'under_20', label: '15 - 19 ans', icon: 'child', iconClass: 'text-xl'},
                        {value: 'over_20', label: 'Plus de 20 ans', icon: 'child', iconClass: 'text-2xl'},
                    ]}
                />
            }

            {isVaccinable &&
                <Question
                    label="Vaccin :"
                    value={doses}
                    onChange={setDoses}
                    options={[
                        {value: 0, label: gender === 'male' ? 'Jamais vacciné' : 'Jamais vaccinée'},
                        {value: 1, label: '1 dose'},
                        {value: 2, label: '2 doses'},
                        ...(canHave3Doses ? [{value: 3, label: '3 doses'}] : []),
                    ]}
                />
            }

            {message &&
                <Message key={message.field} variant={message.variant} className="mt-10 motion-safe:animate-appear" role="status">
                    <RichText field={data[message.field]}/>
                </Message>
            }
        </>
    )
}
