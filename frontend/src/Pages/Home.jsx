import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../Services/api";
import "./Home.css";

function Home() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="home">

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-content">

          <span className="hero-tag">
            ✨ Your Everyday Shopping Destination
          </span>

          <h1>
            Welcome to <span>Mini Store</span>
          </h1>

          <p>
            Discover amazing products, great prices,
            and a simple shopping experience.
          </p>

          <div className="hero-buttons">

            <button
              className="primary-btn"
              onClick={() => navigate("/products")}
            >
              Shop Now →
            </button>

            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

            <button
              className="signup-btn"
              onClick={() => navigate("/signup")}
            >
              Sign Up
            </button>

          </div>

        </div>
      </section>


      {/* FEATURED PRODUCTS */}
      <section className="products-section">

        <div className="section-heading">
          <div>
            <span className="section-label">OUR COLLECTION</span>
            <h2>Featured Products</h2>
            <p>Explore some of our latest products.</p>
          </div>

          <button
            className="see-more-btn"
            onClick={() => navigate("/products")}
          >
            See More →
          </button>
        </div>


        <div className="product-container">

          {products.slice(0, 4).map((product) => (

            <div
              className="product-card"
              key={product._id}
            >

              <div className="product-image">
                <img
                  src={product.image}
                  alt={product.name}
                />
              </div>

              <div className="product-info">

                <span className="product-category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <p className="product-price">
                  ₹{product.price}
                </p>

                <button
                  className="details-btn"
                  onClick={() =>
                    navigate(`/products/${product._id}`)
                  }
                >
                  View Details
                </button>

              </div>

            </div>

          ))}

        </div>

        {products.length === 0 && (
          <p className="no-products">
            No products available yet.
          </p>
        )}

      </section>


      {/* WHY SHOP WITH US */}
      <section className="features">

        <div className="section-title-center">
          <span className="section-label">WHY US</span>
          <h2>Why Shop With Us?</h2>
          <p>We make online shopping simple and reliable.</p>
        </div>

        <div className="feature-container">

          <div className="feature-card">
            <div className="feature-icon">🚚</div>
            <h3>Fast Delivery</h3>
            <p>
              Get your products delivered quickly
              and conveniently.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Best Prices</h3>
            <p>
              Quality products at affordable
              and competitive prices.
            </p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure Shopping</h3>
            <p>
              Your account and shopping experience
              are kept safe and secure.
            </p>
          </div>

        </div>

      </section>
 
    </div>
  );
}

export default Home;

