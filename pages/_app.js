import React, {createRef, useReducer} from 'react';

import 'semantic-ui-less/semantic.less'
import {css, cx} from 'emotion'

import Head from "next/head";
import {DefaultSeo, NextSeo} from 'next-seo';
import SEO from 'next-seo.config';
import Header from "components/Header";
import Footer from "components/Footer";
import {initialState, reducer, StateContext} from 'utils/context'
import {CONSTANTS} from "utils/CONSTANTS";

// import App from 'next/app'

function MyApp({Component, pageProps}) {
    const [state, setState] = useReducer(reducer, initialState);
    const main_ref = createRef()

    const host = process.env.NEXT_PUBLIC_HOSTNAME || CONSTANTS.hostname;
    const canonical = 'https://' + host + pageProps.pathname;

    return (
        <>
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                {/*<meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>*/}

                <link rel="preload" href="https://use.typekit.net/vhr2nog.css" as="style"/>
                <link rel="preload" href="/_next/static/icons.woff2" as="font" type="font/woff2" crossorigin="anonymous"/>

                <link rel="stylesheet" href="https://use.typekit.net/vhr2nog.css"/>
            </Head>
            <DefaultSeo {...SEO} />
            {
                pageProps.title ?
                    <NextSeo
                        url={'https://' + host + '/'}
                        title={pageProps.title}
                        //titleTemplate = "vaccin-hpv-info.fr : %s"
                        description={pageProps.description}
                        canonical={canonical}
                        image={'https://' + host + '/images/left-cropped-logo.png'}
                        openGraph={{
                            url: canonical,
                            title: pageProps.title,
                            description: pageProps.description,
                            images: [
                                {
                                    url: 'https://' + host + '/images/left-cropped-logo.png',
                                    width: 100,
                                    height: 100,
                                    alt: "Vaccin Anti HPV",
                                },
                                {
                                    url: 'https://' + host + '/images/cropped-logo.png',
                                    width: 214,
                                    height: 112,
                                    alt: "Vaccin Anti HPV",
                                }
                            ],
                            site_name: 'Vaccin HPV Info',
                        }}
                        /*
                        twitter={{
                            handle: '@handle',
                            site: '@site',
                            cardType: 'summary_large_image',
                        }}
                        */
                    />
                    : <></>
            }

            <StateContext.Provider value={{state: state, setState: setState}}>
                <div ref={main_ref}>
                    <Header
                        menu={pageProps.menu}
                        page_sections={pageProps.page_sections}
                        uid={pageProps.uid}
                        context={main_ref}
                        pathname={pageProps.pathname}
                    />
                    <Component {...pageProps} />


                    <Footer qr_code_url={"https://" + host}
                            source_indexes={pageProps.source_indexes ? pageProps.source_indexes : null}/>
                </div>
            </StateContext.Provider>
        </>
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp
