import * as prismic from '@prismicio/client'
import Footer from '@/components/Footer'
import Simulation from '@/components/Simulation'
import Container from '@/components/ui/Container'
import {getEtVous} from '@/utils/api'
import {pageMetadata} from '@/utils/seo'

export async function generateMetadata() {
    const et_vous = await getEtVous()
    return pageMetadata({
        pathname: '/et-vous',
        title: prismic.asText(et_vous.data.title),
        description: prismic.asText(et_vous.data.description),
    })
}

export default async function EtVous() {
    const et_vous = await getEtVous()

    return (
        <>
            <Container text justified className="pt-[2em] pb-[5em]">
                <h1 className="border-none -mt-[.142858em] p-0 normal-case text-[rgba(0,0,0,.87)]">
                    {prismic.asText(et_vous.data.title)}
                </h1>
                <Simulation data={et_vous.data}/>
            </Container>
            <Footer source_indexes={[0, 1, 2, 3, 4, 8]}/>
        </>
    )
}
