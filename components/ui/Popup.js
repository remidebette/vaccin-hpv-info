'use client'

import {cloneElement, useState} from 'react'
import {
    arrow,
    autoUpdate,
    flip,
    FloatingArrow,
    FloatingPortal,
    offset,
    shift,
    useClick,
    useDismiss,
    useFloating,
    useFocus,
    useHover,
    useInteractions,
    useRole,
} from '@floating-ui/react'

// Pink bubble shown above `trigger` on hover, keyboard focus or tap.
export default function Popup({trigger, onOpen, children}) {
    const [open, setOpen] = useState(false)
    const [arrowElement, setArrowElement] = useState(null)
    const {refs: {setReference, setFloating}, floatingStyles, context} = useFloating({
        open,
        onOpenChange(isOpen) {
            setOpen(isOpen)
            if (isOpen) onOpen?.()
        },
        placement: 'top-start',
        middleware: [offset(10), flip(), shift({padding: 8}), arrow({element: arrowElement})],
        whileElementsMounted: autoUpdate,
    })
    const {getReferenceProps, getFloatingProps} = useInteractions([
        useHover(context, {delay: {open: 50, close: 100}}),
        useFocus(context),
        useClick(context),
        useDismiss(context),
        useRole(context),
    ])

    return (
        <>
            {cloneElement(trigger, {ref: setReference, ...getReferenceProps(trigger.props)})}
            {open && (
                <FloatingPortal>
                    <div
                        ref={setFloating}
                        style={floatingStyles}
                        className="z-50 w-72 max-w-[calc(100vw-1rem)] rounded-lg bg-brand-pastel p-4 text-plum shadow-xl"
                        {...getFloatingProps()}
                    >
                        <FloatingArrow ref={setArrowElement} context={context} className="fill-brand-pastel"/>
                        {children}
                    </div>
                </FloatingPortal>
            )}
        </>
    )
}
