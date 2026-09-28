'use client'

import {useState} from 'react'
import * as prismic from '@prismicio/client'
import {apiEndpoint} from '@/prismic-configuration'
import RichText from '@/components/RichText'
import Popup from '@/components/ui/Popup'

// Link opening a popup with a short preview (Prismic "preview" document) of the linked notion.
export default function PreviewPopup({uid, children}) {
    const [data, setData] = useState(null)

    async function load() {
        if (data) return
        const client = prismic.createClient(apiEndpoint)
        setData((await client.getByUID('preview', uid)).data)
    }

    return (
        <Popup
            onOpen={load}
            trigger={<span role="button" tabIndex={0} className="link cursor-pointer decoration-dotted">{children}</span>}
        >
            {data === null ? (
                <div className="animate-pulse space-y-3" aria-label="Chargement">
                    <div className="h-32 rounded bg-white/30"/>
                    <div className="h-4 w-2/3 rounded bg-white/30"/>
                    <div className="h-3 rounded bg-white/30"/>
                </div>
            ) : (
                <>
                    <img src={data.image.url} alt={data.image.alt ?? ''} className="w-full rounded"/>
                    <p className="mt-3 font-bold">{prismic.asText(data.preview_title)}</p>
                    <RichText field={data.rich_text} invert className="prose-sm mt-1"/>
                </>
            )}
        </Popup>
    )
}
