var path = require('path')

module.exports = {
    entry: "./src/index.tsx",
    output: {
        filename: "index.js",
        path: __dirname + "/dist/js"
    },
    // Enable sourcemaps for debugging webpack's output.
    devtool: "source-map",
    resolve: {
        // Add '.ts' and '.tsx' as resolvable extensions.
        extensions: [".ts", ".tsx", ".mjs", ".js", ".json"],
        modules: [
          path.resolve(__dirname + '/src'),
          path.resolve(__dirname + '/node_modules')
        ]
    },
    module: {
        rules: [
            // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
            { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader", exclude: [/node_modules/] },

            { test: /\.mjs$/, include: /node_modules/, type: "javascript/auto" }
        ]
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM",
        "react-router": "ReactRouter",
        "react-router-dom": "ReactRouterDOM"
    }
}
