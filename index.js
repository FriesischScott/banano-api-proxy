const express = require("express");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const BANANO_API = "https://api-beta.banano.cc/";

const app = express();

app.use(morgan("dev"));

app.use(
  "/banano",
  createProxyMiddleware({
    target: BANANO_API,
    changeOrigin: true,
  })
);

app.listen(PORT, HOST, () => {
  console.log(`Starting Proxy at ${HOST}:${PORT}`);
});