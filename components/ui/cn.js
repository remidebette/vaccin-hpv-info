import {extendTailwindMerge} from 'tailwind-merge'

// Joins class names, letting later Tailwind utilities override conflicting earlier ones.
// Font sizes are only used with arbitrary values here, which never set a line height: keep `leading-*`.
export const cn = extendTailwindMerge({
    override: {
        conflictingClassGroups: {
            'font-size': [],
        },
    },
})
