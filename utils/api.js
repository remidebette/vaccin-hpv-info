import * as prismic from '@prismicio/client'
import {enableAutoPreviews} from '@prismicio/next'
import {apiEndpoint} from '@/prismic-configuration'
import {CONSTANTS} from '@/utils/CONSTANTS'

// Server-side Prismic client. Pages are statically generated and refreshed at most every
// REVALIDATE_TIME_SECONDS (incremental static regeneration); draft content is served during previews.
export function createClient() {
    const client = prismic.createClient(apiEndpoint, {
        fetchOptions: {next: {revalidate: Number(process.env.REVALIDATE_TIME_SECONDS) || CONSTANTS.revalidate}},
    })
    enableAutoPreviews({client})
    return client
}

export const getMenu = () => createClient().getSingle('menu')

// Section titles of every page, to build the header drop-down menus.
export async function getPageSections() {
    const pages = await createClient().getAllByType('page')
    return pages.map(page => ({
        uid: page.uid,
        sections: page.data.page_content.filter(slice => slice.slice_type === 'text_section').map(slice => ({
            id: slice.primary.section_id,
            title: prismic.asText(slice.primary.section_title),
        })),
    }))
}

export const getPage = (uid) => createClient().getByUID('page', uid)
export const getAllPages = () => createClient().getAllByType('page')
export const getHome = () => createClient().getSingle('homepage')
export const getFAQ = () => createClient().getSingle('faq')
export const getEtVous = () => createClient().getSingle('et_vous')
