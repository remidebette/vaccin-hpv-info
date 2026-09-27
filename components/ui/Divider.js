import {cn} from './cn'

// Horizontal rule; `hidden` keeps only its spacing, `section` doubles it.
export default function Divider({hidden, section, className}) {
    return (
        <div
            className={cn(
                'my-[1rem] h-0 leading-none text-[1rem] font-bold uppercase tracking-[.05em] text-[rgba(0,0,0,.85)] select-none',
                'border-y border-t-[rgba(34,36,38,.15)] border-b-[rgba(255,255,255,.1)]',
                hidden && 'border-transparent!',
                section && 'my-[2rem]',
                className,
            )}
        />
    )
}
