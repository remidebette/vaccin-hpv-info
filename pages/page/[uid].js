import React from 'react';
import Prismic from 'prismic-javascript'
//import {PrismicLink} from 'apollo-link-prismic';
//import { InMemoryCache } from 'apollo-cache-inmemory';
//import ApolloClient, { gql }  from "apollo-boost";
import {accessToken, apiEndpoint} from 'prismic-configuration'
import {RichText} from 'prismic-reactjs'
import Error from "../_error";
import Layout from "../../components/MyLayout";
import SliceZone from "../../components/slices/SliceZone";
import {getMenu, getPage} from "../../utils/api";
import {useRouter} from "next/router";
import Header from "../../components/Header";
import {Container} from "semantic-ui-react";
import {layoutStyle} from "../../utils/css";
import { CONSTANTS } from '../../utils/CONSTANTS';


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
        const pathname = '/page/' + props.uid;
        return (
            <Layout title={RichText.asText(props.doc.data.title)}
                    description={RichText.asText(props.doc.data.description)}
                    canonical={'https://' + props.host + pathname}
                    source_indexes={props.doc.data.sources.split(/\s*,\s*/).map(function (value) {
                        return Number(value) - 1;
                    })}
                    menu={props.menu}
                    host={props.host}
                    page_sections={props.page_sections}
                    uid={uid}
                    pathname={router.asPath}>

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

export const getStaticPaths = async function () {
    const API = await Prismic.getApi(apiEndpoint, { accessToken })
    const menu = await getMenu(API);
    const paths = menu.page_sections.map(section => {
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

    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const page = getPage(params.uid, API)
    const menu = await getMenu(API)


    return {
        props: {
            doc: await page,
            host: process.env.NEXT_PUBLIC_HOSTNAME || CONSTANTS.hostname,
            uid: params.uid,
            ...menu
        },
        revalidate: process.env.REVALIDATE_TIME_SECONDS || CONSTANTS.revalidate
    }
}

export default Page