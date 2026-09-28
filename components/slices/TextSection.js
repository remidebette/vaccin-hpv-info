import {PrismicRichText} from '@prismicio/react'
import {linkResolver} from '@/prismic-configuration'
import {richTextComponents} from '@/utils/richText'
import Icon from '@/components/ui/Icon'
import {cn} from '@/components/ui/cn'

const TextSection = ({slice, active, section, handleClick}) => {
    const sectionClass = slice.slice_label ? 'text-section-' + slice.slice_label : 'text-section-1col'
    return (
        <>
            <h2
                onClick={() => handleClick(section)}
                className={cn(
                    'cursor-pointer m-0 py-[.75em] px-[1em] font-lato text-[1em] font-bold',
                    'border-t border-[rgba(34,36,38,.15)] first:border-t-0 transition-[background,color] duration-100 ease-[ease]',
                    'text-[rgba(0,0,0,.4)] hover:text-[rgba(0,0,0,.87)]',
                    active && 'text-[rgba(0,0,0,.95)] hover:text-[rgba(0,0,0,.95)]',
                )}
            >
                {slice.primary.section_title.length > 0 ? slice.primary.section_title[0].text : null}
                {/* The floated icon loses its baseline alignment: shift the glyph by the half-leading like the icon font did */}
                <Icon name={active ? 'minus' : 'plus'} className="float-right [&>svg]:mt-[.142858em]"/>
            </h2>
            <div className={cn('m-0 pt-[.5em] px-[1em] pb-[1.5em] content-section', sectionClass, active ? 'block' : 'hidden')}>
                <PrismicRichText field={slice.primary.rich_text} linkResolver={linkResolver} components={richTextComponents}/>
            </div>
        </>
    )
}

export default TextSection
