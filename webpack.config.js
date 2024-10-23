import path from 'path';
 //path module of node framework
// HtmlWebpackPlugin = require('html-webpack-plugin'),
import HtmlWebpackPlugin from 'html-webpack-plugin';

config = {
    resolve: {
        fallback: { crypto: false },
    },
    output: {
        path: path.join(__dirname, '/dist'), //dist - distribution
        filename: 'bundle.js'
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
        port: 27016,
        historyApiFallback : true //localhost:9090/user
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser 
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /nodeModules/,
                use: {
                  loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource',
            }
        ]
    },
    plugins: [new HtmlWebpackPlugin({ template: './static/index.html' })] //localhost:9090 - loads this html
}

module.exports = config