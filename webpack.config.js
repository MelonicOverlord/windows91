const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: ["./src/index.js", "./src/api.js"],
    resolve: {
        alias: {
            jquery: "jquery/src/jquery",
        },
    },
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
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        library: "w91",
        libraryTarget: "umd",
        clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(sass|css|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    optimization: {
        runtimeChunk: "single",
        splitChunks: {
            chunks: "all",
        },
    },
};
