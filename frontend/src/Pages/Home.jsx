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

      {/* ================= HERO SECTION ================= */}

      <section className="hero">

        <div className="hero-content">

          <span className="hero-tag">
            ✦ PREMIUM ONLINE SHOPPING
          </span>

          <h1>
            Everything You Need.
            <span> All in One Place.</span>
          </h1>

          <p>
            Discover quality products, explore great deals,
            and enjoy a simple shopping experience with Mini Store.
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
              onClick={() => navigate("/products")}
            >
              Explore Products
            </button>

          </div>

          <div className="hero-stats">

            <div>
              <strong>100+</strong>
              <span>Products</span>
            </div>

            <div>
              <strong>10</strong>
              <span>Categories</span>
            </div>

            <div>
              <strong>24/7</strong>
              <span>Shopping</span>
            </div>

          </div>

        </div>

        {/* HERO VISUAL */}

        <div className="hero-visual">

          <div className="shopping-card">

            <div className="shopping-icon">
              🛍️
            </div>

            <div className="shopping-text">
              <span>MINI STORE</span>
              <strong>SHOP SMART</strong>
            </div>

          </div>

          <div className="floating-card card-one">

            <span>⚡</span>

            <div>
              <strong>Great Deals</strong>
              <small>Everyday</small>
            </div>

          </div>

          <div className="floating-card card-two">

            <span>🛒</span>

            <div>
              <strong>Easy Shopping</strong>
              <small>Quick & Simple</small>
            </div>

          </div>

          <div className="gold-dot dot-one"></div>
          <div className="gold-dot dot-two"></div>

        </div>

      </section>


      {/* ================= FEATURED PRODUCTS ================= */}

      <section className="products-section">

        <div className="section-heading">

          <div>
            <span className="section-label">
              OUR COLLECTION
            </span>

            <h2>Featured Products</h2>

            <p>
              Explore some of our latest and popular products.
            </p>
          </div>

          <button
            className="see-more-btn"
            onClick={() => navigate("/products")}
          >
            View All Products →
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

                <span className="product-badge">
                  {product.category}
                </span>

              </div>


              <div className="product-info">

                <h3>{product.name}</h3>

                <p className="product-description">
                  {product.description
                    ? product.description.length > 70
                      ? `${product.description.slice(0, 70)}...`
                      : product.description
                    : "Quality product at a great price."}
                </p>

                <div className="product-bottom">

                  <span className="product-price">
                    ₹{product.price}
                  </span>

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

            </div>

          ))}

        </div>


        {products.length === 0 && (
          <div className="no-products">
            <span>🛍️</span>
            <p>No products available yet.</p>
          </div>
        )}

      </section>


      {/* ================= WHY SHOP WITH US ================= */}

      <section className="features">

        <div className="section-title-center">

          <span className="section-label">
            WHY CHOOSE US
          </span>

          <h2>Why Shop With Us?</h2>

          <p>
            Everything you need for a simple and reliable
            shopping experience.
          </p>

        </div>


        <div className="feature-container">

          <div className="feature-card">

            <div className="feature-icon">
              🚚
            </div>

            <div className="feature-content">

              <h3>Fast Delivery</h3>

              <p>
                Get your orders delivered quickly and
                conveniently to your doorstep.
              </p>

            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              💰
            </div>

            <div className="feature-content">

              <h3>Best Prices</h3>

              <p>
                Discover quality products at affordable
                and competitive prices.
              </p>

            </div>

          </div>


          <div className="feature-card">

            <div className="feature-icon">
              🔒
            </div>

            <div className="feature-content">

              <h3>Secure Shopping</h3>

              <p>
                Shop confidently with secure accounts
                and protected shopping.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= FINAL CTA ================= */}

      <section className="home-cta">

        <div>

          <span className="cta-label">
            READY TO SHOP?
          </span>

          <h2>
            Find Something You’ll Love.
          </h2>

          <p>
            Browse our collection and discover your next
            favorite product.
          </p>

        </div>

        <button
          onClick={() => navigate("/products")}
        >
          Start Shopping →
        </button>

      </section>

    </div>
  );
}
export default Home;

