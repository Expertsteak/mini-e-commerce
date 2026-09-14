import express from "express";
import Product from "../Models/Product.js";
import authMiddleware from "../Middleware/authMiddleware.js";
import adminMiddleware from "../Middleware/adminMiddleware.js";

const router = express.Router();


// ==========================================
// IMPORT PRODUCTS FROM DUMMYJSON
// ==========================================

router.post("/import", async (req, res) => {
  try {
    const response = await fetch(
      "https://dummyjson.com/products?limit=100"
    );

    const data = await response.json();

    const products = data.products.map((product) => ({
      name: product.title,
      price: product.price,
      category: product.category,
      image: product.thumbnail,
      description: product.description
    }));

    const insertedProducts = await Product.insertMany(products);

    res.status(201).json({
      message: "Products imported successfully",
      count: insertedProducts.length,
      products: insertedProducts
    });

  } catch (error) {
    console.log("IMPORT PRODUCTS ERROR:", error);

    res.status(500).json({
      message: "Failed to import products",
      error: error.message
    });
  }
});


// ==========================================
// GET ALL PRODUCTS
// SEARCH + CATEGORY FILTER
// ==========================================

router.get("/", async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    if (search) {
      filter.name = {
        $regex: search,
        $options: "i"
      };
    }

    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);

    res.status(200).json(products);

  } catch (error) {
    console.log("GET PRODUCTS ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message
    });
  }
});


// ==========================================
// GET SINGLE PRODUCT
// ==========================================

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);

  } catch (error) {
    console.log("GET PRODUCT ERROR:", error);

    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message
    });
  }
});


// ==========================================
// CREATE PRODUCT - ADMIN ONLY
// ==========================================

router.post(
  "/",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const {
        name,
        price,
        category,
        image,
        description
      } = req.body;

      const product = await Product.create({
        name,
        price,
        category,
        image,
        description
      });

      res.status(201).json({
        message: "Product created successfully",
        product
      });

    } catch (error) {
      console.log("CREATE PRODUCT ERROR:", error);

      res.status(500).json({
        message: "Failed to create product",
        error: error.message
      });
    }
  }
);


// ==========================================
// UPDATE PRODUCT - ADMIN ONLY
// ==========================================

router.put(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      res.status(200).json({
        message: "Product updated successfully",
        product
      });

    } catch (error) {
      console.log("UPDATE PRODUCT ERROR:", error);

      res.status(500).json({
        message: "Failed to update product",
        error: error.message
      });
    }
  }
);


// ==========================================
// DELETE PRODUCT - ADMIN ONLY
// ==========================================

router.delete(
  "/:id",
  authMiddleware,
  adminMiddleware,
  async (req, res) => {
    try {
      const product = await Product.findByIdAndDelete(
        req.params.id
      );

      if (!product) {
        return res.status(404).json({
          message: "Product not found"
        });
      }

      res.status(200).json({
        message: "Product deleted successfully"
      });

    } catch (error) {
      console.log("DELETE PRODUCT ERROR:", error);

      res.status(500).json({
        message: "Failed to delete product",
        error: error.message
      });
    }
  }
);


export default router;