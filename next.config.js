const withLess = require('./next-less');
// Had to replicate the next-less module as it is broken since the latest Next version

const path = require('path');

module.exports = withLess({
    target: 'serverless',
    // reactStrictMode: true, // Currently, semantic-ui-react does not support React Strict Mode
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
})