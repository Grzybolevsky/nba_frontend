const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api-balldontlie/',
    createProxyMiddleware({
      target: 'https://www.balldontlie.io/api/v1',
      changeOrigin: true,
      pathRewrite: {
        '^/api-balldontlie': '' // rewrite path
      }
    })
  );

  app.use(
    '/api/',
    createProxyMiddleware({
      target: 'http://localhost:8080/api/',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '' // rewrite path
      }
    })
  );
};