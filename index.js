const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT;

const BANANO_API = "https://api-beta.banano.cc/";

const app = express();

app.use(morgan("dev"));
app.use(cors());

app.use(
  "/banano",
  createProxyMiddleware({
    target: BANANO_API,
    changeOrigin: true,
    pathRewrite: {
      "^/banano": "/",
    },
  })
);

app.listen(PORT, () => {
  console.log(`Starting Proxy at ${PORT}`);
});
