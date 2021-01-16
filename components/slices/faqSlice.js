import React from 'react'
import {RichText} from 'prismic-reactjs'
import {linkResolver} from 'prismic-configuration'
import {htmlSerializer} from 'utils/htmlSerializer'
import {Label, Message} from 'semantic-ui-react'
import Link from "next/link";

const LabelledDiv = (props) => {
    const new_first = React.cloneElement(
        props.children[0],
        [],
        [<Label basic color='red' horizontal>FAUX</Label>, ...props.children[0].props.children]
    )

    // TODO: The following list does not apparently have keys

    return (
        <div>
            {
                [new_first, props.children.slice(1, new_first.length)]
            }
        </div>
    )
}

const FAQSlice = ({slice}) => {
    return (
        <Message>
            <Message.Content>
                <Message.Header as="h2" >{slice.primary.question.length > 0 ? slice.primary.question[0].text : null}</Message.Header>
                <br/>
                <LabelledDiv>
                    {RichText.render(slice.primary.rich_text, linkResolver, htmlSerializer).props.children}
                </LabelledDiv>
                <br/>
                <Link href={slice.primary.link}>
                    <a rel="noopener" target="_blank">
                        Pour en savoir plus
                    </a>
                </Link>
            </Message.Content>
        </Message>
    )
}

export default FAQSlice