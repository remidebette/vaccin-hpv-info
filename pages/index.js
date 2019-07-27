import { Button, Grid, Divider } from 'semantic-ui-react';
import React from 'react';
import Layout from 'components/MyLayout'
import Prismic from 'prismic-javascript'
import { apiEndpoint, hrefResolver, linkResolver, accessToken } from 'prismic-configuration'
import Link from "next/link";
import { RichText } from "prismic-reactjs";
import {getMenu} from "../utils/api";

const menuHome = (menu_links) => {
    return menu_links.map((menuLink) => {
        return (
            <Link href={hrefResolver(menuLink.link)} as={linkResolver(menuLink.link)} passHref prefetch key={menuLink.link.id} >
                <Button as="a">
                    {RichText.asText(menuLink.label)}
                </Button>
            </Link>
        );
    });
}

const Index = (props) => {
    const menu = props.menu

    return (
        <Layout menu={menu} page_sections={props.page_sections} pathname={props.pathname}>
            <h1>Vaccin HPV info</h1>
            <p>Tout ce que vous devez savoir sur la vaccination anti-HPV,
                une information claire et concise pour les patients produite par des médecins indépendants.
            </p>

            <Divider hidden />
            <Grid>
                <Grid.Column textAlign="center">
                    {menu ? menuHome(menu.data.menu_links) : null}

                    <Divider hidden />

                    <Link href="/et-vous">
                        <Button as="a" key="et-vous">Et vous?
                        </Button>
                    </Link>

                    <Link href="/faq">
                        <Button as="a" key="faq">Foire aux questions
                        </Button>
                    </Link>
                </Grid.Column>
            </Grid>

        </Layout>
    )
};


Index.getInitialProps = async function (context) {
    const { uid } = context.query
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const menu = await getMenu(API)

    return {
        pathname: context.asPath,
        ...menu
    }
}

export default Index