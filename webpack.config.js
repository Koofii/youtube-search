const path = require('path');

module.exports = {
    entry: './src/index.js',

    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/build'),

        publicPath: 'build'
    },

    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: "babel-loader" 
            }
        ]
    },

    resolve: {
        extensions: ['.js']
    },

    devServer: {
        port: 3000,
        contentBase: './public',
        compress: true,
        historyApiFallback: true
    }
};