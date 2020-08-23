import React, {useRef, useEffect} from 'react';
import Layout from 'components/MyLayout'
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint, linkResolver} from 'prismic-configuration'
import {Button, Container, Divider, Header, Icon, Message, Segment, Transition} from 'semantic-ui-react'
import useForm from "utils/useForm";
import {getEtVous, getMenu} from "utils/api";
import {RichText} from "prismic-reactjs";
import {htmlSerializer} from "utils/htmlSerializer";
import {layoutStyle} from "utils/css";
import { CONSTANTS } from 'utils/CONSTANTS';


const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetBottom);

const EtVous = (props) => {
    const initialState = {
        "parent": null,
        "gender": "",
        "age_band": "",
        "doses": ""
    };

    const {values, handleChange, handleSubmit} = useForm(initialState, null);
    let male_message_to_display = "male";
    let under_11_message_to_display = "under_11";
    let over_20_message_to_display = "over_20";


    // Conditions
    const is_parent_filled_out = values.parent !== null;
    const is_gender_filled_out = values.gender !== "";
    const is_age_band_filled_out = values.age_band !== "";
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
    const is_vaccinable = is_age_band_filled_out && !["under_11", "over_20"].includes(values.age_band);
    const can_have_3_doses = ["under_20", "over_20"].includes(values.age_band);
    const is_advice_displayed = is_vaccinable && is_dose_filled_out &&
        !(!can_have_3_doses && values.doses === 3);


    let final_message_to_display = `${values.age_band}_${values.doses}`;

    if (values.parent === true) {
        male_message_to_display += '_parent'
        under_11_message_to_display += '_parent'
        over_20_message_to_display += '_parent'
        final_message_to_display += '_parent'
    }

    if (is_male) {
        under_11_message_to_display += '_male'
        over_20_message_to_display += '_male'
        final_message_to_display += '_male'
    }

    const adviceRef = useRef(null);

/*    useEffect(() => {
        if (is_advice_displayed) {
            scrollToRef(adviceRef)
        }
    }, [adviceRef]);*/

    return (
        <Layout title={RichText.asText(props.et_vous.data.title)}
                description={RichText.asText(props.et_vous.data.description)}
                canonical={'https://' + props.host + '/et-vous'}
                source_indexes={[0, 1, 2, 3, 4, 8]}
                host={props.host}
                menu={props.menu}
                page_sections={props.page_sections}
                pathname={props.pathname}>

            <Container
                text
                className={layoutStyle}
                textAlign='justified'
            >
                <Header as="h1">{RichText.asText(props.et_vous.data.title)}</Header>

                <Divider hidden/>
                <p>
                    Cette page vous permet d'obtenir des informations personnalisées sous forme d'une synthèse sur votre
                    situation par rapport aux vaccins HPV, répondez simplement aux questions.
                    Aucune conservation des données n'est réalisée.
                </p>

                <Divider hidden/>

                <Segment basic textAlign='center'>
                    <label> Vous recherchez des informations pour: </label>
                    <Button.Group
                        inline="true"
                        size="large"
                    >
                        <Button
                            positive={is_child}
                            value={false}
                            name="parent"
                            onClick={handleChange}
                        ><Icon name="hand point up"/> Vous-même</Button>
                        <Button.Or text="ou"/>
                        <Button
                            positive={is_parent}
                            value={true}
                            name="parent"
                            onClick={handleChange}
                        ><Icon name="child"/> Votre enfant
                        </Button>
                    </Button.Group>

                    <Transition visible={is_parent_filled_out} animation='scale' duration={500}>
                        <div>

                            <Divider hidden/>
                            <label> {is_parent ? "Votre enfant est:" : "Vous êtes:"} </label>
                            <Button.Group
                                inline="true"
                                size="large"
                            >
                                <Button
                                    positive={is_female}
                                    value="female"
                                    name="gender"
                                    onClick={handleChange}
                                ><Icon name="female"/> Une fille</Button>
                                <Button.Or text="ou"/>
                                <Button
                                    positive={is_male}
                                    value="male"
                                    name="gender"
                                    onClick={handleChange}
                                ><Icon name="male"/> Un garçon
                                </Button>
                            </Button.Group>

                            <Transition visible={is_gender_filled_out} animation='scale' duration={500}>
                                <div>
                                    <Divider hidden/>
                                    <label>{is_parent ? "Votre fille a:" : "Vous avez:"} </label>
                                    <Button.Group
                                        size="large"
                                    >
                                        <Button positive={is_under_11} value="under_11"
                                                name="age_band"
                                                onClick={handleChange}><Icon name="child" size="small"/>Moins de 11
                                            ans</Button>
                                        <Button positive={is_under_15} value="under_15"
                                                name="age_band"
                                                onClick={handleChange}><Icon name="child"/>11 - 14 ans</Button>
                                        <Button positive={is_under_20} value="under_20"
                                                name="age_band"
                                                onClick={handleChange}><Icon name="child" size="large"/>15 - 19
                                            ans</Button>
                                        <Button positive={is_over_20} value="over_20" name="age_band"
                                                onClick={handleChange}><Icon name="child" size="large"/>Plus de 20
                                            ans</Button>
                                    </Button.Group>

                                    <Transition visible={is_vaccinable} animation='scale' duration={500}>
                                        <div>
                                            <Divider hidden/>
                                            <label> Vaccin: </label>
                                            <Button.Group
                                                size="large"
                                            >
                                                <Button positive={values.doses === 0} value={0} name="doses"
                                                        onClick={handleChange}>Jamais vaccinée</Button>
                                                <Button positive={values.doses === 1} value={1} name="doses"
                                                        onClick={handleChange}>1 dose</Button>
                                                <Button positive={values.doses === 2} value={2} name="doses"
                                                        onClick={handleChange}>2 doses</Button>
                                                {
                                                    can_have_3_doses &&
                                                    <Button positive={values.doses === 3} value={3} name="doses"
                                                            onClick={handleChange}>3 doses</Button>
                                                }
                                            </Button.Group>

                                        </div>
                                    </Transition>
                                </div>
                            </Transition>
                        </div>
                    </Transition>
                </Segment>

                <Divider hidden/>

{/*                <Transition visible={is_male} animation='scale' duration={500}>
                {
                    is_male ?
                        <Message error visible={is_male}>
                            <Message.Content>
                                {RichText.render(props.et_vous.data[male_message_to_display], linkResolver, htmlSerializer).props.children}
                            </Message.Content>
                        </Message>
                        : <></>
                }
                </Transition>*/}


                <Transition visible={is_underage} animation='scale' duration={500}>
                {
                    is_underage ?
                        <Message error visible={is_underage}
                        >{RichText.render(props.et_vous.data[under_11_message_to_display], linkResolver, htmlSerializer)}
                        </Message>
                        : <></>
                }
                </Transition>

                <Transition visible={is_overage} animation='scale' duration={500}>
                {
                    is_overage ?
                        <Message
                            error
                            visible={is_overage}
                        >{RichText.render(props.et_vous.data[over_20_message_to_display], linkResolver, htmlSerializer)}
                        </Message>
                        : <></>
                }
                </Transition>

                <Transition visible={is_advice_displayed}
                            animation='scale'
                            duration={500}
                            //onComplete={() => {scrollToRef(adviceRef)}}
                >
                    {
                        is_advice_displayed ?
                            <Message info visible={is_advice_displayed} ref={adviceRef}>
                                {RichText.render(props.et_vous.data[final_message_to_display], linkResolver, htmlSerializer)}
                            </Message>
                            : <></>
                    }
                </Transition>
            </Container>
        </Layout>
    )
};


export const getStaticProps = async function () {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const et_vous = getEtVous(API)
    const menu = await getMenu(API)

    return {
        props: {
            pathname: "/et-vous",
            host: process.env.NEXT_PUBLIC_HOSTNAME || CONSTANTS.hostname,
            et_vous: await et_vous,
            ...menu
        },
        revalidate: process.env.REVALIDATE_TIME_SECONDS || CONSTANTS.revalidate
    }
}

export default EtVous