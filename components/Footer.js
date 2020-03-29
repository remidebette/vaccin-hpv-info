import React, {useState} from 'react'
import {Button, Container, Divider, Grid, Image, List} from 'semantic-ui-react'
import {css} from 'emotion'
import {index_style, source_style} from "../utils/css";
import Link from "next/link";
import logo from '../icons/logo-kit-medical-light.svg'

const text_style = css`
        /* border-top: 1px solid #DADADA; */
        /* padding: 2rem 0; */
        margin-top: 0.5em !important; 
        margin-bottom: 0.5em !important; 
        `

const logo_style = css`
        width: 660px;
        margin-top: 10px;
        `

const background_image = css`
        background-image: url("/static/images/bottom.png");
        background-position: top;
        background-size: 45%;
        background-repeat: no-repeat;
        `

const source_content = [
    <>
        Institut National du Cancer. Fiches repère - Papillomavirus et Cancer. 2018.
    </>,
    <>
        Haute Autorité de Santé. GARDASIL9_SYNTHESE. 2017.
    </>,
    <>
        Haute Autorité de Santé. Synthèse d’avis Cervarix Gardasil. 2012.
    </>,
    <>
        Haut Conseil de la Santé Publique. Place du vaccin Gardasil 9® dans la prévention des infections à
        papillomavirus humains. Rapport. &nbsp;
        <Link
            href="https://www.hcsp.fr/Explore.cgi/Telecharger?NomFichier=hcspr20170210_previnfecthpvplacegardasil9.pdf">
            <a target="_blank">
                [Internet]
            </a>
        </Link>.
        2017 [cited 2019 Nov 7].

    </>,
    <>
        Haut Conseil de la Santé Publique. Recommandations vaccinales contre les infections à papillomavirus humains
        chez les hommes. 2016.
    </>,
    <>
        Bouvard V, Baan R, Straif K, Grosse Y, Secretan B, Ghissassi FE et al. IARC monographs on the evaluation of
        carcinogenic risks to humans, volume 100 B, biological agents. International Agency for Research on Cancer,
        Weltgesundheitsorganisation, editors. IARC; 2012. 475 p.
    </>,
    <>
        Bouvard V, Baan R, Straif K, Grosse Y, Secretan B, Ghissassi FE et al. A review of human carcinogens--Part B:
        biological agents. CIRC. CIRC, editor. Lancet (London, England). 2009.
    </>,
    <>
        Hamers Françoise, Woronoff Anne-Sophie R français des registres de cancers F. Cancer du col de l’utérus en
        France : tendances de l’incidence et de la mortalité jusqu’en 2018. BEH - Santé Publique France &nbsp;
        <Link
            href="http://beh.santepubliquefrance.fr/beh/2019/22-23/2019_22-23_1.html">
            <a target="_blank">
                [Internet]
            </a>
        </Link>.
        2019 [cited 2019 Nov 6]
    </>,
    <>
        Haute Autorité de Santé. Cancer du col de l’utérus : une meilleure couverture vaccinale et un dépistage renforcé
        restent la priorité &nbsp;
        <Link
            href="https://www.has-sante.fr/jcms/c_2797450/fr/cancer-du-col-de-l-uterus-une-meilleure-couverture-vaccinale-et-un-depistage-renforce-restent-la-priorite">
            <a target="_blank">
                [Internet]
            </a>
        </Link>.
        2017 [cited 2019 Nov 4].

    </>,
    <>
        Institut de Recherche en Santé Publique. La vaccination contre le papillomavirus en France : Etat des lieux des
        connaissances et des actions d’amélioration de la couverture vaccinale dans le cadre de l’action 1.2.5 du Plan
        Cancer 2014-2019. 2017.
    </>,
    <>
        Simms KT, Steinberg J, Caruana M, Smith MA, Lew J Bin, Soerjomataram I, et al. Impact of scaled up human
        papillomavirus vaccination and cervical screening and the potential for global elimination of cervical cancer in
        181 countries, 2020–99: a modelling study. Lancet Oncol. 2019 Mar 1;20(3):394–407.
    </>,
    <>
        Cnamts/ANSM. Vaccins anti-HPV et risque de maladies autoimmunes : étude pharmacoépidémiologique. 2015.
    </>,
    <>
        European Medicines Agency E. Review concludes evidence does not support that HPV vaccines cause CRPS or POTS
        &nbsp;
        <Link
            href="https://ansm.sante.fr/S-informer/Points-d-information-Points-d-information/Le-PRAC-conclut-a-l-absence-de-lien-entre-la-vaccination-contre-le-HPV-et-la-survenue-de-syndrome-regional-douloureux-complexe-CRPS-et-le-syndrome-de-tachycardie-posturale-orthostatique-POTS-Point-d-Information">
            <a target="_blank">
                [Internet]
            </a>
        </Link>.
        2015 [cited 2019 Nov 7].
    </>,


    <>
        Solidarité Santé gouv. &nbsp;
        <Link
            href="https://solidarites-sante.gouv.fr/IMG/pdf/calendrier_vaccinal_mars_2019.pdf">
            <a target="_blank">
                « Calendrier vaccinal »
            </a>
        </Link> &nbsp; (Mars 2019)
    </>,
    <>
        Organisation Mondiale de la Santé. &nbsp;
        <Link
            href="https://www.who.int/fr/news-room/fact-sheets/detail/human-papillomavirus-(hpv)-and-cervical-cancer">
            <a target="_blank">
                « HPV et cancer cervical »
            </a>
        </Link>
    </>,
    <>
        Vaccination info service. &nbsp;
        <Link
            href="https://vaccination-info-service.fr/Les-maladies-et-leurs-vaccins/Infections-a-Papillomavirus-humains-HPV">
            <a target="_blank">
                « Infections à Papillomavirus humain »
            </a>
        </Link>
    </>,

    <>
        <Link
            href="https://lecrat.fr/">
            <a target="_blank">
                Le Centre de Référence sur les Agents Tératogènes
            </a>
        </Link>
    </>,
    <>
        Société de Colposcopie. &nbsp;
        <Link
            href="http://www.societe-colposcopie.com/sites/default/files/papillomavirus_les_gynecologues_font_la_guerre_aux_fausses_infos_sur_le_vaccin_contre_le_cancer_du_col_de_luterus.pdf">
            <a target="_blank">
                « Les gynécologues font la guerre aux fausses infos sur le vaccin contre le cancer du col de l'utérus. »
            </a>
        </Link>
    </>,

]

const SourceList = ({source_indexes}) => {
    return (<List as='ol' size="mini" relaxed>
        {source_indexes.map(i => (
            <List.Item as='li'>
                {source_content[i]}
            </List.Item>
        ))
        }
    </List>)
}

const Footer = ({source_indexes}) => {
    const [displaySources, setDisplaySources] = useState(false);

    return (<footer
        //className={menu_style}
    >
        <Container>
            <p
                className={index_style}
            >
                LA VACCINATION N’ÉLIMINE PAS TOTALEMENT LE RISQUE DE DÉVELOPPER UN CANCER ET NE
                DISPENSE DONC PAS DU DÉPISTAGE.
                <br/>
                PENSEZ À VOUS FAIRE DÉPISTER PAR FROTTIS À PARTIR DE 25 ANS ET PAR TEST-HPV À PARTIR DE 30 ANS.
                <br/>
                PARLEZ-EN À VOTRE MÉDECIN.
            </p>
        </Container>
        <div className={background_image}>
            <Container
                className={source_style}
            >
                <Grid>
                    <Grid.Row>
                        <Divider hidden/>
                        <Divider hidden/>
                        <Divider hidden/>
                    </Grid.Row>
                    <Grid.Column width={8}>
                        <Container fluid textAlign="right" text>

                            <p>Référencé par &nbsp;
                                <Link href="https://kitmedical.fr" passHref>
                                    <Image src={logo} inline size="small" target="_blank"/>
                                </Link>
                            </p>
                        </Container>
                    </Grid.Column>
                    <Grid.Column width={8}>

                        <Container text textAlign="left" fluid
                        >
                            {
                                source_indexes &&
                                <>
                                    <p onClick={() => setDisplaySources(!displaySources)}>Cliquer pour afficher plus de
                                        sources...</p>
                                    <Divider hidden/>
                                    {displaySources &&
                                    <SourceList source_indexes={source_indexes}/>
                                    }
                                </>
                            }

                        </Container>
                    </Grid.Column>
                    <Grid.Row>
                        <Divider hidden/>
                        <Divider hidden/>
                        <Divider hidden/>
                    </Grid.Row>
                </Grid>

            </Container>
        </div>

        {/*        <img
            src="/static/images/bottom.png"
            alt="Pink HPV bottom"
            className="footer-logo"
        />*/}
    </footer>)
}

export default Footer