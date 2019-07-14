import React from 'react'
import { RichText } from 'prismic-reactjs'
import { htmlSerializer } from 'utils/htmlSerializer'
import { linkResolver } from 'prismic-configuration'

const Text = ({ slice }) => (
  <div className='post-part single container'>
    <RichText render={slice.primary.rich_text}
      linkResolver={linkResolver}
      htmlSerializer={htmlSerializer}
    />
  </div>
)

export default Text