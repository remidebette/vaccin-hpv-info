import Image from 'next/image'
import Link from 'next/link'
import * as prismic from '@prismicio/client'
import Footer from '@/components/Footer'
import Icon from '@/components/ui/Icon'
import {linkResolver} from '@/prismic-configuration'
import {getHome, getMenu} from '@/utils/api'
import {pageMetadata} from '@/utils/seo'
import logo from '@/public/images/logo.png'

const HomeLink = ({href, icon, children}) => (
    <Link
        href={href}
        className="flex w-full items-center gap-5 rounded-2xl bg-neutral-600 px-6 py-4 text-white transition-colors hover:bg-brand sm:w-72"
    >
        <Icon name={icon} className="text-5xl"/>
        <span className="font-heading text-3xl leading-none tracking-wide">{children}</span>
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
            <main className="mx-auto max-w-6xl px-4 py-8">
                <h1>
                    <Image src={logo} alt="Vaccin HPV Info" loading="eager" className="h-auto w-64 sm:w-auto"/>
                </h1>

                <p className="relative mx-auto mt-10 max-w-3xl rounded-2xl bg-brand-pastel px-6 py-5 text-center font-heading text-2xl leading-snug tracking-wide text-plum sm:text-3xl before:absolute before:-top-2 before:left-[10%] before:size-5 before:rotate-45 before:bg-brand-pastel">
                    Tout ce que vous voulez savoir sur la vaccination anti-HPV, une information claire et concise pour
                    les patients produite par des médecins indépendants.
                </p>

                <nav aria-label="Rubriques" className="mx-auto mt-12 flex max-w-4xl flex-wrap justify-center gap-4">
                    {menu.data.menu_links.map(menuLink => (
                        <HomeLink key={menuLink.link.id} href={linkResolver(menuLink.link)} icon={menuLink.icon}>
                            {prismic.asText(menuLink.label)}
                        </HomeLink>
                    ))}
                    <HomeLink href="/et-vous" icon="clipboard list">Et vous ? (simulation)</HomeLink>
                    <HomeLink href="/faq" icon="doctor">Idées reçues</HomeLink>
                </nav>
            </main>
            <Footer/>
        </>
    )
}
