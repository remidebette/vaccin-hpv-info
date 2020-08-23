import React from 'react';
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint} from 'prismic-configuration'
import {getFAQ, getMenu, getPageSections} from "utils/api";
import FAQSlice from "components/slices/faqSlice";
import {RichText} from "prismic-reactjs";
import {Container} from "semantic-ui-react";
import {layoutStyle} from "utils/css";
import {CONSTANTS} from 'utils/CONSTANTS';

const Index = (props) => {
    return (
        <Container
            text
            className={layoutStyle}
            textAlign='justified'
        >
            <h1>{RichText.asText(props.faq.data.title)}</h1>

            {props.faq.data.page_content.map((slice, index) => {
                return <FAQSlice slice={slice} key={'slice-' + index}/>
            })
            }
        </Container>
    )
};


export const getStaticProps = async function () {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const faq = getFAQ(API)
    const menu = getMenu(API);
    const page_sections = getPageSections(API);

    const fetched = {
        faq: await faq,
        menu: await menu,
        page_sections: await page_sections
    }

    return {
        props: {
            pathname: "/faq",
            title: RichText.asText(fetched.faq.data.title),
            description: RichText.asText(fetched.faq.data.description),
            source_indexes: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 17],
            ...fetched
        },
        revalidate: process.env.REVALIDATE_TIME_SECONDS || CONSTANTS.revalidate
    }
}

export default Index