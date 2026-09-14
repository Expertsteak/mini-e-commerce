import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./ResetPassword.css";
import API_URL from "../Services/api";

const ResetPassword = () => {
  const { token } = useParams();

  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${API_URL}/auth/reset-password/${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ password })
        }
      );

      const data = await response.json();

      setMessage(data.message);

    } catch (error) {
      console.log(error);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="reset-page">

      <div className="reset-card">

        {/* Icon */}
        <div className="reset-icon">
          🔑
        </div>

        {/* Header */}
        <div className="reset-header">

          <span className="reset-label">
            ACCOUNT RECOVERY
          </span>

          <h1>Reset Password</h1>

          <p>
            Create a new password for your account
            and get back to shopping.
          </p>

        </div>

        {/* Form */}
        <form
          onSubmit={handleReset}
          className="reset-form"
        >

          <div className="reset-input-group">

            <label>New Password</label>

            <div className="reset-input-wrapper">

              <span className="reset-input-icon">
                🔒
              </span>

              <input
                type="password"
                placeholder="Enter your new password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />

            </div>

          </div>

          <button
            type="submit"
            className="reset-btn"
          >
            Reset Password
            <span>→</span>
          </button>

        </form>

        {/* Message */}
        {message && (
          <p className="reset-message">
            {message}
          </p>
        )}

        {/* Login */}
        <div className="reset-login">

          <span>Remember your password?</span>

          <Link to="/login">
            Back to Login
          </Link>

        </div>

      </div>

    </div>
  );
};

export default ResetPassword;