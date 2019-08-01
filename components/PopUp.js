import React from 'react'
import {RichText} from 'prismic-reactjs'
import {linkResolver} from 'prismic-configuration'
import {htmlSerializer} from 'utils/htmlSerializer'
import {Popup, Image, Header} from 'semantic-ui-react'
import Link from "next/link";


const PopUp = (props) => {
    return (
        <Popup trigger={props.children}>
            <Image src='https://react.semantic-ui.com/images/movies/totoro-horizontal.jpg'/>
            <Header as="h2">My Neighbor Totoro</Header>
            <p>Two sisters move to the country with their father in order to be
                closer to their hospitalized mother, and discover the surrounding
                trees are inhabited by magical spirits.</p>

        </Popup>
    )
}

export default PopUp