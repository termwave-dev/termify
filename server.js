const express = require("express");
const path = require("path");
const app = express();
const PORT = process.env.PORT || 3000;
app.disable("x-powered-by");
app.use(express.static(path.join(__dirname, "public"), { extensions: ["html"] }));
app.get("/health", (_req, res) => res.json({ ok: true, app: "TermWave Spotify" }));
app.get("*", (_req, res) => res.sendFile(path.join(__dirname, "public", "index.html")));
app.listen(PORT, "0.0.0.0", () => console.log(`TermWave Spotify listening on ${PORT}`));
