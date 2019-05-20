export default {
    apiEndpoint: "https://anti-hpv.prismic.io/api/v2",
    hrefResolver: function(doc) {
        if (doc.type === 'page') {
        return `/page?uid=${doc.uid}`
        }
        return '/'
    }
}