const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/index.js",
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html",
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        watchFiles: ["src/**/*.html"],
        compress: true,
    },
    output: {
        filename: "bundle.js",
        path: path.resolve(__dirname, "dist"),
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.scss$/i,
                exclude: /node_modules/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
        ],
    },
};
