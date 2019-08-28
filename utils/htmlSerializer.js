import React from 'react'
import {Elements} from 'prismic-reactjs';
import {hrefResolver, linkResolver} from 'prismic-configuration'
import Router from 'next/router'
import { PopUp, Hello} from "../components/popup";

const onClickHandler = function (href, as) {
  // Handler that will do routing imperatively on internal links
  return e => {
    e.preventDefault()
    Router.push(href, as)
  }
}


const propsWithUniqueKey = function (props, key) {
  return Object.assign(props || {}, { key })
}

export const htmlSerializer = function (type, element, content, children, key) {
  var props = {}
  switch (type) {
    case Elements.hyperlink: // Link
      if (element.data.link_type === 'Document' && element.data.type === "preview") {
        // Only for internal links add the new onClick that will imperatively route to the appropiate page

        props = Object.assign({
          "uid": element.data.uid
        })
        return React.createElement(PopUp, propsWithUniqueKey(props, key), children)
      } else if (element.data.link_type === 'Document') {
        // Only for internal links add the new onClick that will imperatively route to the appropiate page
        props = Object.assign({
          onClick: onClickHandler(hrefResolver(element.data), linkResolver(element.data)),
          href: linkResolver(element.data)
        })
        return React.createElement('a', propsWithUniqueKey(props, key), children)
      } else {
        // Default link handling
        const targetAttr = element.data.target ? { target: element.data.target } : {}
        const relAttr = element.data.target ? { rel: 'noopener' } : {}
        props = Object.assign({
          href: element.data.url || linkResolver(element.data)
        }, targetAttr, relAttr)
        return React.createElement('a', propsWithUniqueKey(props, key), children)
      }

    case Elements.image: // Image
      var imgProps = {}
      var internal = false

      if (element.linkTo && element.linkTo.link_type === 'Document') {
        // Exclusively for internal links, build the object that can be used for router push
        internal = true
        const targetAttr = element.data.target ? { target: element.data.target } : {}
        const relAttr = element.data.target ? { rel: 'noopener' } : {}
        imgProps = Object.assign({
          onClick: onClickHandler(hrefResolver(element.linkTo), linkResolver(element.linkTo)),
          href: linkResolver(element.linkTo)
        }, targetAttr, relAttr)
      }
      // Handle images just like regular HTML Serializer
      const linkUrl = element.linkTo ? element.linkTo.url || linkResolver(element.linkTo) : null
      const linkTarget = (element.linkTo && element.linkTo.target) ? { target: element.linkTo.target } : {}
      const linkRel = linkTarget.target ? { rel: 'noopener' } : {}
      const img = React.createElement('img', { src: element.url, alt: element.alt || '' })
      return React.createElement(
        'p',
        propsWithUniqueKey({ className: [element.label || '', 'block-img'].join(' ') }, key),
        linkUrl ? React.createElement('a',
          // if it's an internal link, replace the onClick
          internal ? propsWithUniqueKey(imgProps, key) : Object.assign({ href: linkUrl },
            linkTarget, linkRel), img) : img
      )

    default:
      return null
  }
}

export default htmlSerializer