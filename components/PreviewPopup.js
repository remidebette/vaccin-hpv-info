'use client'

import {useState} from 'react'
import * as prismic from '@prismicio/client'
import {PrismicRichText} from '@prismicio/react'
import {apiEndpoint} from '@/prismic-configuration'
import {richTextComponents} from '@/utils/richText'
import Popup from '@/components/ui/Popup'
import {cn} from '@/components/ui/cn'

// Grey shimmering skeleton shown while the preview loads: an image, a header and a paragraph.
// The visible bars are the gaps between the white lines, the ::after blocks shorten them.
const line = cn(
    'relative h-[.857143em] mb-[.5em] not-first:mt-[.5em] bg-white',
    'before:absolute before:top-full before:left-0 before:h-[.5em] before:bg-inherit',
    'after:absolute after:top-full after:right-0 after:h-[.5em] after:bg-inherit',
)
const headerLine = 'first:h-[.01px] mb-[.642858em] not-first:mt-[.642858em] before:h-[.642858em] after:h-[.642858em]'
const block = 'relative overflow-hidden not-first:before:block not-first:before:relative not-first:before:h-[1.42858em] not-first:before:bg-white'

function Placeholder() {
    return (
        <div className={cn(
            'static overflow-hidden min-w-[200px] max-w-[30rem] bg-white bg-size-[1200px_100%] animate-[placeholder-shimmer_2s_linear_infinite]',
            'bg-[linear-gradient(to_right,rgba(0,0,0,.08)_0%,rgba(0,0,0,.15)_15%,rgba(0,0,0,.08)_30%)]',
        )}>
            <div className="h-[100px] bg-transparent"/>
            <div className={block}>
                <div className={cn(line, headerLine, 'after:w-[20%]')}/>
                <div className={cn(line, headerLine, 'after:w-[60%]')}/>
            </div>
            <div className={block}>
                <div className={cn(line, 'first:h-[.01px] after:w-[50%]')}/>
                <div className={cn(line, 'after:w-[35%]')}/>
                <div className={cn(line, 'after:w-[65%]')}/>
            </div>
        </div>
    )
}

// Link opening a popup with a short preview (Prismic "preview" document) of the linked notion.
export default function PreviewPopup({uid, children}) {
    const [data, setData] = useState(null)

    async function load() {
        if (data) return
        const client = prismic.createClient(apiEndpoint)
        setData((await client.getByUID('preview', uid)).data)
    }

    return (
        <Popup inverted placement="top-start" onOpen={load} trigger={<a>{children}</a>}>
            {data === null ? <Placeholder/> : (
                <>
                    <img src={data.image.url} alt={data.image.alt}
                         className="relative block align-middle max-w-full bg-transparent"/>
                    <h2 className="font-lato font-bold p-0 mt-[calc(2rem-.142858em)] mb-[1rem] last:mb-0 text-[1.14286em] leading-[1.2] text-white normal-case border-none">
                        {data.preview_title.length > 0 ? data.preview_title[0].text : null}
                    </h2>
                    {/* Like the previous renderer, an empty paragraph still follows the title (and keeps its margin) */}
                    <PrismicRichText field={data.rich_text} components={richTextComponents}
                                     fallback={data.rich_text.length > 0 && <p/>}/>
                </>
            )}
        </Popup>
    )
}
