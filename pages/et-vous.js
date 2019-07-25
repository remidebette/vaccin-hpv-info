import React from 'react';
import Layout from 'components/MyLayout'
import Prismic from 'prismic-javascript'
import { apiEndpoint, accessToken } from 'prismic-configuration'
import {
    Header,
    Transition,
    Divider,
    Segment,
    Button,
    Message
} from 'semantic-ui-react'
import useForm from "utils/useForm";
import { getMenu } from "../utils/api";


const EtVous = (props) => {
    const initialState = {
        "gender": "",
        "age_band": "",
        "doses": ""
    };

    const { values, handleChange, handleSubmit } = useForm(initialState, null);

    return (
        <Layout menu={props.menu} pathname={props.pathname}>
            <Header as="h1">Et vous ?</Header>
            <Segment basic textAlign='center'>
                <label> Votre sexe: </label>
                <Button.Group>
                    <Button
                        positive={values.gender === "female"}
                        value="female"
                        name="gender"
                        onClick={handleChange}
                    >Feminin</Button>
                    <Button.Or text="ou" />
                    <Button
                        positive={values.gender === "male"}
                        value="male"
                        name="gender"
                        onClick={handleChange}
                    >Masculin
                    </Button>
                    <Button.Or text="ou" />
                    <Button
                        positive={values.gender === "parent"}
                        value="parent"
                        name="gender"
                        onClick={handleChange}
                    >Parents</Button>
                </Button.Group>
                {/*                    <Form.Radio label='Un garçon' checked={gender === "male"} value="male" onChange={handleChange}/>
                    <Form.Radio label='Une fille' checked={gender === "female"} value="female" onChange={handleChange}/>
                    <Form.Radio label="Parent d'une fille" checked={gender === "parent"} value="parent" onChange={handleChange}/>*/}

                <Transition visible={values.gender === "male"} animation='scale' duration={500}>
                    <Message
                        error
                        header='Attention'
                        visible={values.gender === "male"}
                    >La vaccination n’est pas recommandée actuellement pour les Garçons.
                        <br />

                        Pour les <strong>hommes ayant des relations sexuelles avec des hommes </strong>, la vaccination
                        HPV par Gardasil® ou Gardasil 9® est recommandée jusqu’à l’âge de 26 ans, en prévention des
                        lésions précancéreuses anales, des cancers anaux et des condylomes, avec 3 doses de vaccin (la
                        2e à 2 mois, la 3e à 6 mois).

                            <br />
                        Vous pouvez vous rapprocher de votre médecin traitant, ou vous rendre dans les CeGIDD et dans
                        certains centres publics de vaccination proches de chez vous.
                    </Message>
                </Transition>

                <Transition visible={values.gender === "female" || values.gender === "parent"} animation='scale'
                    duration={500}>
                    <div>
                        <Divider hidden />
                        <label> Vous avez: </label>
                        <Button.Group>
                            <Button positive={values.age_band === "under_11"} value="under_11" name="age_band"
                                onClick={handleChange}>Moins de 11 ans</Button>
                            <Button positive={values.age_band === "under_15"} value="under_15" name="age_band"
                                onClick={handleChange}>11 - 14 ans</Button>
                            <Button positive={values.age_band === "under_20"} value="under_20" name="age_band"
                                onClick={handleChange}>15 - 19 ans</Button>
                            <Button positive={values.age_band === "over_20"} value="over_20" name="age_band"
                                onClick={handleChange}>Plus de 20 ans</Button>
                        </Button.Group>

                        <Divider hidden />
                        <label> Vaccin: </label>
                        <Button.Group>
                            <Button positive={values.doses === 0} value={0} name="doses"
                                onClick={handleChange}>Jamais vaccinée</Button>
                            <Button positive={values.doses === 1} value={1} name="doses"
                                onClick={handleChange}>1 dose</Button>
                            <Button positive={values.doses === 2} value={2} name="doses"
                                onClick={handleChange}>2 doses</Button>
                            <Button positive={values.doses === 3} value={3} name="doses"
                                onClick={handleChange}>3 doses</Button>
                        </Button.Group>
                    </div>
                </Transition>
            </Segment>
        </Layout>
    )
};


EtVous.getInitialProps = async function (context) {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const menu = await getMenu(API)

    return {
        pathname: context.asPath,
        menu: menu
    }
}

export default EtVous