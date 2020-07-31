const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env,argv) =>{
    const mode = argv.mode || 'development';
    const config={
    entry: ['@babel/polyfill', './src/js/index.js'],
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/bundle.js'
    },
    devServer: {
        
        contentBase: './dist'
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.html'
        })
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader'
            }
        }]
    },
    // devtool:'inline-source-map',
    devtool: mode === 'development' ? 'cheap-module-eval-source-map' : false
}
return config;
};