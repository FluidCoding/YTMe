module.exports = {
  context: __dirname + "/",
  entry: "./renderer.js",
  target: "electron",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ],
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/",
  }
  // node: {
  //   console: true,
  //   net: 'empty',
  //   tls: 'empty'
  // }
}
