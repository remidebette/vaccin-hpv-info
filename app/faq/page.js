import * as prismic from '@prismicio/client'
import Footer from '@/components/Footer'
import FAQSlice from '@/components/slices/faqSlice'
import {getFAQ} from '@/utils/api'
import {pageMetadata} from '@/utils/seo'

export async function generateMetadata() {
    const faq = await getFAQ()
    return pageMetadata({
        pathname: '/faq',
        title: prismic.asText(faq.data.title),
        description: prismic.asText(faq.data.description),
    })
}

export default async function FAQ() {
    const faq = await getFAQ()

    return (
        <>
            <main className="mx-auto max-w-3xl px-4 py-8">
                <h1 className="text-3xl font-bold">{prismic.asText(faq.data.title)}</h1>
                <div className="mt-6 space-y-4">
                    {faq.data.page_content.map((slice, index) => <FAQSlice slice={slice} key={index}/>)}
                </div>
            </main>
            <Footer source_indexes={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 17]}/>
        </>
    )
}
