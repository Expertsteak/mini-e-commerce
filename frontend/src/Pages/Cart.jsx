import { useEffect, useState } from "react";
import apiFetch from "../Services/apiFetch";
import "./Cart.css";

function Cart() {
  const [cart, setCart] = useState(null);

  const fetchCart = async () => {
    try {
      const response = await apiFetch("/cart");

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setCart(data);

    } catch (error) {
      console.log("Cart error:", error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);


  const handleRemove = async (productId) => {
    try {
      const response = await apiFetch(
        `/cart/${productId}`,
        {
          method: "DELETE"
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setCart(data.cart);

    } catch (error) {
      console.log("Remove error:", error);
    }
  };


  if (!cart) {
    return (
      <div className="cart-loading">
        <p>Loading your cart...</p>
      </div>
    );
  }


  const totalItems = cart.products.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const grandTotal = cart.products.reduce(
    (total, item) =>
      total + item.product.price * item.quantity,
    0
  );


  return (
    <div className="cart-page">

      {/* PAGE HEADER */}
      <div className="cart-header">
        <span>YOUR SHOPPING CART</span>
        <h1>My Cart 🛒</h1>
        <p>
          Review your selected products before checkout.
        </p>
      </div>


      {cart.products.length === 0 ? (

        /* EMPTY CART */
        <div className="empty-cart">

          <div className="empty-cart-icon">
            🛒
          </div>

          <h2>Your Cart is Empty</h2>

          <p>
            Looks like you haven't added anything to your
            cart yet.
          </p>

          <button
            className="continue-shopping-btn"
            onClick={() =>
              window.location.href = "/products"
            }
          >
            Continue Shopping →
          </button>

        </div>

      ) : (

        <div className="cart-layout">

          {/* CART ITEMS */}
          <div className="cart-items">

            {cart.products.map((item) => (

              <div
                className="cart-item"
                key={item.product._id}
              >

                <div className="cart-image">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                  />
                </div>


                <div className="cart-item-info">

                  <span className="cart-category">
                    {item.product.category}
                  </span>

                  <h3>
                    {item.product.name}
                  </h3>

                  <p>
                    Price: ₹{item.product.price}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <strong>
                    ₹{item.product.price * item.quantity}
                  </strong>

                </div>


                <button
                  className="remove-btn"
                  onClick={() =>
                    handleRemove(item.product._id)
                  }
                >
                  Remove
                </button>

              </div>

            ))}

          </div>


          {/* ORDER SUMMARY */}
          <div className="cart-summary">

            <span className="summary-label">
              ORDER SUMMARY
            </span>

            <h2>Order Summary</h2>

            <div className="summary-row">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{grandTotal}</span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Grand Total</span>
              <strong>₹{grandTotal}</strong>
            </div>

            <button className="checkout-btn">
              Proceed to Checkout →
            </button>

          </div>

        </div>

      )}
    </div>
  );
}

export default Cart;

