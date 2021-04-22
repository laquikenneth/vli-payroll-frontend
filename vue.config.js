module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    compress: true,
    allowedHosts: [
      '0.0.0.0',
      'https://vli-xk3s4.ondigitalocean.app',
      'https://payroll-api-xb7i8.ondigitalocean.app'
    ]
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
