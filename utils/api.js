import {Predicates} from "prismic-javascript";

const getMenu = async (API) => {
    try {
        console.log(`Fetched menu`)
        const menu = API.getSingle('menu')
        const page_sections =  await API.query(
            Predicates.at("document.type", 'page'),
            {fetch: 'page_content.section_title'}
            )

        return {
            menu: await menu,
            page_sections: page_sections.results
        }
    } catch (error) {
        console.error(error)
        return error
    }
}


const getPage = async (uid, API) => {
    try {
        const res_page = await API.getByUID('page', uid)

        console.log(`Fetched page: ${uid}`)

        return res_page
    } catch (error) {
        console.error(error)
        return error
    }
}

const getFAQ = async (API) => {
    try {
        console.log(`Fetched faq`)
        return await API.getSingle('faq')
    } catch (error) {
        console.error(error)
        return error
    }
}

const getEtVous = async (API) => {
    try {
        console.log(`Fetched et_vous`)
        return await API.getSingle('et_vous')
    } catch (error) {
        console.error(error)
        return error
    }
}

export {getPage, getMenu, getFAQ, getEtVous}
