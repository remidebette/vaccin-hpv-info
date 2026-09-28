import {icons} from './icons'

// Font Awesome glyph as an inline SVG, sized and aligned like the text around it.
// `name` is one of the keys of ./icons.js (the menu icons are chosen in Prismic).
export default function Icon({name, className = ''}) {
    const icon = icons[name]
    if (!icon) {
        if (process.env.NODE_ENV !== 'production') console.warn(`Unknown icon "${name}": add it to components/ui/icons.js`)
        return null
    }
    return (
        <svg
            aria-hidden="true"
            viewBox={`0 0 ${icon.width} 512`}
            className={`h-[1em] w-auto shrink-0 align-[-0.125em] fill-current ${className}`}
        >
            <path d={icon.path}/>
        </svg>
    )
}
