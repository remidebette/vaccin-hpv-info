import * as prismic from '@prismicio/client'

const Quote = ({slice}) => (
    <div className="post-part single container">
        <blockquote className="mb-[2rem] inline-block italic text-[24px] before:content-['«_'] after:content-['_»'] min-[920px]:w-[130%] min-[920px]:mx-[-15%] min-[920px]:mt-0 min-[920px]:text-[30px] min-[920px]:p-0">
            {prismic.asText(slice.primary.quote)}
        </blockquote>
    </div>
)

export default Quote
