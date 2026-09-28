import Link from 'next/link'
import {PrismicRichText} from '@prismicio/react'
import {linkResolver} from '@/prismic-configuration'
import PreviewPopup from '@/components/PreviewPopup'

const components = {
    // Links to "preview" documents open the preview in a popup; other links use the default rendering
    hyperlink: ({node, children}) => node.data.link_type === 'Document' && node.data.type === 'preview'
        ? <PreviewPopup uid={node.data.uid}>{children}</PreviewPopup>
        : null,
}

// Prismic rich text with the site's typography. `invert` is for text on a pink background.
export default function RichText({field, invert, className = ''}) {
    return (
        <div className={`prose max-w-none prose-img:mx-auto prose-h1:text-2xl prose-h1:font-bold prose-h2:text-xl prose-h3:text-lg ${invert ? 'prose-invert' : 'prose-neutral prose-a:text-brand'} ${className}`}>
            <PrismicRichText field={field} linkResolver={linkResolver} internalLinkComponent={Link} components={components}/>
        </div>
    )
}
