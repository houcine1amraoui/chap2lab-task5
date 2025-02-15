const express = require("express");
const https = require("https");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 443; // HTTPS default port

// Load SSL/TLS certificate and key
const options = {
  key: fs.readFileSync(path.join(__dirname, "server.key")),
  cert: fs.readFileSync(path.join(__dirname, "server.cert")),
};

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Simple route
app.get("/", (req, res) => {
  res.send("🔒 Secure HTTPS Server Running!");
});

// Start HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`🚀 HTTPS Server running at https://localhost:${PORT}`);
});

// const http = require('http');

// const HTTP_PORT = 3000;

// // Redirect HTTP to HTTPS
// http.createServer((req, res) => {
//     res.writeHead(301, { "Location": "https://" + req.headers.host + req.url });
//     res.end();
// }).listen(HTTP_PORT, () => {
//     console.log(`🌍 HTTP Server running at http://localhost:${HTTP_PORT} (Redirecting to HTTPS)`);
// });
