import React from 'react'
import {Menu, Container} from 'semantic-ui-react'
import {css, cx} from 'emotion'

const menu_style = css`
        /* max-width: 700px; */
        /* margin: 0 auto; */
        color: #9A9A9A;
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        font-style: italic;
        text-align: center;
        `

const text_style = css`
        /* border-top: 1px solid #DADADA; */
        /* padding: 2rem 0; */
        margin-top: 0.5em !important; 
        margin-bottom: 0.5em !important; 
        `

const Footer = () => (
    <Menu fixed="bottom" className={menu_style}>
        <Container>
        <p className={text_style}>
            La vaccination n’élimine pas totalement le risque de développer un cancer,
            donc elle ne dispense pas du dépistage,
            pensez à vous faire dépistez par frottis ou test-HPV à partir de 25 ans. <br />
            Parlez-en à votre médecin
        </p>
        </Container>
    </Menu>
)

export default Footer