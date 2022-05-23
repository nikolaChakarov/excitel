const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        '/countries',
        createProxyMiddleware({
            target: 'https://excitel-countries.azurewebsites.net',
            changeOrigin: true,
        })
    );
}