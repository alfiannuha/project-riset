module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
      ? '/face-detection-vue/'
      : '/',
    parallel: false,  // disable thread-loader, which is not compactible with this plugin
    configureWebpack: {
      plugins: [
        require('unplugin-vue2-script-setup/webpack')({ /* options */ }),
      ],
    },
  }
    