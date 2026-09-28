import {Lato} from 'next/font/google'
import {draftMode} from 'next/headers'
import * as prismic from '@prismicio/client'
import {PrismicPreview} from '@prismicio/next'
import Header from '@/components/Header'
import {linkResolver, repositoryName} from '@/prismic-configuration'
import {getMenu, getPageSections} from '@/utils/api'
import {defaultMetadata} from '@/utils/seo'
import './globals.css'

const lato = Lato({
    weight: ['400', '700'],
    style: ['normal', 'italic'],
    subsets: ['latin'],
    variable: '--next-font-lato',
})

export const metadata = defaultMetadata

// Header menu entries: the pages of the Prismic menu, with their sections for the drop-downs
async function getMenuLinks() {
    const [menu, pageSections] = await Promise.all([getMenu(), getPageSections()])
    return menu.data.menu_links.map(({link, label, icon}) => {
        const page = pageSections.find(section => section.uid === link.uid)
        return {
            uid: link.uid,
            href: linkResolver(link),
            label: prismic.asText(label),
            icon,
            sections: page.sections.map(section => ({
                title: section.title,
                href: linkResolver(link, {default_section: section.id}),
            })),
        }
    })
}

export default async function RootLayout({children}) {
    const links = await getMenuLinks()
    const {isEnabled: isPreview} = await draftMode()

    return (
        <html lang="fr" className={lato.variable}>
            <head>
                <link rel="stylesheet" href="https://use.typekit.net/vhr2nog.css"/>
            </head>
            <body>
                <div>
                    <Header links={links}/>
                    {children}
                </div>
                {isPreview && <PrismicPreview repositoryName={repositoryName}/>}
            </body>
        </html>
    )
}
