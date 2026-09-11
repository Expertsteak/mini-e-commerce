import { useNavigate } from "react-router-dom";
import "./ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  return (
  <div className="product-card">
    <img
      src={product.image}
      alt={product.name}
    />

    <div className="product-info">
      <h3>{product.name}</h3>

      <p className="category">
        {product.category}
      </p>

      <p className="price">
        ₹{product.price}
      </p>

      <button
        onClick={() =>
          navigate(`/products/${product._id}`)
        }
      >
        View Details
      </button>
    </div>
  </div>
);
}

export default ProductCard;