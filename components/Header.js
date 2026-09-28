'use client'

import {useState} from 'react'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import Icon from '@/components/ui/Icon'

const container = 'mx-auto w-full max-w-6xl px-4'
const itemClasses = 'flex items-center gap-2 rounded-md px-3 py-2 font-heading text-xl tracking-wide transition-colors hover:bg-black/15'

// `links` are the pages of the Prismic menu: {uid, href, label, icon, sections: [{href, title}]}
export default function Header({links}) {
    const pathname = usePathname()
    const uid = pathname.startsWith('/page/') ? decodeURIComponent(pathname.slice('/page/'.length)) : undefined

    // The mobile menu closes when navigating to another page
    const [menuOpen, setMenuOpen] = useState(false)
    const [menuPathname, setMenuPathname] = useState(pathname)
    if (pathname !== menuPathname) {
        setMenuPathname(pathname)
        setMenuOpen(false)
    }

    const items = [
        ...links.map(link => ({...link, active: link.uid === uid})),
        {href: '/et-vous', label: 'Et vous ? (simulation)', icon: 'clipboard list', active: pathname === '/et-vous'},
        {href: '/faq', label: 'Idées reçues', icon: 'doctor', active: pathname === '/faq'},
    ]

    return (
        <header className="sticky top-0 z-40 text-white shadow-md">
            <div className="bg-brand-dark">
                <div className={`${container} flex h-14 items-center gap-6`}>
                    <Link href="/" className="flex items-center gap-2 font-heading text-2xl tracking-wide">
                        <Icon name="home"/>
                        Vaccin HPV Info
                    </Link>
                    <p className="hidden flex-1 text-center italic lg:block">
                        Tout ce que vous voulez savoir sur la vaccination anti-HPV
                    </p>
                    <Link href="/a-propos" className="hidden font-heading text-2xl tracking-wide lg:block"
                          aria-current={pathname === '/a-propos' ? 'page' : undefined}>
                        À propos de nous
                    </Link>
                    <button
                        type="button"
                        className="-mr-2 ml-auto rounded-md p-2 text-2xl hover:bg-black/15 lg:hidden"
                        aria-expanded={menuOpen}
                        aria-controls="main-menu"
                        onClick={() => setMenuOpen(!menuOpen)}
                    >
                        <Icon name={menuOpen ? 'close' : 'bars'}/>
                        <span className="sr-only">Menu</span>
                    </button>
                </div>
            </div>

            <nav id="main-menu" aria-label="Menu principal" className={`bg-brand ${menuOpen ? '' : 'max-lg:hidden'}`}>
                <ul className={`${container} flex flex-col py-2 lg:flex-row lg:items-center lg:gap-1 lg:py-1`}>
                    {items.map(item => (
                        <li key={item.href} className={`group relative ${item.href === '/et-vous' ? 'lg:ml-auto' : ''}`}>
                            <Link
                                href={item.href}
                                aria-current={item.active ? 'page' : undefined}
                                className={`${itemClasses} ${item.active ? 'bg-black/20' : ''}`}
                            >
                                <Icon name={item.icon}/>
                                {item.label}
                            </Link>
                            {item.sections?.length > 0 &&
                                // Sections of the page, shown on hover or keyboard focus (large screens only)
                                <div className="invisible absolute top-full left-0 pt-1 opacity-0 transition-opacity group-focus-within:visible group-focus-within:opacity-100 group-hover:visible group-hover:opacity-100 max-lg:hidden">
                                    <ul className="w-max max-w-sm rounded-lg bg-white py-2 text-neutral-800 shadow-xl ring-1 ring-black/5">
                                        {item.sections.map(section => (
                                            <li key={section.href}>
                                                <Link href={section.href} className="block px-4 py-2 hover:bg-brand-50 hover:text-brand">
                                                    {section.title}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            }
                        </li>
                    ))}
                    <li className="lg:hidden">
                        <Link href="/a-propos" className={itemClasses} aria-current={pathname === '/a-propos' ? 'page' : undefined}>
                            À propos de nous
                        </Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}
