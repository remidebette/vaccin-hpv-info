'use client'

import Link from 'next/link'
import Footer from '@/components/Footer'

export default function Error() {
    return (
        <>
            <title>Error!</title>
            <div className="flex flex-col justify-center items-center h-[42vw]">
                <h1>Error</h1>
                <h2>Please contact developer</h2>
                <p><Link href="/">Return to homepage</Link></p>
            </div>
            <Footer/>
        </>
    )
}
