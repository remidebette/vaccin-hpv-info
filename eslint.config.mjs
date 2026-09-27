import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

// ESLint stays on v9: the plugins of eslint-config-next do not support ESLint 10 yet.
const eslintConfig = [
    ...nextCoreWebVitals,
    {
        rules: {
            // Images come from Prismic or /public and are rendered as plain <img> to keep the original layout.
            '@next/next/no-img-element': 'off',
        },
    },
    {
        ignores: ['.next/**', 'node_modules/**'],
    },
]

export default eslintConfig
