import 'semantic-ui-css/semantic.min.css';
import React, {useReducer} from 'react';
import {reducer, initialState, StateContext} from '../utils/context'
import {Header} from './Header';
import {css, cx} from 'emotion'
import {from} from 'rxjs';
import {
    Container
} from 'semantic-ui-react'


const layoutStyle = css`
margin-top: 5em

`;
/*    margin: 20px;
    padding: 20px;
    border: 1px solid #DDD*/

const Layout = props => {
    const [state, setState] = useReducer(reducer, initialState)

    return (
        <StateContext.Provider value={{state: state, setState: setState}}>
            <Header menu={props.menu}/>
            <Container text className={layoutStyle}>
                {props.children}
            </Container>
        </StateContext.Provider>
    )
}


export default Layout