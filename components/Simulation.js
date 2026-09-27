'use client'

import {PrismicRichText} from '@prismicio/react'
import {linkResolver} from '@/prismic-configuration'
import Button, {ButtonGroup, ButtonIcon, ButtonOr} from '@/components/ui/Button'
import Divider from '@/components/ui/Divider'
import Message from '@/components/ui/Message'
import Transition from '@/components/ui/Transition'
import useForm from '@/utils/useForm'
import {richTextComponents} from '@/utils/richText'

// Button of an answer: green when selected
const Choice = ({selected, onClick, children}) => (
    <Button grouped size="large" color={selected ? 'positive' : undefined} onClick={onClick}>
        {children}
    </Button>
)

// Personalised advice: the answers to a few questions select one of the messages of the et_vous document
export default function Simulation({data}) {
    const initialState = {
        "parent": null,
        "gender": "",
        "age_band": "",
        "doses": ""
    };

    const {values, handleChange} = useForm(initialState, null);
    const choose = (name, value) => () => handleChange(name, value)
    let under_11_message_to_display = "under_11";
    let over_20_message_to_display = "over_20";


    // Conditions
    const is_parent_filled_out = values.parent !== null;
    const is_gender_filled_out = values.gender !== "";
    const is_dose_filled_out = values.doses !== "";

    const is_parent = values.parent === true;
    const is_child = values.parent === false;
    const is_male = values.gender === "male";
    const is_female = values.gender === "female";
    const is_under_11 = values.age_band === "under_11";
    const is_under_15 = values.age_band === "under_15";
    const is_under_20 = values.age_band === "under_20";
    const is_over_20 = values.age_band === "over_20";
    const is_underage = is_under_11;
    const is_overage = is_over_20;
    const is_vaccinable = values.age_band !== "" && !["under_11", "over_20"].includes(values.age_band);
    const can_have_3_doses = ["under_20", "over_20"].includes(values.age_band);
    const is_advice_displayed = is_vaccinable && is_dose_filled_out &&
        !(!can_have_3_doses && values.doses === 3);


    let final_message_to_display = `${values.age_band}_${values.doses}`;

    if (values.parent === true) {
        under_11_message_to_display += '_parent'
        over_20_message_to_display += '_parent'
        final_message_to_display += '_parent'
    }

    if (is_male) {
        under_11_message_to_display += '_male'
        over_20_message_to_display += '_male'
        final_message_to_display += '_male'
    }

    const richText = (field) => <PrismicRichText field={field} linkResolver={linkResolver} components={richTextComponents}/>

    return (
        <>
            <Divider hidden/>
            <p>
                Cette page vous permet d&apos;obtenir des informations personnalisées sous forme d&apos;une synthèse sur votre
                situation par rapport aux vaccins HPV, répondez simplement aux questions.
                Aucune conservation des données n&apos;est réalisée.
            </p>

            <Divider hidden/>

            <div className="relative my-[1rem] p-[1em] text-center text-[1rem]">
                <label> Vous recherchez des informations pour: </label>
                <ButtonGroup>
                    <Choice selected={is_child} onClick={choose('parent', false)}>
                        <ButtonIcon name="hand point up"/> Vous-même
                    </Choice>
                    <ButtonOr size="large"/>
                    <Choice selected={is_parent} onClick={choose('parent', true)}>
                        <ButtonIcon name="child"/> Votre enfant
                    </Choice>
                </ButtonGroup>

                <Transition visible={is_parent_filled_out}>
                    <div>

                        <Divider hidden/>
                        <label> {is_parent ? "Votre enfant est:" : "Vous êtes:"} </label>
                        <ButtonGroup>
                            <Choice selected={is_female} onClick={choose('gender', 'female')}>
                                <ButtonIcon name="female"/> Une fille
                            </Choice>
                            <ButtonOr size="large"/>
                            <Choice selected={is_male} onClick={choose('gender', 'male')}>
                                <ButtonIcon name="male"/> Un garçon
                            </Choice>
                        </ButtonGroup>

                        <Transition visible={is_gender_filled_out}>
                            <div>
                                <Divider hidden/>
                                <label>{is_parent ? "Votre fille a:" : "Vous avez:"} </label>
                                <ButtonGroup>
                                    <Choice selected={is_under_11} onClick={choose('age_band', 'under_11')}>
                                        <ButtonIcon name="child" size="small"/>Moins de 11 ans
                                    </Choice>
                                    <Choice selected={is_under_15} onClick={choose('age_band', 'under_15')}>
                                        <ButtonIcon name="child"/>11 - 14 ans
                                    </Choice>
                                    <Choice selected={is_under_20} onClick={choose('age_band', 'under_20')}>
                                        <ButtonIcon name="child" size="large"/>15 - 19 ans
                                    </Choice>
                                    <Choice selected={is_over_20} onClick={choose('age_band', 'over_20')}>
                                        <ButtonIcon name="child" size="large"/>Plus de 20 ans
                                    </Choice>
                                </ButtonGroup>

                                <Transition visible={is_vaccinable}>
                                    <div>
                                        <Divider hidden/>
                                        <label> Vaccin: </label>
                                        <ButtonGroup>
                                            <Choice selected={values.doses === 0} onClick={choose('doses', 0)}>
                                                Jamais vaccinée
                                            </Choice>
                                            <Choice selected={values.doses === 1} onClick={choose('doses', 1)}>
                                                1 dose
                                            </Choice>
                                            <Choice selected={values.doses === 2} onClick={choose('doses', 2)}>
                                                2 doses
                                            </Choice>
                                            {
                                                can_have_3_doses &&
                                                <Choice selected={values.doses === 3} onClick={choose('doses', 3)}>
                                                    3 doses
                                                </Choice>
                                            }
                                        </ButtonGroup>

                                    </div>
                                </Transition>
                            </div>
                        </Transition>
                    </div>
                </Transition>
            </div>

            <Divider hidden/>

            {/* The messages disappear at once when the answers change, and only appear with an animation */}
            <Transition visible={is_underage} animateOut={false}>
                <Message variant="error">{richText(data[under_11_message_to_display])}</Message>
            </Transition>

            <Transition visible={is_overage} animateOut={false}>
                <Message variant="error">{richText(data[over_20_message_to_display])}</Message>
            </Transition>

            <Transition visible={is_advice_displayed} animateOut={false}>
                <Message variant="info">{richText(data[final_message_to_display])}</Message>
            </Transition>
        </>
    )
}
