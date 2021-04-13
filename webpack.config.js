const path = require('path');

module.exports = {

    mode: 'development',
    devtool: 'eval-souce-map',
    entry: './src/index.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
        publicPath: 'public'
    },
    reslove: {
        extensions: [ '.ts', '.js' ]
    },
    devServer: {
        contentBase: path.resolve(__dirname, 'public'),
        port: 3000,
        open: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [ 
                    path.resolve(__dirname, 'src')
                ]
            }
        ]
    }
};
