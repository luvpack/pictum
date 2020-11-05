const path = require('path')

module.exports = {
    entry: './src/index.jsx',
    mode: 'development',
    output: {
        path: path.resolve(__dirname, 'public/assets/js'),
        filename: "pictum.bundle.js"
    },
   //  plugins: ['@babel/plugin-proposal-class-properties', '@babel/plugin-transform-react-jsx-development'],
    module: {
        rules: [
            {
                test: /\.m?js|jsx$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', {
                            plugins: [
                                '@babel/plugin-proposal-class-properties',
                                '@babel/plugin-transform-react-jsx-development',
                                '@babel/transform-runtime'
                            ],
                        }]
                    }
                }
            },
            {
                test: /\.css$/i,
                use: ['style-loader', 'css-loader']
            }
        ]
    }
}
