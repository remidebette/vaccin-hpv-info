import { Button, Grid, Divider } from 'semantic-ui-react';
import React from 'react';
import Layout from 'components/MyLayout'
import { getMenu } from 'components/Header'
import Prismic from 'prismic-javascript'
import { apiEndpoint, hrefResolver, linkResolver, accessToken } from 'prismic-configuration'
import Link from "next/link";
import { RichText } from "prismic-reactjs";

const menuHome = (menu_links) => {
    return menu_links.map((menuLink) => {
        return (
            <Link href={hrefResolver(menuLink.link)} as={linkResolver(menuLink.link)} passHref prefetch>
                <Button key={menuLink.link.id} as="a">
                    {RichText.asText(menuLink.label)}
                </Button>
            </Link>
        );
    });
}

const Index = (props) => {

    return (
        <Layout menu={props.menu} pathname={props.pathname}>
            <h1>Vaccin HPV info</h1>
            <p>Tout ce que vous devez savoir sur la vaccination anti-HPV,
                une information claire et concise pour les patients produite par des médecins indépendants.
            </p>

            <Divider hidden />
            <Grid>
                <Grid.Column textAlign="center">
                    {props.menu ? menuHome(props.menu.data.menu_links) : null}

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
    const res = await getPage(uid)

    return {pathname: context.asPath, ...res}
}

const getPage = async (uid, req) => {
    const API = await Prismic.getApi(apiEndpoint, { req, accessToken })
    const res_menu = await getMenu(API)

    return {
        menu: res_menu
    }
}

export default Index