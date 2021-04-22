module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    compress: true,
    host: '0.0.0.0'
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
