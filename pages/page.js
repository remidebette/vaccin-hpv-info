import React from 'react';
import Prismic from 'prismic-javascript'
//import {PrismicLink} from 'apollo-link-prismic';
//import { InMemoryCache } from 'apollo-cache-inmemory';
//import ApolloClient, { gql }  from "apollo-boost";
import {accessToken, apiEndpoint} from 'prismic-configuration'
import {RichText} from 'prismic-reactjs'
import Error from "./_error";
import Layout from "../components/MyLayout";
import SliceZone from "../components/slices/SliceZone";
import {getMenu, getPage} from "../utils/api";
import {useRouter} from "next/router";
import Header from "../components/Header";
import {Container} from "semantic-ui-react";
import {layoutStyle} from "../utils/css";
import {CONSTANTS} from "../utils/CONSTANTS";


const Page = (props) => {
    const router = useRouter();
    const {uid, default_section} = router.query;

    if (!props.doc) {
        return (
            // Call the standard error page if the document was not found
            // Essential for dealing with previews of documents that have not been published
            <Error statusCode='404' menu={props.menu} page_sections={props.page_sections}/>
        )
    } else {
        return (
            <Layout title={RichText.asText(props.doc.data.title)}
                    description={RichText.asText(props.doc.data.description)}
                    canonical={'https://' + props.host + '/page/' + props.uid}
                    source_indexes={props.doc.data.sources.split(/\s*,\s*/).map(function (value) {
                        return Number(value) - 1;
                    })}
                    menu={props.menu}
                    host={props.host}
                    page_sections={props.page_sections}
                    uid={uid}
                    pathname={props.pathname}>

                <Container
                    text
                    className={layoutStyle}
                    textAlign='justified'
                >
                    <h1>{RichText.asText(props.doc.data.title)}</h1>

                    <SliceZone sliceZone={props.doc.data.page_content} default_section={default_section}/>
                </Container>
            </Layout>
        )
    }
};

Page.getInitialProps = async function (context) {
    const {uid} = context.query;
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

    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const page = getPage(uid, API)
    const menu = await getMenu(API)


    return {
        pathname: context.asPath,
        doc: await page,
        host: context.req ? context.req.headers.host: CONSTANTS.host,
        uid: uid,
        ...menu
    }
}

export default Page