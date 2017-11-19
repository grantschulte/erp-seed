module.exports = (env) => {
  const path = require("path");
  const webpack = require("webpack");
  const config = require("./client/config/env")(env);

  const ExtractTextPlugin = require("extract-text-webpack-plugin");
  const CopyWebpackPlugin = require("copy-webpack-plugin");
  const UglifyWebpackPlugin = require("uglifyjs-webpack-plugin");
  const ImageminPlugin = require("imagemin-webpack-plugin").default

  const clientPath = path.join(__dirname, "client");
  const publicPath = path.join(__dirname, "public");

  return {
    entry: {
      "app": [
        path.join(clientPath, "scripts", "index.js")
      ]
    },

    output: {
      path: publicPath,
      filename: "scripts/[name].js",
      publicPath: "/"
    },

    module: {
      rules: [
        {
          test:/\.(s*)css$/,
          use: ExtractTextPlugin.extract({
            fallback: "style-loader",
            use: [
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1
                }
              },
              {
                loader: "postcss-loader?parser=postcss-scss",
                options: {
                  plugins: [
                    require("autoprefixer")(),
                    require("postcss-clean")()
                  ]
                }
              },
              "sass-loader"
            ]
          })
        },
        {
          test: /\.js$/,
          loader: "babel-loader",
          query: {
            presets: ["es2015"]
          }
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: "url-loader?limit=10000&mimetype=application/font-woff",
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: `file-loader?name=${publicPath}/fonts/[name].[ext]`
        },
        {
          test: /\.(ico|png|jpg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: `file-loader?name=${publicPath}/images/[name].[ext]`
        }
      ]
    },

    /*
     * Resolve module folders. This allows us to import files into
     * other files (in the client directory) without messy relative paths.
     */

    resolve: {
      modules: [
        "node_modules"
      ]
    },

  	plugins: [
      new webpack.DefinePlugin(config),
      new ExtractTextPlugin({
        filename: "styles/[name].css"
      }),
      new CopyWebpackPlugin([
        {
          from: `${clientPath}/images/**/*`,
          to: `${publicPath}/images`,
          flatten: true
        },
        {
          from: `${clientPath}/fonts/**/*`,
          to: `${publicPath}/fonts`,
          flatten: true
        }
      ]),
      new UglifyWebpackPlugin(),
      new ImageminPlugin({
        test: /\.(jpe?g|png|gif|svg)$/i
      })
  	],

    devtool: "source-map",

    stats: {
  		colors: true
  	},

    watch: (env !== "production")
  };
};
