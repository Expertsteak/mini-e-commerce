import express from "express";
import { createProduct,  getProducts, getProduct, updateProduct, deleteProduct } from "../Controllers/productController.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";
const router = express.Router();

// Public routes
router.get("/", getProducts);
router.get("/:id", getProduct);

// Admin-only routes
router.post("/",authMiddleware, adminMiddleware, createProduct);
router.put("/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete( "/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;