import { useState } from "react";
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

        <div className="signup-header">
          <h1>Create Your Account ✨</h1>
          <p>Join Mini Store and start shopping today</p>
        </div>

        <form onSubmit={handleSignup} className="signup-form">

          <div className="input-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              placeholder="Enter your name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email Address</label>

            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="signup-btn">
            Create Account
          </button>

        </form>

        <p className="login-text">
          Already have an account?
          <a href="/login"> Login</a>
        </p>

      </div>

    </div>
  );
}

export default Signup;