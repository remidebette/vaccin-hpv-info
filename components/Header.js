import React from 'react';
import Link from 'next/link';
import {RichText} from 'prismic-reactjs'
import PrismicConfig from '../prismic-configuration'
import {css, cx} from 'emotion'
import {
    Container,
    Divider,
    Dropdown,
    Grid,
    Image,
    List,
    Menu,
    Segment,
} from 'semantic-ui-react'

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
    const menu_links = props.menu.data.menu_links

    return (
        <header>
            <Menu fixed='top' borderless className={menuStyle}>
                <Container>
                    <Link href="/">
                        <Menu.Item header as="a">
                            Home
                        </Menu.Item>
                    </Link>

                    <Menu.Menu position="right">
                        {menuLinks(menu_links)}

                        <Link href="/etvous">
                            <Menu.Item as="a" key="et-vous">Et vous?
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
            <Link href={PrismicConfig.hrefResolver(menuLink.link)}>
                <Menu.Item key={menuLink.link.id} as="a">
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