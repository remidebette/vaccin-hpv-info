import React from 'react';
import Link from 'next/link';
import {css} from 'emotion'
import {Container, Dropdown, Icon, Menu, Sticky} from 'semantic-ui-react'
import {noBoxShadow} from "../utils/css";
import {hrefResolver, linkResolver} from "../prismic-configuration";
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
                    //style={{marginTop: '0em'}}
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
            <span>
                <Icon name={menuLink.icon}/>{RichText.asText(menuLink.label)}
            </span>
        )

        return (
            <Link href={hrefResolver(menuLink.link)} as={linkResolver(menuLink.link)} passHref key={menuLink.link.id}>
                <Menu.Item active={uid === menuLink.link.uid}>
                    <Dropdown
                        simple
                        closeOnChange
                        closeOnBlur
                        trigger={trigger}
                    >
                        <Dropdown.Menu>
                            {page_sections.data.page_content.map((section) => (
                                <Link
                                    href={hrefResolver(menuLink.link, {default_section: section.primary.section_id})}
                                    as={linkResolver(menuLink.link, {default_section: section.primary.section_id})}
                                    passHref
                                    key={menuLink.link.id + "-" + section.primary.section_id}>
                                    <Dropdown.Item>
                                        {RichText.asText(section.primary.section_title)}
                                    </Dropdown.Item>
                                </Link>
                            ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </Menu.Item>
            </Link>
        );
    });
}

export default Header