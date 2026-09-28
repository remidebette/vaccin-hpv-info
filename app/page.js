import Link from 'next/link'
import * as prismic from '@prismicio/client'
import Footer from '@/components/Footer'
import {buttonClasses, LabeledIcon} from '@/components/ui/Button'
import Container from '@/components/ui/Container'
import Divider from '@/components/ui/Divider'
import {linkResolver} from '@/prismic-configuration'
import {getHome, getMenu} from '@/utils/api'
import {pageMetadata} from '@/utils/seo'

const button_icons = {
    'informations-generales': 'suitcase',
    'effets_secondaires': 'pills',
    'transmission': 'heartbeat',
}
const description = 'Tout ce que vous voulez savoir sur la vaccination anti-HPV, ' +
    'une information claire et concise pour les patients produite par ' +
    'des médecins indépendants.'

const IndexButton = ({href, icon, children}) => (
    <Link
        href={href}
        className={buttonClasses({color: 'grey', size: 'massive', compact: true, labeled: true, className: 'w-[9em] text-right!'})}
    >
        <LabeledIcon name={icon}/>
        {children}
    </Link>
)

export async function generateMetadata() {
    const home = await getHome()
    return pageMetadata({
        pathname: '/',
        title: prismic.asText(home.data.title),
        description: prismic.asText(home.data.description),
    })
}

export default async function Index() {
    const menu = await getMenu()

    return (
        <>
            <Container className="pt-[2em] pb-[5em]">
                <div className="flex flex-wrap items-stretch p-0 -m-[1rem]">
                    <div className="relative inline-block w-full p-[1rem] align-top text-center self-[inherit]">
                        <h1>
                            <img
                                src="/images/logo.png"
                                alt="Page d'accueil du site Vaccin Anti HPV"
                                className="relative block align-middle max-w-full bg-transparent"
                            />
                        </h1>
                        <Divider hidden/>
                        <div className="relative table w-4/5 mx-auto p-[1em] rounded-[15px] bg-pink text-white font-bebas text-[1.8rem] leading-[1.36] tracking-[.48px] before:absolute before:-top-[.307143em] before:left-[10%] before:-ml-[.307143em] before:w-[.714286em] before:h-[.714286em] before:rotate-45 before:bg-pink">
                            {description.toUpperCase()}
                        </div>

                        <Divider hidden section/>

                        <Divider hidden/>

                        {menu.data.menu_links.map(menuLink => (
                            <IndexButton
                                key={menuLink.link.id}
                                href={linkResolver(menuLink.link)}
                                icon={button_icons[menuLink.link.uid]}
                            >
                                {prismic.asText(menuLink.label).toUpperCase()}
                            </IndexButton>
                        ))}

                        <Divider hidden/>

                        <IndexButton href="/et-vous" icon="clipboard list">
                            ET VOUS ? (SIMULATION)
                        </IndexButton>

                        <IndexButton href="/faq" icon="doctor">
                            IDÉES <br/>
                            REÇUES
                        </IndexButton>
                    </div>
                </div>
            </Container>
            <Footer/>
        </>
    )
}
