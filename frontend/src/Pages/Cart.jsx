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
    return <p>Loading cart...</p>;
  }

  return (
    <div className="cart-page">
      <h1>My Cart 🛒</h1>

      {cart.products.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty</h2>
          <p>Add some products to your cart.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">

            {cart.products.map((item) => (
              <div
                className="cart-item"
                key={item.product._id}
              >

                <img
                  src={item.product.image}
                  alt={item.product.name}
                />

                <div className="cart-item-info">

                  <h3>{item.product.name}</h3>

                  <p>
                    Category: {item.product.category}
                  </p>

                  <p>
                    Price: ₹{item.product.price}
                  </p>

                  <p>
                    Quantity: {item.quantity}
                  </p>

                  <strong>
                    Total: ₹{item.product.price * item.quantity}
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

          <div className="cart-summary">

            <h2>Order Summary</h2>

            <p>
              Total Items:{" "}
              {cart.products.reduce(
                (total, item) => total + item.quantity,
                0
              )}
            </p>

            <h2>
              Grand Total: ₹
              {cart.products.reduce(
                (total, item) =>
                  total +
                  item.product.price * item.quantity,
                0
              )}
            </h2>

            <button className="checkout-btn">
              Proceed to Checkout
            </button>

          </div>
        </>
      )}
    </div>
  );
}

export default Cart;

