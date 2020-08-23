import React from 'react';
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint} from 'prismic-configuration'
import {getFAQ, getMenu, getPageSections} from "utils/api";
import FAQSlice from "components/slices/faqSlice";
import Layout from "components/MyLayout"
import {RichText} from "prismic-reactjs";
import {Container} from "semantic-ui-react";
import {layoutStyle} from "utils/css";
import { CONSTANTS } from 'utils/CONSTANTS';

const Index = (props) => {
    return (
        <Layout title={RichText.asText(props.faq.data.title)}
                description={RichText.asText(props.faq.data.description)}
                canonical={'https://' + props.host + '/faq'}
                source_indexes={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 17]}
                menu={props.menu}
                host={props.host}
                page_sections={props.page_sections}
                pathname={props.pathname}>

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


export const getStaticProps = async function () {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const faq = getFAQ(API)
    const menu = getMenu(API);
    const page_sections = getPageSections(API);

    return {
        props: {
            pathname: "/faq",
            host: process.env.NEXT_PUBLIC_HOSTNAME || CONSTANTS.hostname,
            faq: await faq,
            menu: await menu,
            page_sections: await page_sections
        },
        revalidate: process.env.REVALIDATE_TIME_SECONDS || CONSTANTS.revalidate
    }
}

export default Index