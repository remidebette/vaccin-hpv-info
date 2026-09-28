'use client'

import {useState} from 'react'
import {QRCodeCanvas} from 'qrcode.react'
import Container from '@/components/ui/Container'
import Divider from '@/components/ui/Divider'
import {cn} from '@/components/ui/cn'
import {CONSTANTS} from '@/utils/CONSTANTS'

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
        <a href="https://www.hcsp.fr/Explore.cgi/Telecharger?NomFichier=hcspr20170210_previnfecthpvplacegardasil9.pdf"
           rel="noopener" target="_blank">
            [Internet]
        </a>.
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
        <a href="http://beh.santepubliquefrance.fr/beh/2019/22-23/2019_22-23_1.html" rel="noopener" target="_blank">
            [Internet]
        </a>.
        2019 [cited 2019 Nov 6]
    </>,
    <>
        Haute Autorité de Santé. Cancer du col de l’utérus : une meilleure couverture vaccinale et un dépistage renforcé
        restent la priorité &nbsp;
        <a href="https://www.has-sante.fr/jcms/c_2797450/fr/cancer-du-col-de-l-uterus-une-meilleure-couverture-vaccinale-et-un-depistage-renforce-restent-la-priorite"
           rel="noopener" target="_blank">
            [Internet]
        </a>.
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
        <a href="https://ansm.sante.fr/S-informer/Points-d-information-Points-d-information/Le-PRAC-conclut-a-l-absence-de-lien-entre-la-vaccination-contre-le-HPV-et-la-survenue-de-syndrome-regional-douloureux-complexe-CRPS-et-le-syndrome-de-tachycardie-posturale-orthostatique-POTS-Point-d-Information"
           rel="noopener" target="_blank">
            [Internet]
        </a>.
        2015 [cited 2019 Nov 7].
    </>,


    <>
        Solidarité Santé gouv. &nbsp;
        <a href="https://solidarites-sante.gouv.fr/IMG/pdf/calendrier_vaccinal_mars_2019.pdf" rel="noopener"
           target="_blank">
            « Calendrier vaccinal »
        </a> &nbsp; (Mars 2019)
    </>,
    <>
        Organisation Mondiale de la Santé. &nbsp;
        <a href="https://www.who.int/fr/news-room/fact-sheets/detail/human-papillomavirus-(hpv)-and-cervical-cancer"
           rel="noopener" target="_blank">
            « HPV et cancer cervical »
        </a>
    </>,
    <>
        Vaccination info service. &nbsp;
        <a href="https://vaccination-info-service.fr/Les-maladies-et-leurs-vaccins/Infections-a-Papillomavirus-humains-HPV"
           rel="noopener" target="_blank">
            « Infections à Papillomavirus humain »
        </a>
    </>,

    <>
        <a href="https://lecrat.fr/" rel="noopener" target="_blank">
            Le Centre de Référence sur les Agents Tératogènes
        </a>
    </>,
    <>
        Société de Colposcopie. &nbsp;
        <a href="http://www.societe-colposcopie.com/sites/default/files/papillomavirus_les_gynecologues_font_la_guerre_aux_fausses_infos_sur_le_vaccin_contre_le_cancer_du_col_de_luterus.pdf"
           rel="noopener" target="_blank">
            « Les gynécologues font la guerre aux fausses infos sur le vaccin contre le cancer du col de l&apos;utérus. »
        </a>
    </>,

]

const SourceList = ({source_indexes}) => {
    return (
        <ol className="list-none ml-[1.25rem] my-[1em] p-0 first:mt-0 first:pt-0 last:mb-0 last:pb-0 text-[.785715em] [counter-reset:ordered]">
            {source_indexes.map(i => (
                <li
                    key={i}
                    className={cn(
                        'relative list-item list-none list-outside [table-layout:fixed] py-[.214286em] leading-[1.14286em]',
                        'first:pt-0 last:pb-0',
                        'before:absolute before:top-auto before:left-auto before:-ml-[1.25rem] before:select-none before:pointer-events-none',
                        'before:[counter-increment:ordered] before:content-[counters(ordered,".")_"_"] before:text-right before:align-middle',
                        'before:text-[rgba(0,0,0,.87)] before:opacity-80',
                    )}
                >
                    {source_content[i]}
                </li>
            ))}
        </ol>
    )
}

// Three stacked hidden dividers: vertical spacing rows of the footer grid.
const Spacer = () => (
    <div className="relative flex flex-wrap items-stretch justify-[inherit] py-[1rem] px-0 w-full!">
        <Divider hidden/>
        <Divider hidden/>
        <Divider hidden/>
    </div>
)

const column = 'relative inline-block w-1/2! p-[1rem] align-top'

export default function Footer({source_indexes}) {
    const [displaySources, setDisplaySources] = useState(false)
    const host = process.env.NEXT_PUBLIC_HOSTNAME || CONSTANTS.hostname

    return (
        <footer className="block font-[BebasNeue,sans-serif] text-[1.2em] text-center font-bold leading-[1.36] text-black">
            <Container>
                <p className="m-0 font-bebas text-[1.25em] not-italic text-center text-[#2d2d2d] leading-[1.15] tracking-[.46px]">
                    LA VACCINATION N’ÉLIMINE PAS TOTALEMENT LE RISQUE DE DÉVELOPPER UN CANCER ET NE
                    DISPENSE DONC PAS DU DÉPISTAGE.
                    <br/>
                    PENSEZ À VOUS FAIRE DÉPISTER PAR FROTTIS À PARTIR DE 25 ANS ET PAR TEST-HPV À PARTIR DE 30 ANS.
                    <br/>
                    PARLEZ-EN À VOTRE MÉDECIN.
                </p>
            </Container>
            <div className="bg-[url(/images/bottom.png)] bg-top bg-size-[45%] bg-no-repeat">
                <Container className="text-[.5em] not-italic text-[#d7d5d7]">
                    <div className="flex flex-wrap items-stretch p-0 -m-[1rem]">
                        <Spacer/>
                        <div className={column}>
                            <Container text fluid align="right">
                                <div className="leading-[1.4285em]">
                                    Référencé par &nbsp;
                                    <a href="https://kitmedical.fr" rel="noopener" target="_blank"
                                       className="relative inline-block align-middle max-w-full w-[150px] h-auto bg-transparent text-[.928572rem]">
                                        <img src="/images/logo-kit-medical-light.svg" alt="Kit Medical"
                                             className="inline-block max-w-full h-auto"/>
                                    </a>
                                    <Divider hidden/>

                                    Pour accéder à ce site par QR Code, par ici:
                                    <Divider hidden/>
                                    <QRCodeCanvas value={'https://' + host} boostLevel={false}/>
                                </div>
                            </Container>
                        </div>
                        <div className={column}>
                            <Container text fluid align="left">
                                {
                                    source_indexes &&
                                    <>
                                        <p className="mb-[.5em]" onClick={() => setDisplaySources(!displaySources)}>
                                            Cliquer pour afficher plus de sources...
                                        </p>
                                        <Divider hidden/>
                                        {displaySources &&
                                            <SourceList source_indexes={source_indexes}/>
                                        }
                                    </>
                                }
                            </Container>
                        </div>
                        <Spacer/>
                    </div>
                </Container>
            </div>
        </footer>
    )
}
