const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const authRoutes = require("./routes/authRoutes");
const authMiddleware = require("./middleware/authMiddleware");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

const PORT = process.env.PORT || 5050;

app.get("/", (req, res) => {
  res.send("CareerForge AI Backend is running!");
});

const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();