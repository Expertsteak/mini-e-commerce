import "dotenv/config";
import express from "express";
import cors from "cors";
import connectDB from "./Config/db.js";

import authRoutes from "./Routes/authRoutes.js";
import productRoutes from "./Routes/productRoutes.js";
import cartRoutes from "./Routes/cartRoutes.js";

import authMiddleware from "./Middleware/authMiddleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);

connectDB();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    message: "This is protected data",
    user: req.user
  });
});

// const PORT = process.env.PORT || 7000;

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const PORT = process.env.PORT || 7000;

server.listen(PORT, "0.0.0.0", () => {
  console.log(`server listening on ${PORT} port`);
});