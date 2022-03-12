module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/face-detection-vue/'
    : '/',

  transpileDependencies: [
    'vuetify'
  ]
}
  
