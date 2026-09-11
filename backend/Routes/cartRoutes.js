import express from "express";
import { addToCart, getCart, removeFromCart } from "../Controllers/cartController.js";
import authMiddleware from "../Middleware/authMiddleware.js";

const router = express.Router();
router.post("/", authMiddleware, addToCart);
router.get("/", authMiddleware, getCart);
router.delete("/:productId", authMiddleware, removeFromCart);

export default router;