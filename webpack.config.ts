import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const devMode = process.env.NODE_ENV !== 'production'

const config: webpack.Configuration = {
  mode: 'development',
  entry: {
    app: './src/app.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loaders: [{
          loader: 'awesome-typescript-loader',
          options: {
            transpileOnly: devMode
          }
        }
      ],
      exclude: [/\.(spec|e2e)\.ts$/],
    },
    {
      test: /\.html$/,
      loader: 'html-loader'
    },
    {
      test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico|cur)$/,
      loader: 'file-loader?name=assets/[name].[hash].[ext]'
    },
    {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
              use: [
                {
                  loader: 'css-loader',
                  options: {
                    modules: true,
                    sourceMap: true,
                    importLoaders: 2,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                  }
                },
                'sass-loader'
              ]
      })
    }
  ]
},
resolve: {
  extensions: [ '.tsx', '.ts', '.js' ]
},
plugins: [
  new webpack.HotModuleReplacementPlugin(),
  new ExtractTextPlugin({
    filename: 'styles.css',
    allChunks: true,
    disable: process.env.NODE_ENV !== 'production'
  }),
  new HtmlWebpackPlugin({
    template: path.join(__dirname, '/src/index.html'),
    filename: 'index.html'
  })
]
};

export default config;