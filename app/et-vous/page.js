import * as prismic from '@prismicio/client'
import Footer from '@/components/Footer'
import Simulation from '@/components/Simulation'
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
            <main className="mx-auto max-w-3xl px-4 py-8">
                <h1 className="text-3xl font-bold">{prismic.asText(et_vous.data.title)}</h1>
                <p className="mt-4">
                    Cette page vous permet d&apos;obtenir des informations personnalisées sous forme d&apos;une synthèse
                    sur votre situation par rapport aux vaccins HPV, répondez simplement aux questions.
                    Aucune conservation des données n&apos;est réalisée.
                </p>
                <Simulation data={et_vous.data}/>
            </main>
            <Footer source_indexes={[0, 1, 2, 3, 4, 8]}/>
        </>
    )
}
