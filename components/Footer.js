import {QRCodeSVG} from 'qrcode.react'
import {sources} from '@/components/sources'
import {CONSTANTS} from '@/utils/CONSTANTS'

// `source_indexes`: the references (see ./sources.js) the page relies on
export default function Footer({source_indexes}) {
    const host = process.env.NEXT_PUBLIC_HOSTNAME || CONSTANTS.hostname

    return (
        <footer className="mt-8 pb-12">
            <div className="mx-auto max-w-4xl px-4 pt-8 text-center">
                <p className="font-heading text-xl leading-snug tracking-wide text-neutral-800 sm:text-2xl">
                    La vaccination n’élimine pas totalement le risque de développer un cancer et ne dispense donc pas
                    du dépistage.
                    <br/>
                    Pensez à vous faire dépister par frottis à partir de 25 ans et par test-HPV à partir de 30 ans.
                    <br/>
                    Parlez-en à votre médecin.
                </p>
                <div aria-hidden="true" className="mx-auto mt-4 h-6 w-2/3 rounded-b-2xl border-x-4 border-b-4 border-brand-pastel"/>
            </div>

            {/* With sources, two columns separated by the stem of the bracket above */}
            <div className={`mx-auto grid max-w-4xl gap-8 px-4 pt-6 text-neutral-600 ${source_indexes ? 'md:grid-cols-2 md:gap-0 md:divide-x-4 md:divide-brand-pastel' : ''}`}>
                <div className={`flex flex-col items-center gap-3 ${source_indexes ? 'md:items-end md:pr-6 md:text-right' : ''}`}>
                    <p className="flex items-center gap-2">
                        Référencé par
                        <a href="https://kitmedical.fr" rel="noopener" target="_blank">
                            <img src="/images/logo-kit-medical-light.svg" alt="Kit Medical" className="h-6 w-auto"/>
                        </a>
                    </p>
                    {/* Scanning the page with a phone only makes sense on a computer */}
                    <div className={`hidden flex-col items-center gap-3 md:flex ${source_indexes ? 'md:items-end' : ''}`}>
                        <p>Pour accéder à ce site par QR Code :</p>
                        <QRCodeSVG value={'https://' + host} size={128} title="QR Code du site"/>
                    </div>
                </div>

                {source_indexes &&
                    <details className="text-center md:pl-6 md:text-left">
                        <summary className="cursor-pointer font-bold hover:text-brand">Voir les sources</summary>
                        <ol className="mt-3 list-decimal space-y-2 pl-5 text-left text-sm">
                            {source_indexes.map(i => <li key={i}>{sources[i]}</li>)}
                        </ol>
                    </details>
                }
            </div>
        </footer>
    )
}
