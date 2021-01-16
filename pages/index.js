import {Button, Divider, Grid, Image, Icon, Container, Segment} from 'semantic-ui-react';
import React from 'react';
import Prismic from 'prismic-javascript'
import {accessToken, apiEndpoint, linkResolver} from 'prismic-configuration'
import Link from "next/link";
import {RichText} from "prismic-reactjs";
import {getHome, getMenu, getPageSections} from "utils/api";
import {buttonOverride, layoutStyle} from "utils/css";
import {CONSTANTS} from 'utils/CONSTANTS';


const button_icons = {
    "informations-generales": "suitcase",
    "effets_secondaires": "pills",
    "transmission": "heartbeat"
}
const description = "Tout ce que vous voulez savoir sur la vaccination anti-HPV, " +
    "une information claire et concise pour les patients produite par " +
    "des médecins indépendants."

const IndexButton = React.forwardRef((props, ref) => {
    return (
        <Button
            //ref={ref}
            as="a"
            color="grey"
            size="massive"
            compact
            href={props.href}
            ref={ref}
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
});


const menuHome = (menu_links) => {
    return menu_links.map((menuLink) => {
        return (
            <Link href={linkResolver(menuLink.link)} passHref key={menuLink.link.id}>
                <IndexButton
                    icon={button_icons[menuLink.link.uid]}
                >
                    {RichText.asText(menuLink.label).toUpperCase()}
                </IndexButton>
            </Link>
        );
    });
}

const Index = (props) => {
    const menu = props.menu

    return (

        <Container
            //text
            className={layoutStyle}
            //textAlign='justified'
        >
            <Grid>
                <Grid.Column textAlign="center">
                    <h1><Image
                        src="/images/logo.png"
                        alt="Page d'accueil du site Vaccin Anti HPV"
                        centered={false}
                    />
                    </h1>
                    <Divider hidden/>
                    <Segment
                        inverted
                        color="pink"
                        className="top-arrow"
                        compact
                    >
                        {description.toUpperCase()}

                    </Segment>

                    <Divider hidden section/>

                    <Divider hidden/>

                    {menu ? menuHome(menu.data.menu_links) : null}

                    <Divider hidden/>

                    <Link href="/et-vous" passHref>
                        <IndexButton
                            icon='clipboard list'
                        >
                            ET VOUS ? (SIMULATION)
                        </IndexButton>
                    </Link>

                    <Link href="/faq" passHref>
                        <IndexButton
                            icon='doctor'
                            width="9em"
                        >
                            IDÉES <br/>
                            REÇUES
                        </IndexButton>
                    </Link>
                </Grid.Column>
            </Grid>
        </Container>
    )
};


export const getStaticProps = async function () {
    const API = await Prismic.getApi(apiEndpoint, {accessToken})
    const home = getHome(API)
    const menu = getMenu(API);
    const page_sections = getPageSections(API);

    const fetched = {
        home: await home,
        menu: await menu,
        page_sections: await page_sections
    }

    return {
        props: {
            pathname: "/",
            title: RichText.asText(fetched.home.data.title),
            description: RichText.asText(fetched.home.data.description),
            ...fetched
        },
        revalidate: Number(process.env.REVALIDATE_TIME_SECONDS) || CONSTANTS.revalidate
    }
}

export default Index