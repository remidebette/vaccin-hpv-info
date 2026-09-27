'use client'

import {cloneElement, useState} from 'react'
import {
    autoUpdate,
    flip,
    FloatingPortal,
    offset,
    safePolygon,
    useClick,
    useDismiss,
    useFloating,
    useHover,
    useInteractions,
} from '@floating-ui/react'
import {cn} from './cn'

const floatingHeight = {name: 'floatingHeight', fn: ({rects}) => ({data: {height: rects.floating.height}})}

const arrow = {
    top: 'before:bottom-[-.307143em] before:left-[1em]',
    bottom: 'before:top-[-.307143em] before:left-[1em]',
}

// Popup anchored to `trigger`, opened on hover (and on click unless `hoverOnly`), rendered in a portal.
// `hoverable` keeps it open while the pointer moves into it; `pinned` never flips it to the other side.
// `inverted` gives the pink popup with an arrow, otherwise it is a plain white box.
export default function Popup({trigger, children, placement = 'top-start', hoverable, pinned, hoverOnly, inverted, onOpen, className}) {
    const [open, setOpen] = useState(false)
    const {refs: {setReference, setFloating}, x, y, strategy, middlewareData, context, placement: actualPlacement} = useFloating({
        open,
        onOpenChange(isOpen) {
            setOpen(isOpen)
            if (isOpen && onOpen) onOpen()
        },
        placement,
        middleware: [offset(10), !pinned && flip(), floatingHeight],
        whileElementsMounted: autoUpdate,
    })
    // Positioned like Semantic UI's Popper setup: the edge facing the trigger is snapped to the pixel grid
    // (a popup above its trigger grows upwards) and only whole pixels go through the transform, which
    // keeps the same text rendering.
    const height = middlewareData.floatingHeight?.height ?? 0
    const top = actualPlacement.startsWith('top') ? Math.round(y + height) - height : Math.round(y)
    const floatingStyles = {position: strategy, left: 0, top, transform: `translateX(${Math.round(x)}px)`}
    const {getReferenceProps, getFloatingProps} = useInteractions([
        useHover(context, {delay: {open: 50, close: 70}, handleClose: hoverable ? safePolygon() : null}),
        useClick(context, {enabled: !hoverOnly}),
        useDismiss(context),
    ])

    return (
        <>
            {cloneElement(trigger, {ref: setReference, ...getReferenceProps(trigger.props)})}
            {open && (
                <FloatingPortal>
                    <div ref={setFloating} style={floatingStyles} className="z-[1900] flex" {...getFloatingProps()}>
                        {/* Own compositing layer, like Semantic UI popups (same text rendering) */}
                        <div
                            className={cn(
                                'min-w-min text-[1rem] leading-[1.4285em] font-normal not-italic rounded-[.285715rem] [transform:translateZ(0)] backface-hidden',
                                inverted
                                    ? cn(
                                        'max-w-[250px] py-[.833em] px-[1em] bg-pink text-white',
                                        'before:absolute before:z-[2] before:w-[.714286em] before:h-[.714286em] before:rotate-45 before:bg-pink',
                                        arrow[actualPlacement.split('-')[0]],
                                    )
                                    : 'bg-white text-[rgba(0,0,0,.87)] border border-[#d4d4d5] shadow-[0_2px_4px_0_rgba(34,36,38,.12),0_2px_10px_0_rgba(34,36,38,.15)]',
                                className,
                            )}
                        >
                            {children}
                        </div>
                    </div>
                </FloatingPortal>
            )}
        </>
    )
}
