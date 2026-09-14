import { useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../Services/api";
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      alert("Signup successful!");

      console.log(data);

    } catch (error) {
      console.log("Signup error:", error);
    }
  };

  return (
    <div className="signup-page">

      <div className="signup-card">

        {/* Header */}
        <div className="signup-header">

          <div className="signup-icon">
            ✨
          </div>

          <span className="signup-label">
            MINI STORE
          </span>

          <h1>Create Your Account</h1>

          <p>
            Join Mini Store and start your shopping
            journey today.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleSignup}
          className="signup-form"
        >

          {/* Name */}
          <div className="input-group">

            <label>Full Name</label>

            <div className="input-wrapper">
              <span>👤</span>

              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Email */}
          <div className="input-group">

            <label>Email Address</label>

            <div className="input-wrapper">
              <span>✉</span>

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Password */}
          <div className="input-group">

            <label>Password</label>

            <div className="input-wrapper">
              <span>🔒</span>

              <input
                type="password"
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          {/* Button */}
          <button
            type="submit"
            className="signup-btn"
          >
            Create Account
            <span>→</span>
          </button>

        </form>

        {/* Login */}
        <p className="login-text">
          Already have an account?

          <Link to="/login">
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Signup;