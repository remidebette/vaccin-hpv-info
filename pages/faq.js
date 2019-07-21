import React from 'react';
import Layout from 'components/MyLayout'
import { getMenu } from 'components/Header'
import Prismic from 'prismic-javascript'
import { apiEndpoint, accessToken } from 'prismic-configuration'
import { Dropdown, Message, Icon } from 'semantic-ui-react';
import Link from "next/link";

const Index = (props) => {

    return (
        <Layout menu={props.menu} pathname={props.pathname}>
            <h1>Foire aux Questions</h1>

            <Message>
                <Message.Header>Le vaccin anti-HPV augmente le risque de cancer</Message.Header>
                <p><Icon name="close" /> FAUX : Le vaccin n’augmente pas le risque de cancer, au contraire son but est de diminuer l’incidence
                    des cancers liés aux HPV. Des études récentes ont montré une diminution de la prévalence des cancers
                    liés à HPV dans les pays qui vaccinent.</p>
                <Link href="/page/informations-generales?section=recommendations">
                    <a target="_blank">
                        <Dropdown.Item>
                            Pour en savoir plus
                        </Dropdown.Item>
                    </a>
                </Link>
            </Message>

            <Message>
                <Message.Header>Le vaccin anti-HPV augmente le risque de maladie auto-immune et de sclérose en
                    plaques</Message.Header>
                <p><Icon name="close" /> FAUX : Une importante étude a été entreprise par l’agence nationale de sécurité du médicament avec
                    l’assurance maladie, afin d’étudier le lien entre la vaccination contre le papillomavirus et 14
                    maladies auto-immunes (dont la sclérose en plaques et le syndrome de Guillain Barré).<br />
                    Les résultats de cette grande étude sont rassurants et concordent avec des études menées dans
                    d’autres pays :<br />
                    Aucune différence pertinente n’a été relevée entre les groupes vaccinés (avec le vaccin
                    Quadrivalent et avec le vaccin bivalent) et les groupes non vaccinés, en ce qui concerne
                    l’apparition nouvelle d’une maladie auto-immune.<br />
                    Comme évoqué précédemment : Aucun lien de cause à effet n’a été démontré entre le vaccin contre le
                    papillomavirus et la survenue de maladies auto-immunes
                </p>
                <Link href="/page/effets_secondaires?section=auto_immunes">
                    <a target="_blank">
                        <Dropdown.Item>
                            Pour en savoir plus
                        </Dropdown.Item>
                    </a>
                </Link>
            </Message>

            <Message>
                <Message.Header>Le vaccin incite les jeunes filles à avoir des rapports sexuels plus
                    tôt</Message.Header>
                <p><Icon name="close" /> FAUX : Le vaccin anti-HPV étant particulièrement recommandé entre 11 et 14 ans, certains parents
                    redouteraient, que, se sentant protégées, leurs filles soient tentées d’avoir des rapports sexuels
                    précoces. Mais la réalité est toute autre, comme le révèle une étude publiée dans le Canadian
                    Médical Association Journal.</p>
                <Link href="/page/transmission?section=parents">
                    <a target="_blank">
                        <Dropdown.Item>
                            Pour en savoir plus
                        </Dropdown.Item>
                    </a>
                </Link>
            </Message>

            <Message>
                <Message.Header>La vaccination est un moyen de prévention suffisant</Message.Header>
                <p><Icon name="close" /> FAUX : Le vaccin anti-HPV ne dispense pas d’un suivi et d’un dépistage régulier, car la vaccination
                    ne protège pas contre tous les papillomavirus : elle vise les virus HPV les plus fréquents et les
                    plus agressifs, car responsables de 70% des cancers du col de l'utérus. Le dépistage permet
                    d’anticiper les 30% restants.<br />
                    Il est donc recommandé de réaliser un frottis tous les trois ans (après 2 frottis normaux réalisés à
                    1 an d’intervalle), entre 25 et 65 ans, que l’on soit vaccinée ou non.
                </p>
                <Link href="/page/informations-generales?section=introduction">
                    <a target="_blank">
                        <Dropdown.Item>
                            Pour en savoir plus
                        </Dropdown.Item>
                    </a>
                </Link>
            </Message>

            <Message>
                <Message.Header>Le papillomavirus se transmet sexuellement uniquement lors d’une
                    pénétration.</Message.Header>
                <p><Icon name="close" /> FAUX : La grande majorité des papillomavirus se transmet lors d’actes sexuels, pendant la pénétration
                    certes mais pas seulement. Ces virus se propagent d’organisme en organisme (voire au sein d'un seul
                    corps) par contact cutanéo-muqueux, c’est-à-dire par la peau et les muqueuses, qui s’établissent
                    lors des caresses ou de relation orale par exemple. Les préservatifs ne protègent pas à 100% des
                    papillomavirus.</p>
                <Link href="/page/transmission?section=infection">
                    <a target="_blank">
                        <Dropdown.Item>
                            Pour en savoir plus
                        </Dropdown.Item>
                    </a>
                </Link>
            </Message>

            <Message>
                <Message.Header>J’ai déjà eu des rapports sexuels, je ne peux donc plus être vaccinée</Message.Header>
                <p><Icon name="close" /> FAUX : Il est effectivement conseillé de réaliser la vaccination contre les virus HPV avant le début
                    de la vie sexuelle c’est-à-dire avant de rentrer en contact avec les virus. La vaccination sera
                    alors optimale.<br />
                    Mais la vaccination peut être réalisée même si vous avez déjà eu des rapports sexuels, avec un
                    rattrapage possible jusque 20 ans chez les filles et 26 ans chez les hommes ayant des relations
                    sexuelles avec les hommes.<br />
                    La vaccination sera alors moins efficace si vous avez déjà rencontré le virus lors d’un rapport,
                    avant de recevoir le vaccin.<br />
                    Si vous avez reçu une première dose et que par la suite vous avez des rapports sexuels avant la
                    seconde dose, il est quand même bien sur conseillé de poursuivre la vaccination.
                </p>
                <Link href="/page/transmission?section=rapports">
                    <a target="_blank">
                        <Dropdown.Item>
                            Pour en savoir plus
                        </Dropdown.Item>
                    </a>
                </Link>
            </Message>

            <Message>
                <Message.Header>Je ne peux pas avoir des rapports sexuels dans l’année qui suit ma
                    vaccination</Message.Header>
                <p><Icon name="close" /> FAUX : Le fait de se vacciner n’empêche pas d’avoir des rapports sexuels.</p>
                <Link href="/page/transmission?section=rapports">
                    <a target="_blank">
                        <Dropdown.Item>
                            Pour en savoir plus
                        </Dropdown.Item>
                    </a>
                </Link>
            </Message>
        </Layout>
    )
};


Index.getInitialProps = async function (context) {
    const { uid } = context.query
    const res = await getPage(uid)

    return { pathname: context.asPath, ...res }
}

const getPage = async (uid, req) => {
    const API = await Prismic.getApi(apiEndpoint, { req, accessToken })
    const res_menu = await getMenu(API)

    return {
        menu: res_menu
    }
}

export default Index