import React from 'react';
import Prismic from 'prismic-javascript'
import {RichText} from 'prismic-reactjs'
import Layout from '../components/MyLayout'
import {getMenu} from '../components/Header'
import PrismicConfig from '../prismic-configuration'

const Page = (props) => (
    <Layout menu={props.menu}>
        <h1>{RichText.asText(props.doc.data.title)}</h1>
        <p>{RichText.asText(props.doc.data.description)}</p>
    </Layout>
);

Page.getInitialProps = async function (context) {
    const {uid} = context.query
    const res = await getPage(uid)

    return res
}

const getPage = async (uid) => {
    const API = await Prismic.getApi(PrismicConfig.apiEndpoint)
    const res_page = API.getByUID('page', uid)
    const res_menu = getMenu(API)

    console.log(`Fetched page: ${uid}`)

    return {
        doc: await res_page,
        menu: await res_menu
    }
}

export default Page