module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    compress: true,
    host: '0.0.0.0',
    port: 8080,
    disableHostCheck: true
    // public: 'https://vli-xk3s4.ondigitalocean.app'
    // proxy: {
    //   '^/api': {
    //     target: 'http://host.docker.internal:8000',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
  }
}
