import { useState } from "react";
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

      if (!response.ok) {
        alert(data.message);
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

        <div className="forgot-header">
          <h1>Forgot Password?</h1>

          <p>
            Enter your email address and we'll send you
            a link to reset your password.
          </p>
        </div>

        <form
          className="forgot-form"
          onSubmit={handleForgotPassword}
        >

          <div className="forgot-input-group">
            <label>Email Address</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="forgot-btn"
          >
            Send Reset Link
          </button>

        </form>

      </div>

    </div>
  );
}

export default ForgotPassword;