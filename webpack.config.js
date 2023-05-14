const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const HtmlWebpackPlugin = require('html-webpack-plugin'); // проект маленький книгу я итак в класс загнала нечего особо шаблонизироваь
const path = require('node:path');

module.exports = {
    entry: path.resolve(__dirname, './src/index.js'),
    output: {
        path: path.resolve(__dirname, 'output'),
        filename: 'main.js'
    },
    
      // mode: 'development',
      mode: 'production',
      
    plugins: [
        new MiniCssExtractPlugin(),
        // new HtmlWebpackPlugin()
    ],
      module: {
        rules: [
          {
            test: /\.css$/i,
             use: [MiniCssExtractPlugin.loader, "css-loader"],
            // use: ["style-loader", "css-loader"],
          },
        ],
      },
      optimization: {
        minimizer: [
          // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
          `...`,
          new CssMinimizerPlugin(),
        ],
      },      
}