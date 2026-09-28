import Image from 'next/image'
import Footer from '@/components/Footer'
import ContactForm from '@/components/ContactForm'
import Icon from '@/components/ui/Icon'
import {pageMetadata} from '@/utils/seo'
import benchekroun from '@/public/images/benchekroun.jpg'
import desmarecaux from '@/public/images/desmarecaux.jpg'
import dubois from '@/public/images/dubois.jpg'
import favre from '@/public/images/favre.jpg'

export const metadata = pageMetadata({
    pathname: '/a-propos',
    title: 'A propos de nous',
    description: 'Tout sur la vaccination anti-HPV. ' +
        'La création de ce site a été faite en collaboration entre trois internes de médecine générale ' +
        'et leur directeur de thèse.',
})

// `eager`: photo visible when the page opens on a large screen
const TeamCard = ({image, name, title, eager}) => (
    <figure className="overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-neutral-200">
        <Image src={image} alt={name} sizes="(min-width: 1024px) 16rem, (min-width: 640px) 50vw, 100vw"
               loading={eager ? 'eager' : 'lazy'} className="aspect-[4/5] w-full object-cover"/>
        <figcaption className="p-4">
            <p className="text-lg font-bold">{name}</p>
            <p className="text-neutral-600">{title}</p>
            <p className="mt-2 flex items-center gap-2 text-sm text-neutral-600">
                <Icon name="hospital"/>
                Faculté de médecine de Lille
            </p>
        </figcaption>
    </figure>
)

export default function APropos() {
    return (
        <>
            <main className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[16rem_minmax(0,1fr)_16rem]">
                <div className="lg:col-start-2 lg:row-start-1">
                    <h1 className="text-3xl font-bold">A propos de nous</h1>
                    <div className="mt-6 space-y-4">
                        <p>
                            La création de ce site a pour but de donner une information claire, précise et simple sur
                            la vaccination contre HPV. Sa création et son évaluation ont fait l&apos;objet d&apos;un
                            travail de thèse en médecine générale. Il a été créé en collaboration entre trois internes de
                            médecine générale et leur directeur de thèse.
                        </p>
                        <p>
                            Les références proviennent des recommandations nationales, de sociétés savantes ou
                            fédérations, de méta-analyses et d’articles disponibles dans les différents liens.
                        </p>
                        <p>
                            Vaccin-HPV-Info a été élaboré en collaboration par : BENCHEKROUN Mehdi, DESMARECAUX Céline,
                            DUBOIS Lucas et FAVRE Jonathan
                        </p>
                        <p>
                            Financement : Le projet est auto-financé. Le site n’accueille aucune forme de publicité.
                            Les auteurs n’ont pas de conflit d’intérêt.
                        </p>
                    </div>

                    <h2 className="mt-10 border-t border-neutral-200 pt-8 text-2xl font-bold">Contactez nous</h2>
                    <p className="mt-4">
                        Vous pouvez nous contacter directement par mail à{' '}
                        <a href="mailto:contact@vaccin-hpv-info.fr" className="link inline-flex items-center gap-1">
                            <Icon name="mail"/>contact@vaccin-hpv-info.fr
                        </a>{' '}
                        ou à l&apos;aide du formulaire ci-dessous qui ouvrira le client mail de votre appareil.
                    </p>
                    <ContactForm/>
                </div>

                <div className="grid content-start gap-6 sm:grid-cols-2 lg:col-start-1 lg:row-start-1 lg:grid-cols-1">
                    <TeamCard image={benchekroun} name="BENCHEKROUN Mehdi" title="Interne en médecine générale" eager/>
                    <TeamCard image={desmarecaux} name="DESMARECAUX Céline" title="Interne en médecine générale"/>
                </div>
                <div className="grid content-start gap-6 sm:grid-cols-2 lg:col-start-3 lg:row-start-1 lg:grid-cols-1">
                    <TeamCard image={favre} name="FAVRE Jonathan" title="Chef de clinique des universités" eager/>
                    <TeamCard image={dubois} name="DUBOIS Lucas" title="Interne en médecine générale"/>
                </div>
            </main>
            <Footer/>
        </>
    )
}
