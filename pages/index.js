import {Button} from 'semantic-ui-react';
import React, {useState, useEffect} from 'react';
import Layout from '../components/MyLayout'
import {getMenu} from '../components/Header'
import Prismic from 'prismic-javascript'
import PrismicConfig from '../prismic-configuration'

const Index = (props) => {
    const [count, setCount] = useState(0);


    useEffect(() => {
        document.title = `On a cliqué ${count} fois`;
    });


    return (
        <Layout menu={props.menu}>
            <h1>Hello World</h1>

            <Button onClick={() => setCount(count + 1)}>Compteur</Button>

        </Layout>
    )
};


Index.getInitialProps = async function (context) {
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

export default Index