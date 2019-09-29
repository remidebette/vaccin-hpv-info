const withCSS = require('@zeit/next-css');
const withLess = require('@zeit/next-less')

const path = require('path');

module.exports = withCSS(withLess({
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
        config.resolve.alias['../../theme.config$'] = path.join(__dirname, "/semantic-ui/theme.config");
        config.resolve.alias['../semantic-ui/site'] = path.join(__dirname, "/semantic-ui/site");
        return config
    }
}))