const fs = require("fs");

module.exports = {
  publicPath: (function () {
    if (process.env.NODE_ENV === "production") return "/view/admin/";
    else if (process.env.NODE_ENV == "flutterkorea") return "/";
    else return "/";
  })(),
  outputDir: (function () {
    if (process.env.NODE_ENV === "production") {
      return "../../docker/home/centerx/view/admin";
    } else if (process.env.NODE_ENV == "flutterkorea") {
      return "../../docker/home/centerx/view/flutterkorea";
    } else return "/dist";
  })(),
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false,
    },
  },
};
