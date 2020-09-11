const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api-t2.xin1.cn',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '/'
      }
    })
  )
}
