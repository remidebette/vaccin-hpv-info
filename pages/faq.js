import React from 'react';
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint} from 'prismic-configuration'
import {getFAQ, getMenu} from "../utils/api";
import FAQSlice from "components/slices/faqSlice";
import Layout from "components/MyLayout"
import {RichText} from "prismic-reactjs";

const Index = (props) => {
    return (
        <Layout menu={props.menu} page_sections={props.page_sections} pathname={props.pathname}>
            <h1>{RichText.asText(props.faq.data.title)}</h1>

            {props.faq.data.page_content.map((slice, index) => {
            return <FAQSlice slice={slice} key={'slice-' + index}/>})
            }

        </Layout>
    )
};


Index.getInitialProps = async function (context) {
    const { uid } = context.query
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const faq = getFAQ(API)
    const menu = await getMenu(API)

    return {
        pathname: context.asPath,
        faq: await faq,
        ...menu
    }
}

export default Index