module.exports = {
  baseUrl: '/',
  outputDir: 'dist',
  assetsDir: '',
  lintOnSave: process.env.NODE_ENV !== 'production',
  // css: {
  //   modules: true
  // },
  devServer: {
    // host: '192.168.50.255', // 开发服务器监听的主机地址
    // port: '8081',
    proxy: {
      '/api': {
        // target: 'http://192.168.50.170:3000',
        target: 'https://innovation-manage-test.vechaindev.com',
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