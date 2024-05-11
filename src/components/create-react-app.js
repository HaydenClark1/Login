const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://52.14.21.237:8082',
      changeOrigin: true,
      secure: false, // Allow self-signed certificate
    })
  );
};
