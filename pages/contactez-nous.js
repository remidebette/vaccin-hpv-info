import React from 'react';
import Layout from 'components/MyLayout'
import { getMenu } from 'components/Header'
import Prismic from 'prismic-javascript'
import { apiEndpoint, accessToken } from 'prismic-configuration'

const Index = (props) => {

    return (
        <Layout menu={props.menu}>
            <h1>Pour nous contacter:</h1>

        </Layout>
    )
};


Index.getInitialProps = async function (context) {
    const { uid } = context.query
    const res = await getPage(uid)

    return res
}

const getPage = async (uid, req) => {
    const API = await Prismic.getApi(apiEndpoint, { req, accessToken })
    const res_menu = await getMenu(API)

    return {
        menu: res_menu
    }
}

export default Index