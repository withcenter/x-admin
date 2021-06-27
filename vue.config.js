const fs = require("fs");

module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/view/admin/" : "/",
  // outputDir: "/Users/thruthesky/www/docker/home/centerx/view/x",
  outputDir: "../../docker/home/centerx/view/admin",

  // pluginOptions: {
  //   webpackBundleAnalyzer: {
  //     openAnalyzer: false,
  //   },
  // },

  // chainWebpack: (config) => {
  //   config.performance.maxEntrypointSize(800000).maxAssetSize(600000);
  // },
  // pwa: {
  //   name: "ClientX",
  //   themeColor: "#ffffff",
  //   msTileColor: "#000000",
  //   assetsVersion: 'abcd1234', //Date.now(),
  //   appleMobileWebAppCapable: "yes",
  //   appleMobileWebAppStatusBarStyle: "black",
  //   workboxOptions: {
  //     exclude: [/\.php$/],
  //   },
  // },

  // devServer: {
  //   disableHostCheck: true,
  //   host: "main.philov.com",
  //   port: 4430,
  //   http2: true,
  //   https: {
  //     key: fs.readFileSync("./tmp/ssl/philov.com/private.key"),
  //     cert: fs.readFileSync("./tmp/ssl/philov.com/cert-ca-bundle.crt"),
  //   },
  // },
};
