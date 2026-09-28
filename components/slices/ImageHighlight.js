import {PrismicLink} from '@prismicio/react'
import * as prismic from '@prismicio/client'
import Link from 'next/link'
import RichText from '@/components/RichText'
import {linkResolver} from '@/prismic-configuration'

const ImageHighlight = ({slice}) => (
    <section className="grid items-center gap-6 px-5 py-6 sm:grid-cols-2">
        <div>
            <RichText field={slice.primary.title}/>
            <RichText field={slice.primary.headline}/>
            {prismic.isFilled.link(slice.primary.link) && prismic.asText(slice.primary.link_label) &&
                <PrismicLink field={slice.primary.link} linkResolver={linkResolver} internalComponent={Link} className="link">
                    {prismic.asText(slice.primary.link_label)}
                </PrismicLink>
            }
        </div>
        <img src={slice.primary.featured_image.url} alt={slice.primary.featured_image.alt ?? ''} className="w-full rounded"/>
    </section>
)

export default ImageHighlight
