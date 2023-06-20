const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.pexels.com',
      changeOrigin: true,
      pathRewrite: {
        '^/api': ''
      },
      headers: {
        'Authorization': 'vJZXoQSdIGFEHqC4ufZglpSUDZ9UtOIJJLvorxOA8C4OhhSDb8O82HNH'
      }
    })
  );
};
