import React from 'react';
import Prismic from 'prismic-javascript'
//import {PrismicLink} from 'apollo-link-prismic';
//import { InMemoryCache } from 'apollo-cache-inmemory';
//import ApolloClient, { gql }  from "apollo-boost";
import {apiEndpoint, accessToken, graphQLEndpoint} from 'prismic-configuration'
import {RichText} from 'prismic-reactjs'
import Error from "./_error";
import {SliceZone, Layout} from "components";
import {getPage, getMenu} from "../utils/api";


const Page = (props) => {
    if (!props.doc) {
        return (
            // Call the standard error page if the document was not found
            // Essential for dealing with previews of documents that have not been published
            <Error statusCode='404'/>
        )
    } else {
        return (
            <Layout menu={props.menu} pathname={props.pathname}>
                <h1>{RichText.asText(props.doc.data.title)}</h1>
                <p>{RichText.asText(props.doc.data.description)}</p>

                <SliceZone sliceZone={props.doc.data.page_content} section={props.section}/>
            </Layout>
        )
    }
};

Page.getInitialProps = async function (context) {
    const {uid, section} = context.query;
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
    const menu = getMenu(API)

    console.log("Passed section: " + section)

    return {
        pathname: context.asPath,
        section: section,
        doc: await page,
        menu: await menu
    }
}

export default Page