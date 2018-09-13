const path = require("path");

//import 'react-notifications/lib/notifications.css';

module.exports = {
  output: {
    path: path.resolve(__dirname, "static"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  }
};
