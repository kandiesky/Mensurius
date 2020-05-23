module.exports = {
  runtimeCompiler: true,
  publicPath: "/public/",
  outputDir: "../public",
  indexPath: "index.php",
  productionSourceMap: false,
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].template = "public/index.php";
      return args;
    });
  }
};
