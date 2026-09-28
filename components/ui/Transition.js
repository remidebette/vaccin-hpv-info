'use client'

import {cloneElement, useEffect, useState} from 'react'
import {cn} from './cn'

// Scales its only child in when `visible` becomes true, and out when it becomes false (then hides it,
// immediately when `animateOut` is false). The child is not rendered until it is shown for the first time.
export default function Transition({visible, duration = 500, animateOut = true, children}) {
    const [status, setStatus] = useState(visible ? 'shown' : 'unmounted')
    const [previousVisible, setPreviousVisible] = useState(visible)
    if (visible !== previousVisible) {
        setPreviousVisible(visible)
        setStatus(visible ? 'entering' : animateOut ? 'leaving' : 'hidden')
    }

    useEffect(() => {
        if (status !== 'entering' && status !== 'leaving') return
        const timer = setTimeout(() => setStatus(status === 'entering' ? 'shown' : 'hidden'), duration)
        return () => clearTimeout(timer)
    }, [status, duration])

    if (status === 'unmounted') return null

    const animation = {
        entering: `scale-in ${duration}ms ease both`,
        leaving: `scale-out ${duration}ms ease both`,
    }[status]

    return cloneElement(children, {
        className: cn(children.props.className, animation && 'block! visible! backface-hidden', status === 'hidden' && 'hidden'),
        style: {...children.props.style, animation},
    })
}
