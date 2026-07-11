import url from "url";
import http from "http";
import https from "https";

export default (req, res) => {
  const backendUrl = process.env.BACKEND_URL || "https://roomifybackend-rho.vercel.app";
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
      "x-forwarded-host": req.headers.host,
      "x-forwarded-proto": req.headers["x-forwarded-proto"] || "https",
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
