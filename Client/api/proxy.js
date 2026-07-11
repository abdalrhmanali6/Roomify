const url = require("url");
const http = require("http");
const https = require("https");

module.exports = (req, res) => {
  const backendUrl = process.env.BACKEND_URL || "https://roomify-backend.onrender.com";
  const parsedTarget = url.parse(backendUrl);

  const targetPath = req.url.replace(/^\/api/, "") || "/";

  const options = {
    protocol: parsedTarget.protocol,
    hostname: parsedTarget.hostname,
    port: parsedTarget.port,
    method: req.method,
    path: targetPath,
    headers: {
      ...req.headers,
      host: parsedTarget.hostname,
    },
  };

  const lib = parsedTarget.protocol === "https:" ? https : http;

  const proxyReq = lib.request(options, (proxyRes) => {
    res.statusCode = proxyRes.statusCode;
    Object.keys(proxyRes.headers).forEach((key) => {
      res.setHeader(key, proxyRes.headers[key]);
    });
    proxyRes.pipe(res);
  });

  proxyReq.on("error", (err) => {
    console.error("Vercel API Proxy Error:", err);
    res.statusCode = 500;
    res.end("Proxy Error: " + err.message);
  });

  req.pipe(proxyReq);
};
