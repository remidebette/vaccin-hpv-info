import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

// ESLint stays on v9: the plugins of eslint-config-next do not support ESLint 10 yet.
const eslintConfig = [
    ...nextCoreWebVitals,
    {
        rules: {
            // Photos and the logo go through next/image; small images from Prismic and SVGs stay plain <img>.
            '@next/next/no-img-element': 'off',
        },
    },
    {
        ignores: ['.next/**', 'node_modules/**'],
    },
]

export default eslintConfig
