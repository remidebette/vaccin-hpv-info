import React from 'react';
import Layout from 'components/MyLayout'
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint, linkResolver} from 'prismic-configuration'
import {Button, Divider, Header, Icon, Message, Segment, Transition} from 'semantic-ui-react'
import useForm from "utils/useForm";
import {getEtVous, getMenu} from "../utils/api";
import {RichText} from "prismic-reactjs";
import {htmlSerializer} from "../utils/htmlSerializer";

const EtVous = (props) => {
    const initialState = {
        "parent": null,
        "gender": "",
        "age_band": "",
        "doses": ""
    };

    const {values, handleChange, handleSubmit} = useForm(initialState, null);

    return (
        <Layout menu={props.menu} page_sections={props.page_sections} pathname={props.pathname}>
            <Header as="h1">{RichText.asText(props.et_vous.data.title)}</Header>

            <Segment basic textAlign='center'>
                <label> Vous recherchez des informations pour: </label>
                <Button.Group inline="true">
                    <Button
                        positive={values.parent === false}
                        value={false}
                        name="parent"
                        onClick={handleChange}
                    ><Icon name="hand point up"/> Vous-même</Button>
                    <Button.Or text="ou"/>
                    <Button
                        positive={values.parent === true}
                        value={true}
                        name="parent"
                        onClick={handleChange}
                    ><Icon name="child"/> Votre enfant
                    </Button>
                </Button.Group>

                <Transition visible={values.parent !== null} animation='scale'
                            duration={500}>
                    <div>

                        <Divider hidden/>
                        <label> {values.parent === false ? "Vous êtes:" : "Votre enfant est:"} </label>
                        <Button.Group inline="true">
                            <Button
                                positive={values.gender === "female"}
                                value="female"
                                name="gender"
                                onClick={handleChange}
                            ><Icon name="female"/> Une fille</Button>
                            <Button.Or text="ou"/>
                            <Button
                                positive={values.gender === "male"}
                                value="male"
                                name="gender"
                                onClick={handleChange}
                            ><Icon name="male"/> Un garçon
                            </Button>
                        </Button.Group>

                        <Transition visible={values.gender === "female"} animation='scale'
                                    duration={500}>
                            <div>
                                <Divider hidden/>
                                <label>{values.parent === false ? "Vous avez:" : "Votre fille a:"} </label>
                                <Button.Group>
                                    <Button positive={values.age_band === "under_11"} value="under_11" name="age_band"
                                            onClick={handleChange}><Icon name="child" size="small"/>Moins de 11
                                        ans</Button>
                                    <Button positive={values.age_band === "under_15"} value="under_15" name="age_band"
                                            onClick={handleChange}><Icon name="child"/>11 - 14 ans</Button>
                                    <Button positive={values.age_band === "under_20"} value="under_20" name="age_band"
                                            onClick={handleChange}><Icon name="child" size="large"/>15 - 19 ans</Button>
                                    <Button positive={values.age_band === "over_20"} value="over_20" name="age_band"
                                            onClick={handleChange}><Icon name="child" size="large"/>Plus de 20
                                        ans</Button>
                                </Button.Group>

                                <Transition
                                    visible={values.age_band !== "" && !["under_11", "over_20"].includes(values.age_band)}
                                    animation='scale'
                                    duration={500}>
                                    <div>
                                        <Divider hidden/>
                                        <label> Vaccin: </label>
                                        <Button.Group>
                                            <Button positive={values.doses === 0} value={0} name="doses"
                                                    onClick={handleChange}>Jamais vaccinée</Button>
                                            <Button positive={values.doses === 1} value={1} name="doses"
                                                    onClick={handleChange}>1 dose</Button>
                                            <Button positive={values.doses === 2} value={2} name="doses"
                                                    onClick={handleChange}>2 doses</Button>
                                            {
                                                values.age_band === "under_20" &&
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

            <Transition visible={values.gender === "male"} animation='scale' duration={500}>
                <Message
                    error
                    visible={values.gender === "male"}
                >
                    <Message.Content>{RichText.render(props.et_vous.data.male, linkResolver, htmlSerializer).props.children}
                    </Message.Content>
                </Message>
            </Transition>


            <Transition visible={values.gender !== "male" && values.age_band === "under_11"} animation='scale'
                        duration={500}>
                <Message
                    error
                    visible={values.gender !== "male" && values.age_band === "under_11"}
                >{RichText.render(props.et_vous.data.under_11, linkResolver, htmlSerializer)}
                </Message>
            </Transition>

            <Transition visible={values.gender !== "male" && values.age_band === "over_20"} animation='scale'
                        duration={500}>
                <Message
                    error
                    visible={values.gender !== "male" && values.age_band === "over_20"}
                >{RichText.render(props.et_vous.data.over_20, linkResolver, htmlSerializer)}
                </Message>
            </Transition>

            <Transition visible={values.gender !== "male" &&
            !["under_11", "over_20"].includes(values.age_band) &&
            values.doses !== "" &&
            !(values.age_band !== "under_20" && values.doses === 3)}
                        animation='scale'
                        duration={500}>
                {values.gender !== "male" &&
                !["under_11", "over_20"].includes(values.age_band) &&
                values.doses !== "" &&
                !(values.age_band !== "under_20" && values.doses === 3)
                    ? <Message
                        info
                        visible={values.gender !== "male" &&
                        !["under_11", "over_20"].includes(values.age_band) &&
                        values.doses !== "" &&
                        !(values.age_band !== "under_20" &&
                            values.doses === 3)}
                    >{RichText.render(props.et_vous.data[`${values.age_band}_${values.doses}`], linkResolver, htmlSerializer)}
                    </Message>
                    : <br/>}
            </Transition>
        </Layout>
    )
};


EtVous.getInitialProps = async function (context) {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const et_vous = getEtVous(API)
    const menu = await getMenu(API)

    return {
        pathname: context.asPath,
        et_vous: await et_vous,
        ...menu
    }
}

export default EtVous