
const path = require('path');

module.exports = {
    devtool: 'eval-source-map',
    entry: __dirname + '/app/main.js',
    output: {
        path: __dirname + '/public',
        filename: 'bundle.js'
    },

    devServer: {
        contentBase: path.resolve(__dirname + '/public'),
        historyApiFallback: true,//不跳转
        inline: true//实时刷新
    }
};