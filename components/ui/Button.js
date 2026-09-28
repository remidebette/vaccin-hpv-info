import {cn} from './cn'
import Icon from './Icon'

const base = cn(
    'inline-block min-h-[1em] mr-[1.5em] py-[.785715em] px-[1em] align-baseline rounded-[15px] outline-none border-none cursor-pointer select-none',
    'font-bebas text-[1rem] font-normal not-italic leading-[1em] text-center normal-case no-underline',
    'bg-[#e0e1e2] text-[rgba(0,0,0,.6)] shadow-[inset_0_0_0_1px_transparent,inset_0_0_0_0_rgba(34,36,38,.15)]',
    'transition-[opacity,background-color,color,box-shadow,background] duration-100 ease-[ease] [-webkit-tap-highlight-color:transparent]',
    'hover:bg-[#cacbcd] hover:text-[rgba(0,0,0,.8)] focus:bg-[#cacbcd] focus:text-[rgba(0,0,0,.8)] active:bg-[#babbbc] active:text-[rgba(0,0,0,.9)]',
    'disabled:cursor-default disabled:opacity-45! disabled:shadow-none! disabled:pointer-events-none!',
)

const colors = {
    grey: 'bg-grey text-white shadow-[inset_0_0_0_0_rgba(34,36,38,.15)] hover:bg-[#d9d9d9] hover:text-white focus:bg-[#bbbabb] focus:text-white active:bg-[#c0bfc0] active:text-white',
    positive: 'bg-green text-white shadow-[inset_0_0_0_0_rgba(34,36,38,.15)] hover:bg-[#4cad5e] hover:text-white focus:bg-[#43a656] focus:text-white active:bg-[#489757] active:text-white',
}

const sizes = {
    large: 'text-[1.4rem]',
    massive: 'text-[2.3rem]',
}

// Class names of a Semantic UI-style button. `labeled` leaves room on the left for a big icon (see LabeledIcon).
export function buttonClasses({color, size, compact, labeled, grouped, className} = {}) {
    return cn(
        base,
        colors[color],
        sizes[size],
        compact && 'py-[.4em] px-[.75em]',
        labeled && 'relative pl-[2em]! pr-[1em]!',
        grouped && 'flex-[1_0_auto] m-0 rounded-none first:rounded-l-[15px] last:rounded-r-[15px]',
        className,
    )
}

export default function Button({color, size, compact, grouped, className, ...props}) {
    return <button className={buttonClasses({color, size, compact, grouped, className})} {...props}/>
}

// Icon placed before the text of a button.
export function ButtonIcon({size, className, ...props}) {
    return (
        <Icon
            size={size}
            className={cn(
                'h-[.857143em] opacity-80 mr-[.428572em] ml-[-.214286em] transition-opacity duration-100',
                // Keeps the glyph on the text baseline despite the shorter box
                size !== 'large' && size !== 'big' && 'align-[calc(round(.875em,1px)-.857143em)]',
                className,
            )}
            {...props}
        />
    )
}

// Big icon on the left side of a `labeled` button.
export function LabeledIcon(props) {
    return (
        <Icon
            size="big"
            labeled
            className="absolute top-0 left-0 h-full w-[2.57143em] m-0 opacity-90 rounded-l-[inherit] shadow-[inset_-1px_0_0_0_transparent]"
            {...props}
        />
    )
}

// Buttons stuck together (pass `grouped` to each Button); separate them with <ButtonOr/>.
export function ButtonGroup({className, children}) {
    return <div className={cn('inline-flex flex-row text-[0px] align-baseline', className)}>{children}</div>
}

export function ButtonOr({text = 'ou', size}) {
    return (
        <div
            data-text={text}
            className={cn(
                'relative w-[.3em] h-[2.57143em] z-[3] text-[1rem]',
                sizes[size],
                'before:absolute before:top-1/2 before:left-1/2 before:content-[attr(data-text)] before:text-center before:rounded-[500rem]',
                'before:-mt-[.892858em] before:-ml-[.892858em] before:w-[1.78572em] before:h-[1.78572em] before:leading-[1.78572em]',
                'before:bg-white before:text-[rgba(0,0,0,.4)] before:not-italic before:font-bold before:shadow-[inset_0_0_0_1px_transparent]',
            )}
        />
    )
}
