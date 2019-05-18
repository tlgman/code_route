const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');

module.exports = {
    entry: path.join(__dirname, 'src/main.js'),
    output: {
        path: path.resolve(__dirname, 'public/build'),
        filename: 'app.bundle.js'
    },

    devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000,
        overlay: true,
        after: function(app, server) {
            console.log('Start server on port ', server.options.port);
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ["@babel/preset-env"]
                    }
                }
            }
        ]
    },

    plugins: [
        new CopyWebpackPlugin([
            {
                from: path.resolve(__dirname, 'public/index.html'),
                to: path.resolve(__dirname, 'public/build')
            },
            {
              from: path.resolve(__dirname, 'assets', '**', '*'),
              to: path.resolve(__dirname, 'public/build')
            }
        ]),
        new webpack.DefinePlugin({
            'typeof CANVAS_RENDERER': JSON.stringify(true),
            'typeof WEBGL_RENDERER': JSON.stringify(true)
        })
    ]
};
