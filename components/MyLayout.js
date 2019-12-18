import 'semantic-ui-less/semantic.less'
import Head from 'next/head'
import React, {createRef, useReducer} from 'react';
import {initialState, reducer, StateContext} from 'utils/context'
import Header from './Header';
import {css, cx} from 'emotion'
import {Container} from 'semantic-ui-react'
import Footer from "./Footer";
import {NextSeo} from 'next-seo';

/*    margin: 20px;
    padding: 20px;
    border: 1px solid #DDD*/

const Layout = props => {
    const [state, setState] = useReducer(reducer, initialState);
    const main_ref = createRef()

    return (
        <>
            <NextSeo
                title={props.title}
                titleTemplate = "vaccin-hpv-info.fr : %s"
                description={props.description}
                canonical={props.canonical}
                openGraph={{
                    url: props.canonical,
                    title: props.title,
                    description: props.description,
/*                    images: [
                        {
                            url: 'https://www.example.ie/og-image-01.jpg',
                            width: 800,
                            height: 600,
                            alt: 'Og Image Alt',
                        },
                        {
                            url: 'https://www.example.ie/og-image-02.jpg',
                            width: 900,
                            height: 800,
                            alt: 'Og Image Alt Second',
                        },
                        {url: 'https://www.example.ie/og-image-03.jpg'},
                        {url: 'https://www.example.ie/og-image-04.jpg'},
                    ],*/
                    site_name: 'Vaccin HPV Info',
                }}
/*                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}*/
            />
            <Head>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                {/*<meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"/>*/}
                <link rel="stylesheet" href="https://use.typekit.net/vhr2nog.css"/>
            </Head>
            <StateContext.Provider value={{state: state, setState: setState}}>
                <div ref={main_ref}>
                    <Header
                        menu={props.menu}
                        page_sections={props.page_sections}
                        uid={props.uid}
                        context={main_ref}
                        pathname={props.pathname}
                    />
                    {props.children}


                    <Footer source_indexes={props.source_indexes ? props.source_indexes : null}/>
                </div>
            </StateContext.Provider>
        </>
    )
}


export default Layout