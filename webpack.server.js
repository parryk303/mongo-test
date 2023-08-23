const path = require("path");
const nodeExternals = require("webpack-node-externals");
const packageJSON = require("./package.json");
const alias = packageJSON["@alias"];
const additionalAliases = Object.keys(alias).reduce((acc, key) => {
  acc[key] = path.resolve(alias[key]);
  return acc;
}, {});

module.exports = {
  entry: "./src/index.js",
  target: "node",
	devtool: "source-map",
  externals: [nodeExternals()],
  output: {
    path: path.resolve("server-build"),
    filename: "index.js",
  },
	resolve: {
		alias: {
			...additionalAliases,
		}
	},
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
      },
    ],
  },
};
