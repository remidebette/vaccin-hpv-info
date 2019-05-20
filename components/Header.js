import React from 'react';
import Link from 'next/link';
import { RichText } from 'prismic-reactjs'
import PrismicConfig from '../prismic-configuration'

const linkStyle = {
    marginRight: 15
};

const navStyle = {
    float: 'right'
  }

const navUlStyle = {
    margin: 0
  }

const navLiStyle = {
    display: 'inline-block',
    marginLeft: '40px'
}

const Header = (props) => {
    const menu_links = props.menu.data.menu_links

    return (
        <header>
            <Link href="/">
                <a style={linkStyle}>Home</a>
            </Link>

            <nav style={navStyle}>
                <ul style={navUlStyle}>
                    {menuLinks(menu_links)}

                </ul>
            </nav>
        </header>
    );
}

const menuLinks = (menu_links) => {
    return menu_links.map((menuLink) => {
      return (
        <li key={menuLink.link.id} style={navLiStyle}>
          <Link href={PrismicConfig.hrefResolver(menuLink.link)}>
          <a style={linkStyle}>
            {RichText.asText(menuLink.label)}
          </a>
          </Link>
        </li>
      );
    });
}

const getMenu = async (API) => {
    console.log(`Fetched menu`)

    return await API.getSingle('menu')
}

export { Header, getMenu }