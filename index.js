const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { createProxyMiddleware } = require("http-proxy-middleware");

const PORT = process.env.PORT;

const BANANO_API = process.env.BANANO_API_URL || "https://api-beta.banano.cc/";

const app = express();

const corsOptions = {
  origin: "https://banano-export.vercel.app/",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

app.use(morgan("dev"));
app.use(cors(corsOptions));

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
