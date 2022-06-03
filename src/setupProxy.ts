import { createProxyMiddleware } from "http-proxy-middleware";

module.exports = (app: any) => {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://www.balldontlie.io/api/v1",
      changeOrigin: true,
      pathRewrite: {
        "^/api": "", // rewrite path
      },
    })
  );
};
