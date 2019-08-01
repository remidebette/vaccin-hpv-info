import React from 'react'
import {RichText} from 'prismic-reactjs'
import {apiEndpoint, linkResolver} from 'prismic-configuration'
import {htmlSerializer} from 'utils/htmlSerializer'
import {Popup, Image, Header, Placeholder} from 'semantic-ui-react'
import Link from "next/link";
import {getPreview} from "../utils/api";
import Prismic from "prismic-javascript";
import {accessToken} from "../prismic-configuration";


const PopUp = (props) => {
    const [data, setData] = React.useState(null)


    return (
        <Popup
            trigger={props.children}
            onOpen={async () => {
                const API = await Prismic.getApi(apiEndpoint, {accessToken});
                setData(
                    await getPreview(props.uid, API).data
                )
            }}
            popperDependencies={[!!data]}

        >

            {data === null ? (
                <Placeholder style={{minWidth: '200px'}}>
                    <Placeholder.Header>
                        <Placeholder.Line/>
                        <Placeholder.Line/>
                    </Placeholder.Header>
                    <Placeholder.Paragraph>
                        <Placeholder.Line length='medium'/>
                        <Placeholder.Line length='short'/>
                    </Placeholder.Paragraph>
                </Placeholder>
            ) : (
                <>
                    <Image src={data.image.url} alt={data.image.alt}/>
                    <Header as="h2">{data.preview_title}</Header>
                    {RichText.render(data.rich_text, linkResolver, htmlSerializer).props.children}
                </>
            )}
        </Popup>
    )
}

export default PopUp