import {cn} from './cn'
import {icons} from './icons'

const sizes = {
    small: 'text-[.75em] leading-none',
    large: 'text-[1.5em] leading-none align-middle',
    big: 'text-[2em] leading-none align-middle',
}

// Inline SVG version of the Semantic UI icon font: same 1.18em × 1em box, glyph drawn on the text baseline.
// Like the font, the box sits `round(.875em)` above the baseline (browsers round font ascents to whole pixels)
// while the glyph itself is exactly .875em above it.
// `name` is the Semantic UI icon name (e.g. "clipboard list"), see ./icons.js for the available ones.
// `labeled` centers the glyph vertically in the left 65% of the box (icon of a labeled button).
export default function Icon({name, size, fitted, labeled, className}) {
    const icon = icons[name]
    if (!icon && process.env.NODE_ENV !== 'production') {
        console.warn(`Unknown icon "${name}": add its glyph to components/ui/icons.js`)
    }

    return (
        <i
            aria-hidden="true"
            className={cn(
                'inline-block w-[1.18em] h-[1em] mr-[.25rem] align-[calc(round(.875em,1px)-1em)] not-italic font-normal text-center backface-hidden',
                sizes[size],
                fitted && 'w-auto mr-0',
                className,
            )}
        >
            {icon && (
                <svg
                    viewBox={`0 0 ${icon.width} 512`}
                    className={labeled ? 'absolute top-1/2 -translate-y-1/2 h-[1em]' : 'block h-[1em] mx-auto mt-[calc(round(.875em,1px)-.875em)]'}
                    style={{
                        width: `${icon.width / 512}em`,
                        left: labeled ? `calc((65% - ${icon.width / 512}em) / 2)` : undefined,
                    }}
                    fill="currentColor"
                >
                    <path d={icon.path}/>
                </svg>
            )}
        </i>
    )
}
