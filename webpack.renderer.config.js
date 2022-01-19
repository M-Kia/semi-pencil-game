const rules = require("./webpack.rules");

rules.push(
  {
    test: /\.css$/,
    use: [{ loader: "style-loader" }, { loader: "css-loader" }],
  },
  {
    test: /\.(png|svg|jpg|jpeg|gif)$/i,
    type: "asset/resource",
  }
);

module.exports = {
  // Put your normal webpack config below here
  module: {
    rules,
  },
};