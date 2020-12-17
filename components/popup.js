import React, { useState, createRef } from 'react'
import {RichText} from 'prismic-reactjs'
import {apiEndpoint, linkResolver} from 'prismic-configuration'
import {htmlSerializer} from 'utils/htmlSerializer'
import {Header, Image, Placeholder, Popup} from 'semantic-ui-react'
import {getPreview} from "utils/api";
import Prismic from "prismic-javascript";
import {accessToken} from "prismic-configuration";
//import useSWR from 'swr'

// Also see: https://nextjs.org/docs#dynamic-import

async function fetcher (uid) {
    const API = await Prismic.getApi(apiEndpoint, {accessToken});
    return await getPreview(uid, API)
}


export default function PopUp(props) {
    const [data, setData] = useState(null);

    return (
        <Popup
            trigger={props.children}
            onOpen={async () => {
                setData(
                    await fetcher(props.uid)
                )
            }}
            popperDependencies={[!!data]}
            inverted
        >
            {data === null ? (
                <Placeholder style={{minWidth: '200px'}} inverted>
                    <Placeholder.Image/>
                    <Placeholder.Header>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='medium'/>
                        <Placeholder.Line length='long'/>
                        <Placeholder.Line length='short'/>
                    </Placeholder.Paragraph>
                </Placeholder>
            ) : (
                <>
                    <Image src={data.image.url} alt={data.image.alt}/>
                    <Header as="h2">{data.preview_title.length > 0 ? data.preview_title[0].text : null}</Header>
                    {RichText.render(data.rich_text, linkResolver, htmlSerializer).props.children}
                </>
            )}
        </Popup>
    )
}