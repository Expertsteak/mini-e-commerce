import React, { useState } from "react";
import { useParams } from "react-router-dom";
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

        <div className="reset-header">
          <h1>Reset Password 🔐</h1>

          <p>
            Enter a new password for your account.
          </p>
        </div>

        <form onSubmit={handleReset} className="reset-form">

          <div className="reset-input-group">
            <label>New Password</label>

            <input
              type="password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="reset-btn">
            Reset Password
          </button>

        </form>

        {message && (
          <p className="reset-message">
            {message}
          </p>
        )}

      </div>

    </div>
  );
};

export default ResetPassword;