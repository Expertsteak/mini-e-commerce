import { useNavigate } from "react-router-dom";
import "./Footer.css";

function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-brand">
          <h2><span>Mini</span> Store 🛍️</h2>
          <p>
            Your simple and reliable destination
            for quality products at great prices.
          </p>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>

          <button onClick={() => navigate("/")}>
            Home
          </button>

          <button onClick={() => navigate("/products")}>
            Products
          </button>

          <button onClick={() => navigate("/login")}>
            Login
          </button>

          <button onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>

        <div className="footer-links">
          <h3>Customer</h3>

          <button onClick={() => navigate("/cart")}>
            My Cart
          </button>

          <button onClick={() => navigate("/products")}>
            Shop
          </button>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>

          <p>📧 support@ministore.com</p>
          <p>📞 +91 90000 00000</p>
          <p>📍 Hyderabad, India</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© 2026 Mini Store. All rights reserved.</p>
        <p>Built with ❤️ for a better shopping experience.</p>
      </div>

    </footer>
  );
}

export default Footer;