const obj_to_query = (obj) => {
  return Object.keys(obj).reduce(function(a, k){
        a.push(k + '=' + encodeURIComponent(obj[k]));
        return a;
    }, []).join('&');
}

// Can be simplified: check https://nextjs.org/docs#with-url-object

module.exports = {
  // -- Prismic API endpoint
  // Determines which repository to query and fetch data from
  // Configure your site's access point here
  apiEndpoint: 'https://anti-hpv.prismic.io/api/v2',
  graphQLEndpoint: 'https://anti-hpv.prismic.io/graphql',

  poweredByHeader: false,

  // -- Access Token if the repository is not public
  // Generate a token in your dashboard and configure it here if your repository is private
  // accessToken: '########',

  // -- Link resolution rules
  // Manages links to internal Prismic documents
  // Modify as your project grows to handle any new routes you've made
  linkResolver: function (doc, additional) {
    let str = "/"
    if (doc.type === 'page') {
      str = `/page/${doc.uid}`
    }
    if (additional) {
      str += `?${obj_to_query(additional)}`
    }
    return str
  },

  // Additional helper function for Next/Link component
  hrefResolver: function (doc, additional) {
    let str = "/"
    if (doc.type === 'page') {
      str = `/page?uid=${doc.uid}`
    }

    if (additional) {
      str += `&${obj_to_query(additional)}`
    }
    return str
  }
}
