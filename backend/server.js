require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const productRoutes = require("./routes/products");

const app = express();

connectDB();

const allowedOrigins = process.env.CLIENT_URL
  ? process.env.CLIENT_URL.split(",").map((o) => o.trim().replace(/\/+$/, ""))
  : null;

app.use(
  cors({
    origin: allowedOrigins
      ? (origin, callback) => {
          // Allow server-to-server / curl requests with no Origin header
          if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
          callback(new Error("Not allowed by CORS"));
        }
      : true,
  })
);
app.use(express.json());

app.use("/api/products", productRoutes);

app.get("/", (req, res) => {
  res.send("Product CRUD API is running...");
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});