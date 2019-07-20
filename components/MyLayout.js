import 'semantic-ui-css/semantic.min.css';
import React, { useReducer, createRef } from 'react';
import { reducer, initialState, StateContext } from 'utils/context'
import { Header } from './Header';
import { css, cx } from 'emotion'
import { from } from 'rxjs';
import {
    Container, Divider
} from 'semantic-ui-react'
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
                <Header menu={props.menu} pathname={props.pathname} context={main_ref}/>
                <Container
                    text
                    className={layoutStyle}
                >
                    {props.children}
                </Container>


                <Footer />
            </div>
        </StateContext.Provider>
    )
}


export default Layout