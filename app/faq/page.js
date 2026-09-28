import * as prismic from '@prismicio/client'
import Footer from '@/components/Footer'
import FAQSlice from '@/components/slices/faqSlice'
import Container from '@/components/ui/Container'
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
            <Container text justified className="pt-[2em] pb-[5em]">
                <h1>{prismic.asText(faq.data.title)}</h1>

                {faq.data.page_content.map((slice, index) => (
                    <FAQSlice slice={slice} key={'slice-' + index}/>
                ))}
            </Container>
            <Footer source_indexes={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 17]}/>
        </>
    )
}
