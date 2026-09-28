import Link from 'next/link'
import * as prismic from '@prismicio/client'
import RichText from '@/components/RichText'
import {linkResolver} from '@/prismic-configuration'

// A misconception ("idée reçue") and why it is false
const FAQSlice = ({slice}) => {
    const link = slice.primary.link
    const href = typeof link === 'string' ? link : prismic.asLink(link, {linkResolver})
    return (
        <article className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-neutral-200">
            <h2 className="text-lg font-bold text-neutral-900">{prismic.asText(slice.primary.question)}</h2>
            <p className="mt-3">
                <span className="rounded border border-red-700 px-2 py-0.5 text-xs font-bold tracking-wide text-red-700">FAUX</span>
            </p>
            <RichText field={slice.primary.rich_text} className="mt-2"/>
            {href && (href.startsWith('/')
                ? <Link href={href} className="link mt-3 inline-block">Pour en savoir plus</Link>
                : <a href={href} rel="noopener" target="_blank" className="link mt-3 inline-block">Pour en savoir plus</a>
            )}
        </article>
    )
}

export default FAQSlice
