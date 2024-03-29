import React from 'react';
import Link from 'next/link';
import {css} from 'emotion'
import {Container, Icon, Menu, Sticky, Popup} from 'semantic-ui-react'
import {noBoxShadow} from "utils/css";
import {linkResolver} from "prismic-configuration";
import {RichText} from "prismic-reactjs";

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
        font-family: century-gothic, sans-serif;
        font-size: 16px;
        font-style: italic;
        text-align: left;
        `

const item_style = {padding: '0.9em 1.14em'};

const Header = (props) => {
    const menu = props.menu
    const page_sections = props.page_sections

    return (
        <Sticky context={props.context}>
            <Menu
                //fixed='top'
                borderless
                stackable
                className={noBoxShadow}
                inverted
                color="pink"
                size="large"
            >
                <Container>

                    <Menu.Menu position="left">
                        <Link href="/">
                            <Menu.Item
                                header
                                //color="white"
                            >
                                <Icon name="home"/>
                                <strong>VACCIN HPV INFO
                                    {/*<br/> Acceuil*/}
                                </strong>
                            </Menu.Item>
                        </Link>

                    </Menu.Menu>

                    <Menu.Item position="left"
                        //text
                        //className={menu_style}
                    >
                        TOUT CE QUE VOUS VOULEZ SAVOIR SUR LA VACCINATION ANTI-HPV
                    </Menu.Item>

                    <Menu.Menu position="right">

                        <Link href="/a-propos">
                            <Menu.Item header>
                                À PROPOS DE NOUS
                            </Menu.Item>
                        </Link>
                    </Menu.Menu>
                </Container>
            </Menu>

            {props.pathname !== "/" ?
                <Menu
                    //pointing
                    secondary
                    stackable
                    inverted
                    //compact
                    color="pink"
                    //size="large"
                    //className={menuStyle}
                >
                    <Container>
                        <Menu.Menu position="left">
                            {menu ? menuLinks(menu.data.menu_links, page_sections, props.uid) : null}
                        </Menu.Menu>

                        <Menu.Menu position="right">
                            <Link href="/et-vous">
                                <Menu.Item
                                    key="et-vous"
                                    active={props.pathname === "/et-vous"}
                                >
                                    <Icon name="clipboard list"/>Et vous? (Simulation)
                                </Menu.Item>
                            </Link>


                            <Link href="/faq">
                                <Menu.Item
                                    active={props.pathname === "/faq"}
                                >
                                    <Icon name="doctor"/>
                                    Idées reçues
                                </Menu.Item>
                            </Link>
                        </Menu.Menu>
                    </Container>
                </Menu> : null}
        </Sticky>
    );
}

const menuLinks = (menu_links, pages_sections, uid) => {

    return menu_links.map((menuLink) => {
        let page_sections = pages_sections.find((element) => {
            return element.uid === menuLink.link.uid
        })

        const trigger = (
            <Menu.Item active={uid === menuLink.link.uid}>
                <Link href={linkResolver(menuLink.link)} passHref>
                    <span>
                        <Icon name={menuLink.icon}/>{RichText.asText(menuLink.label)}
                    </span>
                </Link>
            </Menu.Item>
        )

        return (
            <Popup
                basic
                flowing
                hoverable
                position="bottom left"
                on="hover"
                pinned
                trigger={trigger}
                key={menuLink.link.id}
                style={{padding: '0'}}
            >
                <Menu vertical fluid borderless>
                    {page_sections.data.page_content.map((section) => (
                        <Link
                            href={linkResolver(menuLink.link, {default_section: section.primary.section_id})}
                            passHref
                            key={menuLink.link.id + "-" + section.primary.section_id}>
                            <Menu.Item style={item_style}>
                                {RichText.asText(section.primary.section_title)}
                            </Menu.Item>
                        </Link>
                    ))
                    }
                </Menu>
            </Popup>
        );
    });
}

export default Header