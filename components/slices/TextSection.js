import * as prismic from '@prismicio/client'
import RichText from '@/components/RichText'
import Icon from '@/components/ui/Icon'

// Collapsible section; opening one closes the others (same `name`)
const TextSection = ({slice, open}) => (
    <details name="page-sections" id={slice.primary.section_id ?? undefined} open={open} className="group scroll-mt-32">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-bold text-neutral-800 hover:text-brand [&::-webkit-details-marker]:hidden">
            {prismic.asText(slice.primary.section_title)}
            <Icon name="plus" className="group-open:hidden"/>
            <Icon name="minus" className="hidden group-open:inline"/>
        </summary>
        <RichText field={slice.primary.rich_text} className="px-5 pb-6"/>
    </details>
)

export default TextSection
