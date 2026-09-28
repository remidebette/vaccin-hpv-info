import {PrismicLink} from '@prismicio/react'
import * as prismic from '@prismicio/client'
import Link from 'next/link'
import RichText from '@/components/RichText'
import {linkResolver} from '@/prismic-configuration'

const ImageGallery = ({slice}) => (
    <section className="px-5 py-6">
        <RichText field={slice.primary.gallery_title}/>
        <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {slice.items.map((item, index) => (
                <figure key={index}>
                    <img src={item.image.url} alt={item.image.alt ?? ''} className="w-full rounded"/>
                    <RichText field={item.image_description} className="mt-2"/>
                    {prismic.isFilled.link(item.link) && prismic.asText(item.link_label) &&
                        <PrismicLink field={item.link} linkResolver={linkResolver} internalComponent={Link} className="link uppercase">
                            {prismic.asText(item.link_label)}
                        </PrismicLink>
                    }
                </figure>
            ))}
        </div>
    </section>
)

export default ImageGallery
