import Cart from "../Models/Cart.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user.userId;

    let cart = await Cart.findOne({ user: userId });

    // User doesn't have a cart yet
    if (!cart) {
      cart = await Cart.create({
        user: userId,
        products: [
          {
            product: productId,
            quantity
          }
        ]
      });

      return res.status(201).json({
        message: "Product added to cart",
        cart
      });
    }

    // Check if product already exists in cart
    const existingProduct = cart.products.find(
      (item) => item.product.toString() === productId
    );

    if (existingProduct) {
      existingProduct.quantity += quantity;
    } else {
      cart.products.push({
        product: productId,
        quantity
      });
    }

    await cart.save();

    res.status(200).json({
      message: "Product added to cart",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to add product",
      error: error.message
    });
  }
};


// GET CART
export const getCart = async (req, res) => {
  try {
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user: userId })
      .populate("products.product");

    if (!cart) {
      return res.status(200).json({
        user: userId,
        products: []
      });
    }

    res.status(200).json(cart);

  } catch (error) {
    res.status(500).json({
      message: "Failed to get cart",
      error: error.message
    });
  }
};


// REMOVE FROM CART
export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    const cart = await Cart.findOne({ user: userId });

    if (!cart) {
      return res.status(404).json({
        message: "Cart not found"
      });
    }

    cart.products = cart.products.filter(
      (item) => item.product.toString() !== productId
    );

    await cart.save();

    res.status(200).json({
      message: "Product removed from cart",
      cart
    });

  } catch (error) {
    res.status(500).json({
      message: "Failed to remove product",
      error: error.message
    });
  }
};