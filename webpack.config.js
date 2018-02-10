const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProd = process.env.NODE_ENV.trim() === "production";
const cssDev = [
    require.resolve('style-loader'), 
    require.resolve('css-loader'), 
    require.resolve('sass-loader')
];
const cssProd = ExtractTextPlugin.extract({
    fallback: {
        loader: require.resolve('style-loader'),
    },
    use: [
        {
            loader: require.resolve('css-loader'),
        },
        require.resolve('sass-loader'),
        
    ]
});
const cssBuild = isProd ? cssProd : cssDev;
module.exports = {
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
    },
    devServer: {
        contentBase: [path.join(__dirname, "public")],
        compress: true,
        hot: true,
        port: 9000
    },
    module:{
        rules: [
            {
                test: /\.(scss|css)/,
                use: cssBuild
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "bijux.css",
            disable: !isProd,
            allChunks: true
        }),
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin()
        
    ]
}