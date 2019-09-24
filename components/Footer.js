import React from 'react'
import {Container} from 'semantic-ui-react'
import {css, cx} from 'emotion'

const menu_style = css`
        /* max-width: 700px; */
        /* margin: 0 auto; */
        font-family: 'BebasNeue', sans-serif;
        font-size: 22px;
        font-style: normal;
        text-align: center;
        color: #2d2d2d;
        `

const text_style = css`
        /* border-top: 1px solid #DADADA; */
        /* padding: 2rem 0; */
        margin-top: 0.5em !important; 
        margin-bottom: 0.5em !important; 
        `

const logo_style = css`
        width: 660px;
        margin-top: 10px;
        `

const Footer = () => (
    <footer
        //className={menu_style}
    >
        <Container>
            <p
                //className={text_style}
            >
                LA VACCINATION N’ÉLIMINE PAS TOTALEMENT LE RISQUE DE DÉVELOPPER UN CANCER ET NE
                DISPENSE DONC PAS DU DÉPISTAGE.
                <br/>
                PENSEZ À VOUS FAIRE DÉPISTER PAR FROTTIS OU TEST-HPV À PARTIR DE 25 ANS.
                <br/>
                PARLEZ-EN À VOTRE MÉDECIN.
            </p>
        </Container>
        <img
            src="/static/images/bottom.png"
            alt="Pink HPV bottom"
            className="footer-logo"
        />
    </footer>
)

export default Footer