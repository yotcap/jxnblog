module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  // chainWebpack: config => {
  //   config.module.rule('less').oneOf('vue-modules').use('less-loader').tap(options => {
  //     options.javascriptEnabled = true;
  //     return options;
  //   });
  //   config.module.rule('less').oneOf('vue').use('less-loader').tap(options => {
  //     options.javascriptEnabled = true;
  //     return options;
  //   });
  //   config.module.rule('less').oneOf('normal-modules').use('less-loader').tap(options => {
  //     options.javascriptEnabled = true;
  //     return options;
  //   });
  //   config.module.rule('less').oneOf('normal').use('less-loader').tap(options => {
  //     options.javascriptEnabled = true;
  //     return options;
  //   });
  // }
}
