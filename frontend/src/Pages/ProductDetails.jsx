import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import apiFetch from "../Services/apiFetch";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const fetchProduct = async () => {
    try {
      const response = await apiFetch(`/products/${id}`);

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      setProduct(data);

    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      
      const token = localStorage.getItem("accessToken");

      if (!token) {
        alert("Please login first");
        return;
      }

      const response = await fetch(`${API_URL}/cart`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },

        body: JSON.stringify({
          productId: id,
          quantity: 1
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Product added to cart!");

    } catch (error) {
      console.log("Error:", error);
    }
  };

  if (!product) {
    return <p>Loading...</p>;
  }

  return (
    <div className="details-page">
     <button onClick={() => navigate(-1)} className="back-btn">
      ← Back
     </button>
      <div className="details-card">

        {/* Product Image */}
        <div className="details-image">
          <img
            src={product.image}
            alt={product.name}
          />
        </div>

        {/* Product Information */}
        <div className="details-info">

          <p className="details-category">
            {product.category}
          </p>

          <h1>{product.name}</h1>

          <h2>₹{product.price}</h2>

          <p className="details-description">
            {product.description}
          </p>

          <button
            className="cart-btn"
            onClick={handleAddToCart}
          >
            🛒 Add to Cart
          </button>

        </div>

      </div>

    </div>
  );
}

export default ProductDetails;