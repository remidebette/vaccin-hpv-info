// -- Prismic repository
// NEXT_PUBLIC_PRISMIC_ENDPOINT can point the site at another API endpoint (e.g. a local mock); it defaults
// to the anti-hpv repository.
export const repositoryName = 'anti-hpv'
export const apiEndpoint = process.env.NEXT_PUBLIC_PRISMIC_ENDPOINT || `https://${repositoryName}.cdn.prismic.io/api/v2`

// -- Link resolution rules
// Manages links to internal Prismic documents
// Modify as your project grows to handle any new routes you've made
export function linkResolver(doc, additional) {
    let str = '/'
    if (doc.type === 'page') {
        str = `/page/${doc.uid}`
    }
    if (additional) {
        str += `?${new URLSearchParams(additional)}`
    }
    return str
}
