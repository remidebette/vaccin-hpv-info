import React from 'react'
import Head from 'next/head'
import Layout from "components/MyLayout";
import Prismic from "prismic-javascript";
import {accessToken, apiEndpoint} from "../prismic-configuration";
import {getMenu} from "../utils/api";

const Error = (props) => {
    return (
        <Layout menu={props.menu} page_sections={props.page_sections}>
            <div className='not-found'>
                <Head><title>Error!</title></Head>
                <h1>{props.statusCode
                    ? `${props.statusCode} Error`
                    : 'Client-side error'}</h1>
                <h2>{props.statusCode === '404' ? 'Document not found' : 'Please contact developer'}</h2>
                <p><a href='/'>Return to homepage</a></p>
                <style jsx>{`
            .not-found {
              display: flex;
              flex-direction: column;
              justify-content: center;
              height: 42vw;
              align-items: center;
            }
          `}</style>
            </div>
        </Layout>
    )
}

Error.getInitialProps = async function ({res, err}) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    const API = await Prismic.getApi(apiEndpoint, {accessToken});
    const menu = await getMenu(API);
    return {statusCode, ...menu}
}

export default Error