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


const EtVous = (props) => {

    const [gender, setGender] = useState(null);

    const handleChange = (e, data) => setGender(data.value);

    return (
        <Layout menu={props.menu}>
            <Header as="h1">Et vous ?</Header>

            <label> Vous etes: </label>
            <Button.Group>
                <Button positive={gender === "male"} value="male" onClick={handleChange}>Un garçon</Button>
                <Button.Or text="ou"/>
                <Button positive={gender === "female"} value="female" onClick={handleChange}>Une fille</Button>
                <Button.Or text="ou"/>
                <Button positive={gender === "parent"} value="parent" onClick={handleChange}>Parent d'une fille</Button>
            </Button.Group>
            {/*                    <Form.Radio label='Un garçon' checked={gender === "male"} value="male" onChange={handleChange}/>
                    <Form.Radio label='Une fille' checked={gender === "female"} value="female" onChange={handleChange}/>
                    <Form.Radio label="Parent d'une fille" checked={gender === "parent"} value="parent" onChange={handleChange}/>*/}

            <Transition visible={gender === "male"} animation='scale' duration={500}>
                <Message
                    error
                    header='Attention'
                    content="Un garçon n'a pas de vagin."
                    visible={gender === "male"}
                />
            </Transition>

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