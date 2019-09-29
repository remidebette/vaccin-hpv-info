import React from 'react';
import Layout from 'components/MyLayout'
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint} from 'prismic-configuration'
import {getMenu} from "../utils/api";
import {Container, Divider} from "semantic-ui-react";
import {layoutStyle} from "../utils/css";

const Index = (props) => {

    return (
        <Layout menu={props.menu} page_sections={props.page_sections} pathname={props.pathname}>
            <Container
                text
                className={layoutStyle}
                textAlign='justified'
            >
                <h1>A propos de nous</h1>

                <Divider hidden/>

                <p>La création de ce site a pour but de donner une information claire, précise et simple sur la
                    vaccination contre HPV.
                    Sa création et son évaluation ont fait l'objet d'un travail de thèse en médecine général.
                    Il a été créé en collaboration entre trois interne de médecine générale et leur directeur de
                    thèse.</p>

                <p>
                    Les références proviennent des recommandations nationales, de sociétés savantes ou fédérations, de
                    méta-analyses et d’articles disponibles dans les différents liens.
                </p>
                <p>
                    Vaccin-HPV-Info a été élaboré en collaboration par :
                    BENCHEKROUN Mehdi : interne en médecine générale, faculté de médecine de Lille.
                    DESMARECAUX Céline : interne en médecine générale, faculté de médecine de Lille.
                    DUBOIS Lucas : interne en médecine générale, faculté de médecine de Lille.
                    FAVRE Jonathan : Chef de clinique des universités en médecine générale à Lille.
                </p>
                <p>
                Financement :
                Le projet est auto-financé.
                Le site n’accueille aucune forme de publicité.
                Les auteurs n’ont pas de conflit d’intérêt.
                </p>
            </Container>
        </Layout>
    )
};


Index.getInitialProps = async function (context) {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const menu = await getMenu(API)

    return {
        pathname: context.asPath,
        ...menu
    }
}


export default Index