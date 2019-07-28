import React from 'react'
import {RichText} from 'prismic-reactjs'
import {linkResolver} from 'prismic-configuration'
import {htmlSerializer} from 'utils/htmlSerializer'
import {Icon, Message} from 'semantic-ui-react'
import Link from "next/link";

const FAQSlice = ({slice}) => {
    return (
        <Message icon>
            <Icon name="x"/>
            <Message.Content>
                <Message.Header>{slice.primary.question.length > 0 ? slice.primary.question[0].text : null}</Message.Header>
                <br/>
                {RichText.render(slice.primary.rich_text, linkResolver, htmlSerializer)}

                <Link href={slice.primary.link}>
                    <a target="_blank">
                        Pour en savoir plus
                    </a>
                </Link>
            </Message.Content>
        </Message>
    )
}

export default FAQSlice