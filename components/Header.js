'use client'

import Link from 'next/link'
import {usePathname} from 'next/navigation'
import Container from '@/components/ui/Container'
import Icon from '@/components/ui/Icon'
import Popup from '@/components/ui/Popup'
import {cn} from '@/components/ui/cn'

const menu = 'flex max-tablet:flex-col min-h-[2em] font-bebas font-normal bg-pink'
const menuContainer = 'flex items-[inherit] [flex-direction:inherit] max-tablet:w-full! max-tablet:mx-0!'
const leftMenu = 'flex m-0 mr-auto! max-tablet:mr-0! max-tablet:flex-col'
const rightMenu = 'flex m-0 ml-auto! max-tablet:ml-0! max-tablet:flex-col'
const item = cn(
    'relative flex flex-none items-center align-middle leading-none normal-case no-underline font-normal select-none max-tablet:w-full!',
    'transition-[background,box-shadow,color] duration-100 ease-[ease] [-webkit-tap-highlight-color:transparent]',
)
const linkItem = 'cursor-pointer hover:bg-[rgba(0,0,0,.05)] hover:text-white active:bg-[rgba(255,255,255,.08)] active:text-white'
const primaryItem = cn(item, 'py-[.5em] px-[1.14286em] bg-transparent text-[rgba(255,255,255,.9)]')
const headerItem = cn(primaryItem, linkItem, 'm-0 font-bold')
const secondaryItem = cn(
    item, linkItem,
    'self-center my-0 mx-[.357143em] py-[.785715em] px-[.928572em] rounded-[.285715rem] shadow-none border-none',
    'bg-none text-[rgba(255,255,255,.7)]! hover:text-white! transition-[color]',
)
const activeItem = 'bg-[rgba(0,0,0,.1)]! hover:bg-[rgba(0,0,0,.1)]! text-white!'
const itemIcon = 'opacity-90 mr-[.357143em]'
const dropdownItem = cn(
    item, 'block py-[.9em] px-[1.14em] w-full bg-none text-[rgba(0,0,0,.87)] text-[1.5rem]',
    'hover:bg-[rgba(0,0,0,.03)] hover:text-[rgba(0,0,0,.95)] active:bg-[rgba(0,0,0,.03)] active:text-[rgba(0,0,0,.95)]',
    'first:rounded-t-[.285715rem] last:rounded-b-[.285715rem]',
)

// `links` are the pages of the Prismic menu: {uid, href, label, icon, sections: [{href, title}]}
export default function Header({links}) {
    const pathname = usePathname()
    const uid = pathname.startsWith('/page/') ? decodeURIComponent(pathname.slice('/page/'.length)) : undefined

    return (
        <div className="sticky top-0 z-[800]">
            <div className={cn(menu, 'text-[1.8rem]')}>
                <Container className={menuContainer}>
                    <div className={leftMenu}>
                        <Link href="/" className={headerItem}>
                            <Icon name="home" className={itemIcon}/>
                            <strong>VACCIN HPV INFO</strong>
                        </Link>
                    </div>

                    <div className={cn(primaryItem, 'mr-auto! max-tablet:mr-0! font-century text-[1.2rem] italic text-left')}>
                        TOUT CE QUE VOUS VOULEZ SAVOIR SUR LA VACCINATION ANTI-HPV
                    </div>

                    <div className={rightMenu}>
                        <Link href="/a-propos" className={headerItem}>
                            À PROPOS DE NOUS
                        </Link>
                    </div>
                </Container>
            </div>

            {pathname !== '/' &&
                <div className={cn(menu, 'text-[1.5rem] -mx-[.357143em]')}>
                    <Container className={menuContainer}>
                        <div className={leftMenu}>
                            {links.map(link => (
                                <Popup
                                    key={link.uid}
                                    placement="bottom-start"
                                    hoverable
                                    pinned
                                    hoverOnly
                                    className="w-max"
                                    trigger={
                                        <Link href={link.href} className={cn(secondaryItem, uid === link.uid && activeItem)}>
                                            {/* The span keeps the icon on the text line (inline layout, not flex items) */}
                                            <span><Icon name={link.icon}/>{link.label}</span>
                                        </Link>
                                    }
                                >
                                    <div className="block w-full rounded-[.285715rem] bg-white font-bebas font-normal shadow-[0_1px_2px_0_rgba(34,36,38,.15)]">
                                        {link.sections.map(section => (
                                            <Link key={section.href} href={section.href} className={dropdownItem}>
                                                {section.title}
                                            </Link>
                                        ))}
                                    </div>
                                </Popup>
                            ))}
                        </div>

                        <div className={rightMenu}>
                            <Link href="/et-vous" className={cn(secondaryItem, pathname === '/et-vous' && activeItem)}>
                                <Icon name="clipboard list" className={cn(itemIcon, pathname === '/et-vous' && 'opacity-100')}/>
                                Et vous? (Simulation)
                            </Link>
                            <Link href="/faq" className={cn(secondaryItem, pathname === '/faq' && activeItem)}>
                                <Icon name="doctor" className={cn(itemIcon, pathname === '/faq' && 'opacity-100')}/>
                                Idées reçues
                            </Link>
                        </div>
                    </Container>
                </div>
            }
        </div>
    )
}
