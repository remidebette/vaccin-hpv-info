import React from 'react';
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint} from 'prismic-configuration'
import {getFAQ, getMenu} from "../utils/api";
import FAQSlice from "components/slices/faqSlice";
import Layout from "components/MyLayout"
import {RichText} from "prismic-reactjs";
import Header from "../components/Header";
import {Container} from "semantic-ui-react";
import {layoutStyle} from "../utils/css";

const Index = (props) => {
    return (
        <Layout title={RichText.asText(props.faq.data.title)}
                description="Tout ce que vous voulez savoir sur la vaccination anti-HPV.
                Réponses aux idées reçues sur le vaccin anti-HPV"
                canonical="https://vaccin-hpv-info.fr/faq"
                source_indexes={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 17]}
                menu={props.menu} page_sections={props.page_sections} pathname={props.pathname}>

                <Container
                    text
                    className={layoutStyle}
                    textAlign='justified'
                >
            <h1>{RichText.asText(props.faq.data.title)}</h1>

            {props.faq.data.page_content.map((slice, index) => {
            return <FAQSlice slice={slice} key={'slice-' + index}/>})
            }
                </Container>
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