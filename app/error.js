'use client'

import Link from 'next/link'

export default function Error() {
    return (
        <main className="mx-auto flex min-h-[50vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
            <title>Erreur</title>
            <h1 className="text-3xl font-bold">Une erreur est survenue</h1>
            <p className="mt-4">Veuillez réessayer plus tard.</p>
            <Link href="/" className="link mt-6">Retour à l&apos;accueil</Link>
        </main>
    )
}
