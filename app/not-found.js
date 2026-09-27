import Link from 'next/link'
import Footer from '@/components/Footer'

export const metadata = {
    title: 'Error!',
}

export default function NotFound() {
    return (
        <>
            <div className="flex flex-col justify-center items-center h-[42vw]">
                <h1>404 Error</h1>
                <h2>Document not found</h2>
                <p><Link href="/">Return to homepage</Link></p>
            </div>
            <Footer/>
        </>
    )
}
