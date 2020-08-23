import React from 'react'
import Head from 'next/head'
import Prismic from "prismic-javascript";
import {accessToken, apiEndpoint} from "prismic-configuration";
import {getMenu, getPageSections} from "utils/api";

export default function Custom404() {
    return (
        <div className='not-found'>
            <Head><title>Error!</title></Head>
            <h1>404 Error</h1>
            <h2>Document not found</h2>
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

export const getStaticProps = async function () {
    const API = await Prismic.getApi(apiEndpoint, { accessToken });
    const menu = getMenu(API);
    const page_sections = getPageSections(API);

    const fetched = {
        menu: await menu,
        page_sections: await page_sections
    }

    return {
        props: {
            ...fetched
        }
    }
}
