import {CONSTANTS} from '@/utils/CONSTANTS'

export const siteName = 'Vaccin HPV Info'
export const host = process.env.NEXT_PUBLIC_HOSTNAME || CONSTANTS.hostname

const robots = {index: true, follow: true, googleBot: {index: true, follow: true}}

// Metadata shared by every page
export const defaultMetadata = {
    facebook: {appId: '2575006349404861'},
    openGraph: {
        type: 'website',
        locale: 'fr_FR',
        url: 'https://vaccin-hpv-info.fr/',
        siteName,
    },
}

// Title, description, canonical URL and Open Graph tags of a page
export function pageMetadata({pathname, title, description}) {
    const canonical = 'https://' + host + pathname
    return {
        title,
        description,
        robots,
        alternates: {canonical},
        openGraph: {
            type: 'website',
            locale: 'fr_FR',
            url: canonical,
            title,
            description,
            images: [
                {
                    url: 'https://' + host + '/images/left-cropped-logo.png',
                    width: 100,
                    height: 100,
                    alt: 'Vaccin Anti HPV',
                },
                {
                    url: 'https://' + host + '/images/cropped-logo.png',
                    width: 214,
                    height: 112,
                    alt: 'Vaccin Anti HPV',
                },
            ],
            siteName,
        },
    }
}
