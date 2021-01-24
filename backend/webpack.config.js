const path = require("path");
const slsw = require("serverless-webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const rootDir = path.resolve(__dirname, "../../..");

module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? "development" : "production",
  entry: slsw.lib.entries,
  devtool: "source-map",
  resolve: {
    extensions: [".js", ".mjs", ".json", ".ts"],
    symlinks: false,
    cacheWithContext: false,
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, "tsconfig.json"),
      }),
    ],
  },
  optimization: {
    minimizer: [new TerserPlugin({ terserOptions: { keep_classnames: true } })],
  },
  output: {
    libraryTarget: "commonjs",
    path: path.join(__dirname, ".webpack"),
    filename: "[name].js",
  },
  target: "node",
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: "ts-loader",
        exclude: [
          [
            {
              and: [path.resolve(rootDir, "node_modules")],
            },
            path.resolve(__dirname, ".serverless"),
            path.resolve(__dirname, ".webpack"),
          ],
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true,
          configFile: "tsconfig.build.json",
        },
      },
    ],
  },
  plugins: [],
};
