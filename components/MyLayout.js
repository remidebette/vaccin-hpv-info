import 'semantic-ui-less/semantic.less'
import Head from 'next/head'
import React, {createRef, useReducer} from 'react';
import {initialState, reducer, StateContext} from 'utils/context'
import Header from './Header';
import {css, cx} from 'emotion'
import {Container} from 'semantic-ui-react'
import Footer from "./Footer";


/*    margin: 20px;
    padding: 20px;
    border: 1px solid #DDD*/

const Layout = props => {
    const [state, setState] = useReducer(reducer, initialState);
    const main_ref = createRef()

    return (
        <>
            <Head>
                <title>{props.title}</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
                <meta name="description" content={props.description}/>
                <meta name="robots" content="max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
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