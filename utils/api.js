import {Predicates} from "prismic-javascript";

async function getMenu (API) {
    try {
        const menu = await API.getSingle('menu')
        console.log(`Prismic: Fetched menu`)

        return menu

    } catch (error) {
        console.error(error)
        return error
    }
}

async function getPageSections (API) {
    try {
        const page_sections = await API.query(
            Predicates.at("document.type", 'page'),
            { fetch: 'page_content.section_title' }
        )

        console.log(`Prismic: Fetched page sections`)

        return page_sections.results

    } catch (error) {
        console.error(error)
        return error
    }
}


async function getPage (uid, API) {
    try {
        const res_page = await API.getByUID('page', uid)

        console.log(`Prismic: Fetched page: ${uid}`)

        return res_page
    } catch (error) {
        console.error(error)
        return error
    }
}

async function getHome (API) {
    try {
        console.log(`Prismic: Fetched home`)
        return await API.getSingle('homepage')
    } catch (error) {
        console.error(error)
        return error
    }
}

async function getFAQ (API) {
    try {
        console.log(`Prismic: Fetched faq`)
        return await API.getSingle('faq')
    } catch (error) {
        console.error(error)
        return error
    }
}

async function getEtVous (API) {
    try {
        console.log(`Prismic: Fetched et_vous`)
        return await API.getSingle('et_vous')
    } catch (error) {
        console.error(error)
        return error
    }
}

async function getPreview (uid, API) {
    try {
        const res_preview = await API.getByUID('preview', uid)

        console.log(`Prismic: Fetched preview: ${uid}`)

        return res_preview.data

    } catch (error) {
        console.error(error)
        return error
    }
}

export {getPage, getMenu, getPageSections, getHome, getFAQ, getEtVous, getPreview}
