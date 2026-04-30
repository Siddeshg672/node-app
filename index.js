const express = require("express");
const mongoose = require("mongoose");

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || "mongodb://mongodb:27017/nodeapp";

mongoose
  .connect(MONGO_URL)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });

app.get("/", (req, res) => {
  res.send(`
    <h1>Node Docker App is Running Successfully</h1>
    <p>Express app is working on Docker.</p>
    <p>MongoDB URL: ${MONGO_URL}</p>
  `);
});

app.get("/health", (req, res) => {
  res.json({
    status: "UP",
    app: "node-docker-example",
    mongodb: mongoose.connection.readyState === 1 ? "connected" : "not connected",
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server running on port ${PORT}`);
});
