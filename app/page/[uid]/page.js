import {notFound} from 'next/navigation'
import * as prismic from '@prismicio/client'
import Footer from '@/components/Footer'
import SliceZone from '@/components/slices/SliceZone'
import Container from '@/components/ui/Container'
import {getAllPages, getPage} from '@/utils/api'
import {pageMetadata} from '@/utils/seo'

// Only the pages existing at build time are served (like `fallback: false` before)
export const dynamicParams = false

export async function generateStaticParams() {
    const pages = await getAllPages()
    return pages.map(page => ({uid: page.uid}))
}

async function getPageOr404(uid) {
    try {
        return await getPage(uid)
    } catch (error) {
        if (error instanceof prismic.NotFoundError) notFound()
        throw error
    }
}

export async function generateMetadata({params}) {
    const {uid} = await params
    const doc = await getPageOr404(uid)
    return pageMetadata({
        pathname: '/page/' + uid,
        title: prismic.asText(doc.data.title),
        description: prismic.asText(doc.data.description),
    })
}

export default async function Page({params}) {
    const {uid} = await params
    const doc = await getPageOr404(uid)
    const source_indexes = doc.data.sources.split(/\s*,\s*/).map(value => Number(value) - 1)

    return (
        <>
            <Container text justified className="pt-[2em] pb-[5em]">
                <h1>{prismic.asText(doc.data.title)}</h1>

                <SliceZone sliceZone={doc.data.page_content}/>
            </Container>
            <Footer source_indexes={source_indexes}/>
        </>
    )
}
