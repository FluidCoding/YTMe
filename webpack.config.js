// module.exports = {
//   context: __dirname + "",
//   entry: "./renderer.js",
//   target: "electron",
//   resolve: {
//     extensions: ['', '.js','.css']
//   },
//   module: {
//     loaders: [
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loaders: ["babel-loader"],
//         query: {
//           presets: ['es2015', 'react'],
//           plugins: [
//               "transform-decorators-legacy",
//               "transform-object-rest-spread",
//               "syntax-class-properties",
//               "transform-class-properties"
//             ]
//           }
//       },
//       {
//         test: /\.json$/,
//         loader: 'json'
//       }
//     ]
//   },
//   output: {
//     filename: "bundle.js",
//     path: __dirname + "/",
//   }
// }
const webpack = require('webpack');

module.exports = {
  context: __dirname + "",
  entry: ".\\renderer.js",
  resolve: {
     extensions: ['', '.js','.css']
  },
  target: "electron",
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
  },
  output: {
    filename: "bundle.js",
    path: __dirname + "/",
  },
  plugins: [
    new webpack.IgnorePlugin(/vertx/)
  ]
}
