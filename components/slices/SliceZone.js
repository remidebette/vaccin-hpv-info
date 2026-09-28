'use client'

import {Suspense} from 'react'
import {useSearchParams} from 'next/navigation'
import TextSection from './TextSection'
import Quote from './Quote'
import FullWidthImage from './FullWidthImage'
import ImageGallery from './ImageGallery'
import ImageHighlight from './ImageHighlight'

// Content of a page: its sections are an accordion where the `default_section` query parameter opens one
function Slices({sliceZone, defaultSection}) {
    return (
        <div className="mt-6 divide-y divide-neutral-200 rounded-lg bg-white shadow-sm ring-1 ring-neutral-200">
            {sliceZone.map((slice, index) => {
                switch (slice.slice_type) {
                    case 'text_section':
                        return <TextSection key={index} slice={slice} open={slice.primary.section_id === defaultSection}/>
                    case 'quote':
                        return <Quote key={index} slice={slice}/>
                    case 'full_width_image':
                        return <FullWidthImage key={index} slice={slice}/>
                    case 'image_gallery':
                        return <ImageGallery key={index} slice={slice}/>
                    case 'image_highlight':
                        return <ImageHighlight key={index} slice={slice}/>
                    default:
                        return null
                }
            })}
        </div>
    )
}

function SlicesWithQuery({sliceZone}) {
    return <Slices sliceZone={sliceZone} defaultSection={useSearchParams().get('default_section') ?? undefined}/>
}

// The query string is only known in the browser: pages are pre-rendered with every section closed
const SliceZone = ({sliceZone}) => (
    <Suspense fallback={<Slices sliceZone={sliceZone}/>}>
        <SlicesWithQuery sliceZone={sliceZone}/>
    </Suspense>
)

export default SliceZone
