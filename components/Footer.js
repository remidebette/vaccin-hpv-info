import React, {useState} from 'react'
import {Button, Container, Divider, Grid, List} from 'semantic-ui-react'
import {css} from 'emotion'
import {index_style, source_style} from "../utils/css";
import Link from "next/link";

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

const Footer = () => {
    const [sources, setSources] = useState(false);

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
        <Grid className={background_image}>
            <Grid.Column width={8}/>
            <Grid.Column width={8}>

                <Divider hidden/>
                <Divider hidden/>
                <Divider hidden/>
                <Container
                    text
                    textAlign="left"
                    className={source_style}
                >
                    <p onClick={() => setSources(!sources)}>Afficher les sources</p>
                    <Divider hidden/>
                    { sources && <List as='ol' size="mini" relaxed>
                        <List.Item as='li'>
                            Heard I, Tondeur L, Arowas L, Falguières M, Demazoin MC. Distribution des papillomavirus
                            humains (HPV) dans des frottis effectués dans le cadre du dépistage organisé du cancer du
                            col de l’utérus en France.
                        </List.Item>
                        <List.Item as='li'>
                            Bull Epidémiol Hebd. 2014;(13-14-15):241-8. Prétet JL, Jacquart AC, Carcopino X, Charlot
                            JF, Bouhour D, Kantelip B, et al. Human papillomavirus genotype distribution in invasive
                            cervical cancers in France: EDITH study. Int J Cancer 2008; 122(2): 428-432. Disponible sur:
                            &nbsp;
                            <Link href="http://invs.santepubliquefrance.fr/beh/2014/13-14-15/2014_13-14-15_1.html">
                                <a target="_blank">
                                    INVS
                                </a>
                            </Link>
                        </List.Item>
                        <List.Item as='li'>
                            HCSP, Vaccination des garçons contre les infections à papillomavirus. Collection avis et
                            rapports ; Février 2016.
                        </List.Item>
                        <List.Item as='li'>
                            Abramowitz L, et al. Human papillomavirus genotype distribution in anal cancer in France:
                            the EDiTH V study. Int J Cancer. 2011; 129(2): 433-39.
                        </List.Item>
                        <List.Item as='li'>
                            D’Souza G, Kreimer AR, Viscidi R, et al. Case-control study of human papillomavirus and
                            oropharyngeal cancer. N Engl J Med 2007
                        </List.Item>
                        <List.Item as='li'>
                            Alemany L, Cubilla A, Halec G, et al. Role of HPV in penile carcinomas worldwide. N Engl J
                            Med 2007
                        </List.Item>
                        <List.Item as='li'>
                            Hartwig et al. Estimation of the overall burden of cancers, precancerous lesions, and
                            genital carts attributable to 9-valent HPV vaccine types in women and men in Europe;
                            Infectious Agents and Cancer Eur Urol (2017) 12:19
                        </List.Item>
                        <List.Item as='li'>
                            Shield KD, Micallef CM, Martel C de, Heard I, Megraud F, Plummer M, et al. New cancer cases
                            in France in 2015 attributable to infectious agents: a systematic review and meta-analysis.
                            Eur J Epidemiol. 6 déc 2017;1‑12.
                        </List.Item>
                        <List.Item as='li'>
                            Girard M, Denis F. Virologie et épidémiologie. Les vaccins des papillomavirus humains : leur
                            place dans la prévention du cancer du col utérin sous la direction de Pierre Bégé. Edition
                            médicales internationales. Lavoisier, 2009 (3-10)
                        </List.Item>
                        <List.Item as='li'>
                            Winer R.L, Hughes J.P, Feng Q, O’Reilly S, Kiviat N.B, Holmes K.K, et al. Condom use and the
                            risk of genital human Papillomavirus infection in young women. N Engl J Med 2006 ; 354;
                            2645-2654.
                        </List.Item>
                        <List.Item as='li'>
                            Gavillon N, Vervaet H, Derniaux E, Terrosi P, Graesslin O, Quereux C. How dit i contract
                            human Papillomavirus (HPV) ? Gynécologie Obstétrique et fertilité 38 (2010) 199-204.
                        </List.Item>
                        <List.Item as='li'>
                            Duport N. Données épidémiologiques sur le cancer du col de l’utérus. Etat des connaissances.
                            Actualisation 2008. InVS
                        </List.Item>
                        <List.Item as='li'>
                            HAS « Dépistage et prévention du cancer du col de l’utérus » (Juin 2013)
                        </List.Item>
                        <List.Item as='li'>
                            Les cancers en France en 2016. L’essentiel des faits et des chiffres, &nbsp;
                            <Link
                                href="http://www.e-cancer.fr/Actualites-et-evenements/Actualites/Les-cancers-en-France-en-2016-l-essentiel-des-faits-et-chiffres">
                                <a target="_blank">
                                    ouvrage collectif édité par l’INCA
                                </a>
                            </Link>
                        </List.Item>
                        <List.Item as='li'>
                            <Link href="http://www.e-cancer.fr">
                                <a target="_blank">
                                    e-Cancer
                                </a>
                            </Link>
                            &nbsp;
                            <Link href="http://www.cngof.fr">
                                <a target="_blank">
                                    CNGOF
                                </a>
                            </Link>
                        </List.Item>
                        <List.Item as='li'>
                            Noehr B, Depth of cervical cone removed by loop electrosurgical excision procedure and
                            subsequent risk of spontaneous preterm delivery. Obstet gynecol 2009;114(6):1232
                        </List.Item>
                        <List.Item as='li'>
                            Kyrgiou M, Obstetric outcomes after conservative treatment for intraepithelial or early
                            invasive cervical lesions: systematic review and meta-analysis. Lancet 2006;367(9509):489-98
                        </List.Item>
                        <List.Item as='li'>
                            Khalid S; The thickness and volume of LLETZ specimens can predict the relative risk of
                            pregnancy-related morbidity. BJOG 2012;119(6):685-91
                        </List.Item>
                    </List> }
                </Container>
            </Grid.Column>
        </Grid>
        {/*        <img
            src="/static/images/bottom.png"
            alt="Pink HPV bottom"
            className="footer-logo"
        />*/}
    </footer>)
}

export default Footer