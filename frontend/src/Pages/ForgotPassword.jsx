import { useState } from "react";
import { Link } from "react-router-dom";
import API_URL from "../Services/api";
import "./ForgotPassword.css";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email })
        }
      );

      const data = await response.json();

      // if (!response.ok) {
      //   alert(data.message);
      //   return;
      // }
if (!response.ok) {
  alert(
    `${data.message}\n\n${data.error || "No additional error"}`
  );
  return;
}
      alert(data.message);

    } catch (error) {
      console.log("Forgot password error:", error);
    }
  };

  return (
    <div className="forgot-page">

      <div className="forgot-card">

        {/* Icon */}
        <div className="forgot-icon">
          🔐
        </div>

        {/* Header */}
        <div className="forgot-header">

          <span className="forgot-label">
            ACCOUNT RECOVERY
          </span>

          <h1>Forgot Password?</h1>

          <p>
            No worries. Enter your email address and
            we'll send you a link to reset your password.
          </p>

        </div>

        {/* Form */}
        <form
          className="forgot-form"
          onSubmit={handleForgotPassword}
        >

          <div className="forgot-input-group">

            <label>Email Address</label>

            <div className="forgot-input-wrapper">
              <span className="input-icon">✉</span>

              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

          </div>

          <button
            type="submit"
            className="forgot-btn"
          >
            Send Reset Link
            <span>→</span>
          </button>

        </form>

        {/* Back to Login */}
        <div className="back-login">
          <span>Remember your password?</span>

          <Link to="/login">
            Back to Login
          </Link>
        </div>

      </div>

    </div>
  );
}

export default ForgotPassword;