import React from 'react';
import Prismic from 'prismic-javascript'
//import {PrismicLink} from 'apollo-link-prismic';
//import { InMemoryCache } from 'apollo-cache-inmemory';
//import ApolloClient, { gql }  from "apollo-boost";
import {accessToken, apiEndpoint} from 'prismic-configuration'
import {RichText} from 'prismic-reactjs'
import Error from "../_error";
import SliceZone from "components/slices/SliceZone";
import {getPageSections, getMenu, getPage} from "utils/api";
import {useRouter} from "next/router";
import {Container} from "semantic-ui-react";
import {layoutStyle} from "utils/css";
import {CONSTANTS} from 'utils/CONSTANTS';


const Page = (props) => {
    const router = useRouter();
    const {default_section} = router.query;

    if (!props.doc) {

        return (
            // Call the standard error page if the document was not found
            // Essential for dealing with previews of documents that have not been published
            <Error statusCode='404' menu={props.menu} page_sections={props.page_sections}/>
        )
    } else {

        return (
            <Container
                text
                className={layoutStyle}
                textAlign='justified'
            >
                <h1>{RichText.asText(props.doc.data.title)}</h1>

                <SliceZone sliceZone={props.doc.data.page_content} default_section={default_section}/>
            </Container>
        )
    }
};

export const getStaticPaths = async function () {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const page_sections = await getPageSections(API);
    const paths = page_sections.map(section => {
        return {
            params: {
                uid: section.uid
            }
        }
    })
    return {
        paths,
        fallback: false
    }
}

export const getStaticProps = async function ({params}) {
    // The following is for when working in local...
    // const req = context.req || null;
    // const params = req ? req.query : null;
    // const section = params ? params.section : null;
//
//
//
//     const apolloClient = new ApolloClient({
//         uri: 'https://anti-hpv.prismic.io/graphql'
//     });
//
//     apolloClient.query({
//         query: gql`
//         {
//   allPages(lang: "fr-fr") {
//     edges {
//       node {
//         _meta{
//           uid
//           type
//         }
//         page_content {
//           ... on PagePage_contentText_section {
//             primary {
//               section_title
//             }
//           }
//         }
//       }
//     }
//   }
// }
// `
//     }).then(result => console.log(result));

    const API = await Prismic.getApi(apiEndpoint, {accessToken});
    const page = getPage(params.uid, API);
    const menu = getMenu(API);
    const page_sections = getPageSections(API);

    const fetched = {
        doc: await page,
        menu: await menu,
        page_sections: await page_sections
    }

    return {
        props: {
            pathname: '/page/' + params.uid,
            uid: params.uid,
            title: RichText.asText(fetched.doc.data.title),
            description: RichText.asText(fetched.doc.data.description),
            source_indexes: fetched.doc.data.sources.split(/\s*,\s*/).map(function (value) {
                return Number(value) - 1;
            }),
            ...fetched
        },
        revalidate: Number(process.env.REVALIDATE_TIME_SECONDS) || CONSTANTS.revalidate
    }
}

export default Page