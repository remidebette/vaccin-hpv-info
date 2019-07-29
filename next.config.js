const withCSS = require('@zeit/next-css');
const path = require('path');

module.exports = withCSS({
    target: 'serverless',
    webpack(config) {
        config.module.rules.push({
            test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 8192,
                    publicPath: '/_next/static/',
                    outputPath: 'static/',
                    name: '[name].[ext]'
                }
            }
        });
        config.resolve.modules.push(path.resolve('./'));
        return config
    }
})