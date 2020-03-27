const path = require('path');


module.exports = {
    entry: './src/KingCache.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader'
            }
        ]
    },
    resolve: {
        extensions: [ '.ts', '.js' ]
    },
    output: {
        path: path.join(__dirname, './dist/'),
        filename: 'kingcache.js',
        libraryTarget: 'umd'
    },
    mode: 'production',
    target: 'node'
}