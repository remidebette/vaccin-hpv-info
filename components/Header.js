import React from 'react';
import Link from 'next/link';
import { RichText } from 'prismic-reactjs'
import { css, cx } from 'emotion'
import {
    Container,
    Dropdown,
    Menu,
} from 'semantic-ui-react'
import { hrefResolver, linkResolver } from "prismic-configuration";

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

const Header = (props) => {
    return (
        <header>
            <Menu fixed='top' borderless stackable className={menuStyle}>
                <Container>

                    <Dropdown item text="Vaccin HPV info">
                        <Dropdown.Menu>
                            <Link href="/">
                                <Dropdown.Item header as="a">
                                    <strong>Acceuil</strong>
                                </Dropdown.Item>
                            </Link>
                            {props.menu ? menuLinks(props.menu.data.menu_links) : null}

                            <Link href="/faq">
                                <Dropdown.Item as="a">
                                    Foire aux questions
                                </Dropdown.Item>
                            </Link>
                        </Dropdown.Menu>
                    </Dropdown>


                    <Menu.Menu position="right">
                        <Link href="/et-vous">
                            <Menu.Item as="a" key="et-vous">Et vous?
                            </Menu.Item>
                        </Link>

                        <Link href="/contactez-nous">
                            <Menu.Item as="a" key="contactez-nous">Contactez-nous
                            </Menu.Item>
                        </Link>
                    </Menu.Menu>
                </Container>
            </Menu>
        </header>
    );
}

const menuLinks = (menu_links) => {
    return menu_links.map((menuLink) => {
        return (
            <Link href={hrefResolver(menuLink.link)} as={linkResolver(menuLink.link)} passHref prefetch>
                <Dropdown.Item key={menuLink.link.id} as="a">
                    {RichText.asText(menuLink.label)}
                </Dropdown.Item>
            </Link>
        );
    });
}

const getMenu = async (API) => {
    console.log(`Fetched menu`)

    return await API.getSingle('menu')
}

export { Header, getMenu }