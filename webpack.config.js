const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    // modalita' sviluppo
    mode: 'development', 
    // file principale dell'app
    entry: './src/index.js',
    // conf del server di sviluppo
    devServer: {
        static: './dist', //serve i file da questa cartella
    },

    // dove viene salvato il file bundle finale
    output: {
        filename: 'main.js', 
        path: path.resolve(__dirname, 'dist'),
        clean: true,
    },

    // mappo i file sorgente per il debug nel browser
    devtool: 'inline-source-map',

    plugins: [
        new HtmlWebpackPlugin({
            title: 'Odin Todo App', 
            template: './src/index.html'
        })
    ]
}