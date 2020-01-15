module.exports = {
    const path = require('path')
    const nodeExternals = require('webpack-node-externals')

    context: path.resolve(__dirname, 'server'),
    entry: ['./index.js'],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    target: 'node',
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|svg|ico)$/i,
                use: 'url-loader?limit=8192'
            }
        ]
    }
}