import * as prismic from '@prismicio/client'

const Quote = ({slice}) => (
    <blockquote className="px-5 py-6 text-center text-2xl text-neutral-700 italic">
        « {prismic.asText(slice.primary.quote)} »
    </blockquote>
)

export default Quote
