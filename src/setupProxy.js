const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/v1",
    createProxyMiddleware({
      target: "https://openapi.naver.com",
      changeOrigin: true,
      onProxyReq: (proxyReq, req) => {
        proxyReq.setHeader(
          "X-Naver-Client-Id",
          process.env.REACT_APP_CLIENT_ID
        );
        proxyReq.setHeader(
          "X-Naver-Client-Secret",
          process.env.REACT_APP_CLIENT_SECRET
        );
      },
    })
  );
};
