'use client'

import {Suspense, useState} from 'react'
import {useSearchParams} from 'next/navigation'
import TextSection from './TextSection'
import Quote from './Quote'
import FullWidthImage from './FullWidthImage'
import ImageGallery from './ImageGallery'
import ImageHighlight from './ImageHighlight'

// Accordion of the page sections; the `default_section` query parameter opens one of them.
function Accordion({sliceZone, defaultSection}) {
    const [activeSection, setSection] = useState(defaultSection)
    const [previousDefault, setPreviousDefault] = useState(defaultSection)
    if (defaultSection !== previousDefault) {
        // Navigating to another section of the page opens it
        setPreviousDefault(defaultSection)
        setSection(defaultSection)
    }

    const handleClick = (section) => setSection(section === activeSection ? null : section)

    return (
        <div className="max-w-full w-full rounded-[.285715rem] bg-white shadow-[0_1px_2px_0_rgba(34,36,38,.15),0_0_0_1px_rgba(34,36,38,.15)]">
            {sliceZone.map((slice, index) => {
                const section = slice.primary.section_id

                switch (slice.slice_type) {
                    case ('text_section'):
                        return <TextSection
                            slice={slice}
                            key={'slice-' + index}
                            section={section}
                            active={activeSection === section}
                            handleClick={handleClick}
                        />
                    case ('quote'):
                        return <Quote slice={slice} key={'slice-' + index}/>
                    case ('full_width_image'):
                        return <FullWidthImage slice={slice} key={'slice-' + index}/>
                    case ('image_gallery'):
                        return <ImageGallery slice={slice} key={'slice-' + index}/>
                    case ('image_highlight'):
                        return <ImageHighlight slice={slice} key={'slice-' + index}/>
                    default:
                        return null
                }
            })}
        </div>
    )
}

function AccordionWithQuery({sliceZone}) {
    const defaultSection = useSearchParams().get('default_section') ?? undefined
    return <Accordion sliceZone={sliceZone} defaultSection={defaultSection}/>
}

const SliceZone = ({sliceZone}) => (
    // The query string is only known in the browser: pages are pre-rendered with every section closed
    <Suspense fallback={<Accordion sliceZone={sliceZone}/>}>
        <AccordionWithQuery sliceZone={sliceZone}/>
    </Suspense>
)

export default SliceZone
