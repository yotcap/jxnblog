const prerenderSPAPlugin = require('prerender-spa-plugin');
const Renderer = prerenderSPAPlugin.PuppeteerRenderer;
const path = require('path');

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
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== 'production') return;
    return {
      plugins: [
        new prerenderSPAPlugin({
          staticDir: path.join(__dirname, '../dist'),
          // routes: ['blog', '/about'],
          // renderer: new Renderer({
          renderer: new prerenderSPAPlugin.PuppeteerRenderer({
            inject: {
              foo: 'bar'
            },
            headless: false,
            renderAfterDocumentEvent: 'render-event',
            renderAfterTime: 5000
          })
        }),
      ]
    }
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
