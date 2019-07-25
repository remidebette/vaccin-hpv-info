import React from 'react';
import Layout from 'components/MyLayout'
import Prismic from 'prismic-javascript'
import { apiEndpoint, accessToken } from 'prismic-configuration'
import {getMenu } from "../utils/api";

const Index = (props) => {

    return (
        <Layout menu={props.menu} pathname={props.pathname}>
            <h1>A propos de nous</h1>

        </Layout>
    )
};


Index.getInitialProps = async function (context) {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const menu = await getMenu(API)

    return {
        pathname: context.asPath,
        menu: menu
    }
}


export default Index