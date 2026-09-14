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

    <div className="visual-circle"></div>

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

