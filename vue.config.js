const ManifestPlugin = require("webpack-manifest-plugin");
const nodeExternals = require("webpack-node-externals");
let outdir = process.env.SSR==='true' ? "distssr":"dist"

 let json ={
    // options...
    filenameHashing: false,
    outputDir:outdir,
    pages: {
        client: {
            entry: 'src/client_app.js',
            template: 'src/index.html',
            filename: 'index.html',
            title: 'Index Page'
        }
    },
    chainWebpack : webpackConfig => {
        webpackConfig.optimization.delete('splitChunks')
        if (!process.env.SSR) {
            webpackConfig.devServer.disableHostCheck(true);
            return;
        }
        else{
            console.log("ssr",process.env.SSR)
            webpackConfig
                .entry("server")
                .clear()
                .add("./src/server_app.js");

            webpackConfig.target("node");
            webpackConfig.output.libraryTarget("commonjs2");

            // webpackConfig
            //     .plugin("manifest")
            //     .use(new ManifestPlugin({ fileName: "ssr-manifest.json" }));

            webpackConfig.externals(nodeExternals({ allowlist: /\.(css|vue)$/ }));

            webpackConfig.optimization.splitChunks(false).minimize(false);

            webpackConfig.plugins.delete("hmr");
            webpackConfig.plugins.delete("preload");
            webpackConfig.plugins.delete("prefetch");
            webpackConfig.plugins.delete("progress");
            webpackConfig.plugins.delete("friendly-errors");
        }

         console.log(webpackConfig.toConfig())
    }
}

if (process.env.SSR) json.pages = {}

module.exports = json
