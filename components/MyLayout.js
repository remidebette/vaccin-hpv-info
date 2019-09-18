import 'semantic-ui-less/semantic.less'
import React, {createRef, useReducer} from 'react';
import {initialState, reducer, StateContext} from 'utils/context'
import Header from './Header';
import {css, cx } from 'emotion'
import {Container} from 'semantic-ui-react'
import Footer from "./Footer";


const layoutStyle = css`
padding-top: 2em;
padding-bottom: 5em;

`;
/*    margin: 20px;
    padding: 20px;
    border: 1px solid #DDD*/

const Layout = props => {
    const [state, setState] = useReducer(reducer, initialState);
    const main_ref = createRef()

    return (
        <StateContext.Provider value={{ state: state, setState: setState }}>
            <div ref={main_ref}>
                <Header
                    menu={props.menu}
                    page_sections={props.page_sections}
                    uid={props.uid}
                    context={main_ref}
                    pathname={props.pathname}
                />
                <Container
                    text
                    className={layoutStyle}
                    textAlign='justified'
                >
                    {props.children}
                </Container>


                <Footer />
            </div>
        </StateContext.Provider>
    )
}


export default Layout