import {Button, Divider, Grid, Image, Icon, Label, Container, Segment} from 'semantic-ui-react';
import React from 'react';
import Layout from 'components/MyLayout'
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint, hrefResolver, linkResolver} from 'prismic-configuration'
import Link from "next/link";
import {RichText} from "prismic-reactjs";
import {getMenu, getPreview} from "../utils/api";
import Header from "../components/Header";
import {buttonOverride, layoutStyle} from "../utils/css";


const button_icons = {
    "informations-generales": "suitcase",
    "effets_secondaires": "pills",
    "transmission": "heartbeat"
}

const IndexButton = (props, ref) => {
    return (
        <Button
            //ref={ref}
            //as="a"
            color="grey"
            size="massive"
            compact
            className={buttonOverride(props.width)}
            icon labelPosition='left'
        >
            <Icon
                //as="div"
                name={props.icon}
                size="big"
            />
            {props.children}
        </Button>
    )
};


const menuHome = (menu_links) => {
    return menu_links.map((menuLink) => {
        return (
            <Link href={hrefResolver(menuLink.link)} as={linkResolver(menuLink.link)} passHref key={menuLink.link.id}>
                <a>
                    <IndexButton
                        icon={button_icons[menuLink.link.uid]}
                    >
                        {RichText.asText(menuLink.label).toUpperCase()}
                    </IndexButton>
                </a>
            </Link>
        );
    });
}

const Index = (props) => {
    const menu = props.menu

    return (
        <Layout menu={menu} page_sections={props.page_sections} pathname={props.pathname}>

            <Container
                //text
                className={layoutStyle}
                //textAlign='justified'
            >

                <style jsx>{`
                .bckgnd
                {
                    background-image: url('static/images/bulle.png');
                    background-repeat: no-repeat;
                    background-position: center; 
                    width: 847px;
                    height: 124px;
                }

                `}</style>


                <Grid>
                    <Grid.Column textAlign="center">
                        <Image
                            src="/static/images/logo.png"
                            alt="Pink HPV logo"
                            centered={false}
                        />
                        <Divider hidden/>
                        <Segment
                            inverted
                            color="pink"
                            className="top-arrow"
                            compact
                        >
                            {"Tout ce que vous voulez savoir sur la vaccination anti-HPV, ".toUpperCase() +
                            "une information claire et concise pour les patients produite par ".toUpperCase() +
                            "des médecins indépendants.".toUpperCase()}

                        </Segment>

                        <Divider hidden section/>

                        {/*<Segment className="bckgnd">*/}
                        {/*    <p>Tout ce que vous voulez savoir sur la vaccination anti-HPV,*/}
                        {/*        une information claire et concise pour les patients produite par des médecins indépendants.*/}
                        {/*    </p>*/}
                        {/*</Segment>*/}

                        <Divider hidden/>

                        {menu ? menuHome(menu.data.menu_links) : null}

                        <Divider hidden/>

                        <Link href="/et-vous" passHref>
                            <a>
                                <IndexButton
                                    icon='clipboard list'
                                >
                                    ET VOUS ? (SIMULATION)
                                </IndexButton>
                            </a>
                        </Link>

                        <Link href="/faq" passHref>
                            <a>
                                <IndexButton
                                    icon='doctor'
                                    width="9em"
                                >
                                    IDÉES <br/>
                                    REÇUES
                                </IndexButton>
                            </a>
                        </Link>
                    </Grid.Column>
                </Grid>
            </Container>
        </Layout>
    )
};


Index.getInitialProps = async function (context) {
    const {uid} = context.query
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const menu = await getMenu(API)

    return {
        pathname: context.asPath,
        ...menu
    }
}

export default Index