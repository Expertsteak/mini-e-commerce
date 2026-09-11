import Product from "../Models/Product.js";

// CREATE PRODUCT
export const createProduct = async (req, res) => {
  try {
    const { name, price, category, image, description } = req.body;

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
    res.status(500).json({
      message: "Failed to create product",
      error: error.message
    });
  }
};


// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    let filter = {};

    // Search by product name
    if (search) {
      filter.name = {
        $regex: search,
        $options: "i"
      };
    }

    // Filter by category
    if (category) {
      filter.category = category;
    }

    const products = await Product.find(filter);

    res.status(200).json(products);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get products",
      error: error.message
    });
  }
};


// GET SINGLE PRODUCT
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json(product);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get product",
      error: error.message
    });
  }
};


// UPDATE PRODUCT
export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
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
    res.status(500).json({
      message: "Failed to update product",
      error: error.message
    });
  }
};


// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found"
      });
    }

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message
    });
  }
};
