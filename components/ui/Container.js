import {cn} from './cn'

// Centered page column with Semantic UI's responsive widths. `text` narrows it to a 700px reading column.
export default function Container({as: Tag = 'div', text, fluid, justified, align, className, ...props}) {
    return (
        <Tag
            className={cn(
                'block max-w-full! max-tablet:w-auto! max-tablet:mx-[1em]! tablet:mx-auto!',
                fluid ? 'w-full' : 'tablet:w-[723px] computer:w-[933px] large:w-[1127px]',
                text && 'font-lato leading-normal max-w-[700px]! text-[1.14286rem]',
                justified && 'text-justify hyphens-auto',
                align === 'left' && 'text-left',
                align === 'right' && 'text-right',
                className,
            )}
            {...props}
        />
    )
}
