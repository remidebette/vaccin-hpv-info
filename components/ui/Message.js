const variants = {
    default: 'bg-neutral-50 text-neutral-800 ring-neutral-200',
    info: 'bg-sky-50 text-sky-950 ring-sky-200',
    error: 'bg-red-50 text-red-950 ring-red-200',
    success: 'bg-emerald-50 text-emerald-950 ring-emerald-200',
}

// Boxed block of text: an answer, an advice or a notice.
export default function Message({variant = 'default', className = '', ...props}) {
    return <div className={`rounded-lg p-5 ring-1 ring-inset ${variants[variant]} ${className}`} {...props}/>
}
