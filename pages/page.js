import React from 'react';
import Prismic from 'prismic-javascript'
import { apiEndpoint, accessToken } from 'prismic-configuration'
import { RichText } from 'prismic-reactjs'
import Error from "./_error";
import { SliceZone, getMenu, Layout } from "components";


const Page = (props) => {
    if (!props.doc) {
        return (
            // Call the standard error page if the document was not found
            // Essential for dealing with previews of documents that have not been published
            <Error statusCode='404' />
        )
    } else {
        return (
            <Layout menu={props.menu} pathname={props.pathname}>
                <h1>{RichText.asText(props.doc.data.title)}</h1>
                <p>{RichText.asText(props.doc.data.description)}</p>

                <SliceZone sliceZone={props.doc.data.page_content} section={props.section} />
            </Layout>
        )
    }
};

Page.getInitialProps = async function (context) {
    const { uid, section } = context.query;
    // The following is for when working in local...
    // const req = context.req || null;
    // const params = req ? req.query : null;
    // const section = params ? params.section : null;
    const res = await getPage(uid)

    console.log("Passed section: " + section)

    return {
        pathname: context.asPath, 
        section: section,
        ...res
    }
}

const getPage = async (uid, req) => {
    try {
        const API = await Prismic.getApi(apiEndpoint, { req, accessToken })
        const res_page = API.getByUID('page', uid)
        const res_menu = getMenu(API)

        console.log(`Fetched page: ${uid}`)

        return {
            doc: await res_page,
            menu: await res_menu
        }
    } catch (error) {
        console.error(error)
        return error
    }
}

export default Page