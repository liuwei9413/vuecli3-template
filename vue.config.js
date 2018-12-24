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
        target: 'http://192.168.10.47:3000',
        changeOrigin: true,
        // ws: true,
      }
    },
    overlay: {
      warnings: true,
      errors: true
    }
  },
  productionSourceMap: false
}