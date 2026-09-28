import Link from 'next/link'
import {linkResolver} from '@/prismic-configuration'
import PreviewPopup from '@/components/PreviewPopup'

// Rendering of Prismic rich text links and images (components prop of <PrismicRichText>).
export const richTextComponents = {
    hyperlink({node, children}) {
        const data = node.data
        if (data.link_type === 'Document' && data.type === 'preview') {
            // Links to "preview" documents show them in a popup instead of navigating
            return <PreviewPopup uid={data.uid}>{children}</PreviewPopup>
        }
        if (data.link_type === 'Document') {
            return <Link href={linkResolver(data)}>{children}</Link>
        }
        const target = data.target ? {target: data.target, rel: 'noopener'} : {}
        return <a href={data.url || linkResolver(data)} {...target}>{children}</a>
    },

    image({node}) {
        const img = (
            <img src={node.url} alt={node.alt || ''}
                 className="relative block align-middle max-w-full bg-transparent mx-auto"/>
        )
        let content = img
        if (node.linkTo) {
            if (node.linkTo.link_type === 'Document') {
                content = <Link href={linkResolver(node.linkTo)}>{img}</Link>
            } else {
                const target = node.linkTo.target ? {target: node.linkTo.target, rel: 'noopener'} : {}
                content = <a href={node.linkTo.url || linkResolver(node.linkTo)} {...target}>{img}</a>
            }
        }
        return <p className={[node.label || '', 'block-img'].join(' ')}>{content}</p>
    },
}
