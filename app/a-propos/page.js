import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Container from '@/components/ui/Container'
import Divider from '@/components/ui/Divider'
import Icon from '@/components/ui/Icon'
import {pageMetadata} from '@/utils/seo'

export const metadata = pageMetadata({
    pathname: '/a-propos',
    title: 'A propos de nous',
    description: 'Tout sur la vaccination anti-HPV. ' +
        'La création de ce site a été faite en collaboration entre trois internes de médecine générale ' +
        'et leur directeur de thèse.',
})

const TeamCard = ({image, name, alt, title}) => (
    <div className="relative flex flex-col w-[290px] max-w-full min-h-0 my-[1em] first:mt-0 last:mb-0 p-0 bg-white border-none rounded-[.285715rem] shadow-[0_1px_3px_0_#d4d4d5,0_0_0_1px_#d4d4d5] transition-[box-shadow,transform] duration-100 ease-[ease]">
        <div className="relative block flex-none p-0 bg-[rgba(0,0,0,.05)] rounded-t-[.285715rem] border-t-0">
            <img src={image} alt={alt} className="block w-full h-auto rounded-[inherit] border-none"/>
        </div>
        <div className="grow m-0 p-[1em] border-t border-[rgba(34,36,38,.1)] bg-none text-[1em] shadow-none rounded-none">
            <div className="block font-lato text-[rgba(0,0,0,.85)] font-bold text-[1.28572em] -mt-[.21425em] leading-[1.28572em]">
                {name}
            </div>
            <div className="clear-both mt-[.5em] text-[rgba(0,0,0,.68)]">
                {title}
            </div>
        </div>
        <div className="grow-0 static max-w-full w-auto min-h-0 m-0 py-[.75em] px-[1em] border-t border-[rgba(0,0,0,.05)] rounded-b-[.285715rem] bg-none text-[rgba(0,0,0,.4)] shadow-none transition-[color] duration-100 ease-[ease]">
            <a className="cursor-pointer text-[rgba(0,0,0,.4)] transition-[color] duration-100 ease-[ease] hover:text-[#1e70bf]">
                <Icon name="hospital"/>
                Faculté de médecine de Lille
            </a>
        </div>
    </div>
)

const rail = 'absolute top-0 w-[300px] h-full text-[1rem]'

export default function APropos() {
    return (
        <>
            <div className="flex flex-wrap items-stretch justify-center p-0 -m-[1rem] text-center">
                <div className="relative inline-block w-1/3 p-[1rem] align-top text-left">
                    <Container justified className="pt-[2em] pb-[5em]">
                        <h1>A propos de nous</h1>

                        <Divider hidden/>

                        <div className="relative my-[1rem] last:mb-0 p-[1em] text-[1rem]">
                            <p>La création de ce site a pour but de donner une information claire, précise et simple sur
                                la
                                vaccination contre HPV.
                                Sa création et son évaluation ont fait l&apos;objet d&apos;un travail de thèse en médecine
                                général.
                                Il a été créé en collaboration entre trois internes de médecine générale et leur
                                directeur de
                                thèse.</p>

                            <p>
                                Les références proviennent des recommandations nationales, de sociétés savantes ou
                                fédérations, de
                                méta-analyses et d’articles disponibles dans les différents liens.
                            </p>
                            <p>
                                Vaccin-HPV-Info a été élaboré en collaboration par :
                                BENCHEKROUN Mehdi, DESMARECAUX Céline, DUBOIS Lucas et FAVRE Jonathan
                            </p>
                            <p>
                                Financement :
                                Le projet est auto-financé.
                                Le site n’accueille aucune forme de publicité.
                                Les auteurs n’ont pas de conflit d’intérêt.
                            </p>

                            <Divider/>

                            <h2>Contactez nous</h2>
                            <p>
                                Vous pouvez nous contacter directement par mail à &nbsp;
                                <a href="mailto:contact@vaccin-hpv-info.fr"><Icon fitted name="mail"/>contact@vaccin-hpv-info.fr</a>
                                &nbsp;ou à l&apos;aide du formulaire ci-dessous qui ouvrira le client mail de votre appareil.
                            </p>

                            <ContactForm/>

                            <div className={`${rail} right-full mr-[2rem] pr-[2rem]`}>
                                <TeamCard image="/images/benchekroun.jpg" alt="Benchekroun Mehdi"
                                          name="BENCHEKROUN Mehdi" title="Interne en médecine générale"/>
                                <TeamCard image="/images/desmarecaux.jpg" alt="Desmarecaux Celine"
                                          name="DESMARECAUX Céline" title="Interne en médecine générale"/>
                            </div>

                            <div className={`${rail} left-full ml-[2rem] pl-[2rem]`}>
                                <TeamCard image="/images/favre.jpg" alt="Favre Jonathan"
                                          name="FAVRE Jonathan" title="Chef de clinique des universités"/>
                                <TeamCard image="/images/dubois.jpg" alt="Dubois Lucas"
                                          name="DUBOIS Lucas" title="Interne en médecine générale"/>
                            </div>
                        </div>

                    </Container>
                </div>
            </div>
            <Footer/>
        </>
    )
}
