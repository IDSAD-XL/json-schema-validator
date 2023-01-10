const path = require('path')
module.exports = {
  mode: "development",
  entry: './src/index.tsx',
  devtool: "eval-source-map",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      { test: /\.scss$/, use: [
          { loader: "style-loader" },
          { loader: "css-modules-typescript-loader"},
          { loader: "css-loader", options: { modules: true } },
          { loader: "sass-loader" },
        ] },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.scss'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    hot: true
  },
}
