import {Button} from 'semantic-ui-react';
import React, {useState, useEffect} from 'react';
import Layout from '../components/MyLayout'
import {getMenu} from '../components/Header'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration'
import {
    Header,
    Transition,
    Container,
    Divider,
    Dropdown,
    Grid,
    Image,
    List,
    Menu,
    Segment,
    Form,
    Message
} from 'semantic-ui-react'
import useForm from "../utils/useForm";


const EtVous = (props) => {

    const [gender, setGender] = useState(null);
    const [ageBand, setAgeBand] = useState(null);

    const handleGender = (e, data) => setGender(data.value);

    const initialState = {
        "gender": "",
        "age_band": "",
        "doses": ""
    };

    const {values, handleChange, handleSubmit} = useForm(initialState, null);

    return (
        <Layout menu={props.menu}>
            <Header as="h1">Et vous ?</Header>
            <Segment basic textAlign='center'>
                <label> Vous etes: </label>
                <Button.Group>
                    <Button
                        positive={values.gender === "female"}
                        value="female"
                        name="gender"
                        onClick={handleChange}
                    >Une fille</Button>
                    <Button.Or text="ou"/>
                    <Button
                        positive={values.gender === "parent"}
                        value="parent"
                        name="gender"
                        onClick={handleChange}
                    >Parent d'une fille</Button>
                    <Button.Or text="ou"/>
                    <Button
                        positive={values.gender === "male"}
                        value="male"
                        name="gender"
                        onClick={handleChange}
                    >Un garçon
                    </Button>
                </Button.Group>
                {/*                    <Form.Radio label='Un garçon' checked={gender === "male"} value="male" onChange={handleChange}/>
                    <Form.Radio label='Une fille' checked={gender === "female"} value="female" onChange={handleChange}/>
                    <Form.Radio label="Parent d'une fille" checked={gender === "parent"} value="parent" onChange={handleChange}/>*/}

                <Transition visible={values.gender === "male"} animation='scale' duration={500}>
                    <Message
                        error
                        header='Attention'
                        content="Vous présentez peu de risque."
                        visible={values.gender === "male"}
                    />
                </Transition>

                <Transition visible={values.gender === "female" || values.gender === "parent"} animation='scale'
                            duration={500}>
                    <div>
                        <Divider hidden/>
                        <label> Vous avez: </label>
                        <Button.Group>
                            <Button positive={values.age_band === "under_11"} value="under_11" name="age_band"
                                    onClick={handleChange}>Moins de 11 ans</Button>
                            <Button positive={values.age_band === "under_15"} value="under_15" name="age_band"
                                    onClick={handleChange}>11 - 15 ans</Button>
                            <Button positive={values.age_band === "under_20"} value="under_20" name="age_band"
                                    onClick={handleChange}>15 - 20 ans</Button>
                            <Button positive={values.age_band === "over_20"} value="over_20" name="age_band"
                                    onClick={handleChange}>Plus de 20 ans</Button>
                        </Button.Group>

                        <Divider hidden/>
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
    const req = context.query
    const res = await getPage(req)

    return res
}

const getPage = async () => {
    const API = await Prismic.getApi(PrismicConfig.apiEndpoint)
    const res_menu = await getMenu(API)

    return {
        menu: res_menu
    }
}

export default EtVous