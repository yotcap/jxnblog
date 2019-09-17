module.exports = {
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    proxy: {
      // '/xpi': {
      //   target: 'http://192.168.3.45:9090',
      //   changeOrigin: true,
      // },
      '/xpi': {
        target: 'http://localhost:9090',
        changeOrigin: true,
      },
    },
  }
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
