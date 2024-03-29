import React from 'react'
import Head from 'next/head'
import Prismic from "prismic-javascript";
import {accessToken, apiEndpoint} from "prismic-configuration";
import {getMenu, getPageSections} from "utils/api";
import {CONSTANTS} from "utils/CONSTANTS";

function Error(props) {
    return (
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
    )
}

Error.getInitialProps = async function ({res, err}) {
    const statusCode = res ? res.statusCode : err ? err.statusCode : null;
    const API = await Prismic.getApi(apiEndpoint, { accessToken });
    const menu = getMenu(API);
    const page_sections = getPageSections(API);

    const fetched = {
        menu: await menu,
        page_sections: await page_sections
    }
    const host = process.env.NEXT_PUBLIC_HOSTNAME || CONSTANTS.hostname;

    return {
        host,
        statusCode,
        ...fetched
    }
}

export default Error