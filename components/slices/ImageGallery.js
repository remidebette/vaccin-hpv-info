import Link from 'next/link'
import * as prismic from '@prismicio/client'
import {PrismicRichText} from '@prismicio/react'
import {linkResolver} from '@/prismic-configuration'

const GalleryItem = ({slice}) => (
    slice.items.map((item, index) => {
        const internalLink = item.link.link_type === 'Document'
        return (
            <div className="flex-[0_1_48%] max-tablet:flex-[1_1_100%]" key={index}>
                <img src={item.image.url} alt={item.image.alt} className="mb-[1rem]"/>
                <PrismicRichText field={item.image_description} linkResolver={linkResolver}/>
                {prismic.asText(item.link_label) !== '' ? (
                    <p className="-mt-[20px] uppercase">
                        <Link href={internalLink ? linkResolver(item.link) : prismic.asLink(item.link, {linkResolver})}>
                            {prismic.asText(item.link_label)}
                        </Link>
                    </p>
                ) : ''}
            </div>
        )
    })
)

const ImageGallery = ({slice}) => (
    <section className="image-gallery content-section">
        <PrismicRichText field={slice.primary.gallery_title} linkResolver={linkResolver}/>
        <div className="flex flex-wrap justify-between">
            <GalleryItem slice={slice}/>
        </div>
    </section>
)

export default ImageGallery
