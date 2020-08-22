import React from 'react'
import App from 'next/app'
import {DefaultSeo} from 'next-seo';
import SEO from '../next-seo.config';
import Head from "next/head";

class MyApp extends App {
    // Only uncomment this method if you have blocking data requirements for
    // every single page in your application. This disables the ability to
    // perform automatic static optimization, causing every page in your app to
    // be server-side rendered.
    //
    // static async getInitialProps(appContext) {
    //   // calls page's `getInitialProps` and fills `appProps.pageProps`
    //   const appProps = await App.getInitialProps(appContext);
    //
    //   return { ...appProps }
    // }

    render() {
        const {Component, pageProps} = this.props
        return (
            <>
                <DefaultSeo {...SEO} />
                <Head>
                    <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                    {/*<meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>*/}
                    <link rel="stylesheet" href="https://use.typekit.net/vhr2nog.css"/>
                </Head>
                <Component {...pageProps} />
            </>
        )
    }
}

export default MyApp
