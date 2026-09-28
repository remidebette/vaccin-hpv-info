import * as prismic from '@prismicio/client'
import {PrismicRichText} from '@prismicio/react'
import {linkResolver} from '@/prismic-configuration'
import {richTextComponents} from '@/utils/richText'
import Message, {MessageHeader} from '@/components/ui/Message'

const FalseLabel = () => (
    <span className="inline-block leading-none align-baseline mr-[.5em] py-[.4em] px-[.833em] min-w-[3em] text-center text-[.857143rem] font-bold normal-case rounded-[.285715rem] bg-white text-red border border-red transition-[background] duration-100 ease-[ease]">
        FAUX
    </span>
)

// The answer starts with a "FAUX" label in its first paragraph
const LabelledRichText = ({field}) => {
    const [first, ...rest] = field
    return (
        <div>
            <PrismicRichText
                field={[first]}
                linkResolver={linkResolver}
                components={{...richTextComponents, paragraph: ({children}) => <p><FalseLabel/>{children}</p>}}
            />
            <PrismicRichText field={rest} linkResolver={linkResolver} components={richTextComponents}/>
        </div>
    )
}

const FAQSlice = ({slice}) => {
    const link = slice.primary.link
    return (
        <Message>
            <div>
                <MessageHeader as="h2">{slice.primary.question.length > 0 ? slice.primary.question[0].text : null}</MessageHeader>
                <br/>
                <LabelledRichText field={slice.primary.rich_text}/>
                <br/>
                <a href={typeof link === 'string' ? link : prismic.asLink(link, {linkResolver})} rel="noopener" target="_blank">
                    Pour en savoir plus
                </a>
            </div>
        </Message>
    )
}

export default FAQSlice
