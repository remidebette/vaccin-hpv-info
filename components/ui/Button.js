// Rounded button in one of the site's styles:
// - primary: the brand pink (actions)
// - choice: light grey, pink when `selected` (answers of the simulation)
export default function Button({variant = 'primary', selected, className = '', ...props}) {
    const colors = {
        primary: 'bg-brand text-white hover:bg-brand-dark',
        choice: selected
            ? 'bg-brand text-white'
            : 'bg-neutral-100 text-neutral-800 ring-1 ring-neutral-300 ring-inset hover:bg-neutral-200',
    }[variant]
    return (
        <button
            type="button"
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 font-heading text-xl tracking-wide transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand disabled:cursor-not-allowed disabled:opacity-40 ${colors} ${className}`}
            {...props}
        />
    )
}
