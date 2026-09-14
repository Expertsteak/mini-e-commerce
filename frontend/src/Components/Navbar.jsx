import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Navbar.css";

function Navbar() {
  const navigate = useNavigate();

  const [token, setToken] = useState(
    localStorage.getItem("accessToken")
  );

  const [role, setRole] = useState(
    localStorage.getItem("role")
  );

  const isAdmin = role === "admin";

  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem("accessToken"));
      setRole(localStorage.getItem("role"));
    };

    window.addEventListener(
      "storage",
      handleStorageChange
    );

    return () => {
      window.removeEventListener(
        "storage",
        handleStorageChange
      );
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("role");

    setToken(null);
    setRole(null);

    alert("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="logo">
        <span>Mini</span> Store 🛍️
      </Link>

      {/* Navigation */}
      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/products">
          Products
        </Link>

        {token && (
          <Link to="/cart" className="cart-link">
            🛒 Cart
          </Link>
        )}

        {isAdmin && (
          <Link to="/admin/products">
            Create Product
          </Link>
        )}

        {!token ? (
          <>
            <Link
              to="/login"
              className="login-link"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="signup-link"
            >
              Sign Up
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="logout-btn"
          >
            Logout
          </button>
        )}

      </div>
    </nav>
  );
}

export default Navbar;
