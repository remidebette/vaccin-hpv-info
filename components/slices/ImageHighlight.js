import Link from 'next/link'
import * as prismic from '@prismicio/client'
import {PrismicRichText} from '@prismicio/react'
import {linkResolver} from '@/prismic-configuration'

const ImageHighlight = ({slice}) => {
    const internalLink = slice.primary.link.link_type === 'Document'
    return (
        <section className="relative overflow-auto content-section">
            <div className="w-[43%] float-left max-tablet:w-full max-tablet:float-none">
                <PrismicRichText field={slice.primary.title} linkResolver={linkResolver}/>
                <PrismicRichText field={slice.primary.headline} linkResolver={linkResolver}/>
                {prismic.asText(slice.primary.link_label) !== '' ? (
                    <p>
                        <Link href={internalLink ? linkResolver(slice.primary.link) : prismic.asLink(slice.primary.link, {linkResolver})}>
                            {prismic.asText(slice.primary.link_label)}
                        </Link>
                    </p>
                ) : ''}
            </div>
            <div className="w-[48%] float-right max-tablet:w-full max-tablet:float-none">
                <img src={slice.primary.featured_image.url} alt={slice.primary.featured_image.alt}/>
            </div>
        </section>
    )
}

export default ImageHighlight
