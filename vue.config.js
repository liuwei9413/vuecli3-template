module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  assetsDir: '',
  lintOnSave: process.env.NODE_ENV !== 'production',
  // css: {
  //   modules: true
  // },
  devServer: {
    proxy: {
      '/api': {
        target: '<url>',
        // ws: true,
        changeOrigin: true
      },
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  productionSourceMap: false
}