import React from 'react'
import { RichText } from 'prismic-reactjs'
import { linkResolver } from 'prismic-configuration'
import { htmlSerializer } from 'utils/htmlSerializer'
import { Accordion, Icon } from 'semantic-ui-react'
import { css, cx } from "emotion";

const right_floated = css`
float: right
`

const TextSection = ({ slice, index, active, section, handleClick }) => {
    const sectionClass = slice.slice_label ? 'text-section-' + slice.slice_label : 'text-section-1col'
    //console.log(my_array);
    return (
        <>
            <Accordion.Title active={active} index={index} section={section} onClick={handleClick}>
                {slice.primary.section_title.length > 0 ? slice.primary.section_title[0].text : null}
                <Icon name="plus" className={right_floated} />
            </Accordion.Title>
            <Accordion.Content active={active} className={`content-section ${sectionClass}`}>
                {RichText.render(slice.primary.rich_text, linkResolver, htmlSerializer)}
            </Accordion.Content>
        </>
    )
}

export default TextSection