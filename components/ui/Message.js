import {cn} from './cn'

const variants = {
    info: 'bg-[#f8ffff] text-[#276f86] shadow-[inset_0_0_0_1px_#a9d5de,0_0_0_0_transparent]',
    error: 'bg-[#fff6f6] text-[#9f3a38] shadow-[inset_0_0_0_1px_#e0b4b4,0_0_0_0_transparent]',
}

// Boxed message; paragraphs inside are slightly faded like in Semantic UI.
export default function Message({variant, className, ...props}) {
    return (
        <div
            className={cn(
                'relative min-h-[1em] my-[1em] first:mt-0 last:mb-0 py-[1em] px-[1.5em] rounded-[.285715rem] text-[1em] leading-[1.4285em]',
                'bg-[#f8f8f9] text-[rgba(0,0,0,.87)] shadow-[inset_0_0_0_1px_rgba(34,36,38,.22),0_0_0_0_transparent]',
                'transition-[opacity,color,background,box-shadow] duration-100 ease-[ease]',
                '[&_p]:opacity-85 [&_p]:my-[.75em] [&_p:first-child]:mt-0 [&_p:last-child]:mb-0',
                '*:first:mt-0 *:last:mb-0',
                variants[variant],
                className,
            )}
            {...props}
        />
    )
}

export function MessageHeader({as: Tag = 'div', className, ...props}) {
    return (
        <Tag
            className={cn(
                'block font-lato font-bold -mt-[.142858em] mx-0 mb-0 text-[1.14286em] [&+p]:mt-[.25em]',
                className,
            )}
            {...props}
        />
    )
}
