import React from 'react';
import Layout from 'components/MyLayout'
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint} from 'prismic-configuration'
import {getMenu} from "../utils/api";

const Index = (props) => {

    return (
        <Layout menu={props.menu} page_sections={props.page_sections} pathname={props.pathname}>
            <h1>A propos de nous</h1>

        </Layout>
    )
};


Index.getInitialProps = async function (context) {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const menu = await getMenu(API)

    return {
        pathname: context.asPath,
        ...menu
    }
}


export default Index