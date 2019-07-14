import React, {Fragment} from 'react'
import {RichText} from 'prismic-reactjs'
import {linkResolver} from 'prismic-configuration'
import {htmlSerializer} from 'utils/htmlSerializer'

const TextSection = ({slice}) => {
    const sectionClass = slice.slice_label ? 'text-section-' + slice.slice_label : 'text-section-1col'
    //console.log(my_array);
    return (
        <Fragment>
            <section className={`content-section ${sectionClass}`}>
                {RichText.render(slice.primary.rich_text, linkResolver, htmlSerializer)}
            </section>

        </Fragment>
    )
}

export default TextSection