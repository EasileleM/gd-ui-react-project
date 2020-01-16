const path = require('path')
const nodeExternals = require('webpack-node-externals')
module.exports = {

    context: path.resolve(__dirname, 'server'),
    entry: ['./server.js'],
    output: {
        path: path.join(__dirname, 'build-server'),
        filename: 'bundle-server.js'
    },
    target: 'node',
    node: { // has been added
        __filename: false,
        __dirname: false
    },
    externals: [nodeExternals()],
    module: {
        rules: [
            {
                test: /\.(jpe?g|png|gif|ico)$/i,
                use: {
                    loader: "file-loader",
                    options: {
                        name: "./static/media/[name].[hash].[ext]",
                    },
                },
            },
            {
                resolve: {
                    extensions: [".js", ".jsx"]
                },
                test: /\.(js|jsx)$/,
                use: 'babel-loader'
            },
            { //this rule will only be used for any vendors
                test: /\.css$/,
                loaders: ['css-loader', 'css-loader'],
                include: [/node_modules/]
            },
            {
                test: /\.(s[ac]ss)$/i,
                use: [
                    // Translates CSS into CommonJS
                    'css-loader',
                    // Compiles Sass to CSS
                    'sass-loader',
                ],
            },
            {
                test: /\.svg$/,
                use: ['@svgr/webpack','url-loader'],
            },
        ]
    },
}