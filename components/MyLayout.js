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
                url={'https://' + props.host + '/'}
                title={props.title}
                titleTemplate = "vaccin-hpv-info.fr : %s"
                description={props.description}
                canonical={props.canonical}
                image={'https://' + props.host + '/static/images/left-cropped-logo.png'}
                openGraph={{
                    url: props.canonical,
                    title: props.title,
                    description: props.description,
                    images: [
                        {
                            url: 'https://' + props.host + '/static/images/cropped-logo.png',
                            width: 214,
                            height: 112,
                            alt:"Vaccin Anti HPV",
                        }
                    ],
                    site_name: 'Vaccin HPV Info',
                }}
/*                twitter={{
                    handle: '@handle',
                    site: '@site',
                    cardType: 'summary_large_image',
                }}*/
            />
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