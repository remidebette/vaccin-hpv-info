import React from 'react';
import Link from 'next/link';
import {RichText} from 'prismic-reactjs'
import {css, cx} from 'emotion'
import {
    Container,
    Sticky,
    Menu,
} from 'semantic-ui-react'
import {hrefResolver, linkResolver} from "prismic-configuration";
import {noBoxShaddow} from "../utils/css";

const linkStyle = css`
    margin-right: 15px
`;

const navStyle = css`
    float: right;
`

const navUlStyle = css`
    margin: 0px
`

const navLiStyle = css`
    display: inline-block;
    margin-left: 40px
`

const menuStyle = css`
border: 1px solid rgb(221, 221, 221); 
box-shadow: rgba(0, 0, 0, 0.2) 0px 3px 5px; 
background-color: rgb(255, 255, 255);
`

const menu_style = css`
        /* max-width: 700px; */
        /* margin: 0 auto; */
        color: #9A9A9A !important;
        font-family: 'Lato', sans-serif;
        font-size: 16px;
        font-style: italic;
        text-align: center;
        `

const Header = (props) => {
    return (
        <Sticky context={props.context}>
            <Menu
                //fixed='top'
                borderless
                //stackable
                className={noBoxShaddow}
            >
                <Container>

                    <Menu.Menu>
                        <Link href="/">
                            <Menu.Item header>
                                <strong>Vaccin HPV info</strong>
                            </Menu.Item>
                        </Link>

                    </Menu.Menu>

                    <Menu.Item className={menu_style}>
                        Tout ce que vous devez savoir sur la vaccination anti-HPV
                    </Menu.Item>

                    <Menu.Menu position="right">

                        <Link href="/contactez-nous">
                            <Menu.Item>
                                A propos de nous
                            </Menu.Item>
                        </Link>
                    </Menu.Menu>
                </Container>
            </Menu>

            {props.pathname !== "/" ?
                <Menu
                    pointing
                    secondary
                    style={{backgroundColor: '#fff', marginTop: '0em'}}
                    //className={menuStyle}
                >
                    <Container>
                        <Menu.Menu position="left">
                            {props.menu ? menuLinks(props.menu.data.menu_links, props.pathname) : null}

                        </Menu.Menu>


                        <Menu.Menu position="right">
                            <Link href="/et-vous">
                                <Menu.Item
                                    key="et-vous"
                                    active={props.pathname === "/et-vous"}
                                >Et vous?
                                </Menu.Item>
                            </Link>


                            <Link href="/faq">
                                <Menu.Item
                                    active={props.pathname === "/faq"}
                                >
                                    Foire aux questions
                                </Menu.Item>
                            </Link>
                        </Menu.Menu>
                    </Container>
                </Menu> : null}
        </Sticky>
    );
}

const menuLinks = (menu_links, pathname) => {

    return menu_links.map((menuLink) => {
        return (
            <Link href={hrefResolver(menuLink.link)} as={linkResolver(menuLink.link)} passHref prefetch>
                <Menu.Item
                    key={menuLink.link.id}
                    active={pathname.endsWith(menuLink.link.uid)}
                >
                    {RichText.asText(menuLink.label)}
                </Menu.Item>
            </Link>
        );
    });
}

const getMenu = async (API) => {
    console.log(`Fetched menu`)

    return await API.getSingle('menu')
}

export {Header, getMenu}