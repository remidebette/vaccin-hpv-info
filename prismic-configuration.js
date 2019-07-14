module.exports = {
  // -- Prismic API endpoint
  // Determines which repository to query and fetch data from
  // Configure your site's access point here
  apiEndpoint: 'https://anti-hpv.prismic.io/api/v2',

  // -- Access Token if the repository is not public
  // Generate a token in your dashboard and configure it here if your repository is private
  // accessToken: '########',

  // -- Link resolution rules
  // Manages links to internal Prismic documents
  // Modify as your project grows to handle any new routes you've made
  linkResolver: function (doc) {
    if (doc.type === 'page') {
      return `/page/${doc.uid}`
    }
    return '/'
  },

  // Additional helper function for Next/Link component
  hrefResolver: function (doc) {
    if (doc.type === 'page') {
      return `/page?uid=${doc.uid}`
    }
    return '/'
  }
}
