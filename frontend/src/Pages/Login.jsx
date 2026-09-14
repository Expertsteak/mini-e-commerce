import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../Services/api";
import { GoogleLogin } from "@react-oauth/google";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginAs, setLoginAs] = useState("user");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify({
          email,
          password,
          loginAs
        })
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("role", data.user.role);

      alert("Login successful!");

      if (data.user.role === "admin") {
        navigate("/admin/products");
      } else {
        navigate("/products");
      }

    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        {/* Header */}
        <div className="login-header">

          <div className="login-icon">
            🛍️
          </div>

          <span className="login-label">
            MINI STORE
          </span>

          <h1>Welcome Back</h1>

          <p>
            Login to your account and continue shopping.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="login-form"
        >

          {/* Login Type */}
          <div className="login-type">

            <p>Login as</p>

            <div className="login-type-options">

              <label
                className={
                  loginAs === "user"
                    ? "active"
                    : ""
                }
              >
                <input
                  type="radio"
                  name="loginAs"
                  value="user"
                  checked={loginAs === "user"}
                  onChange={(e) =>
                    setLoginAs(e.target.value)
                  }
                />

                <span>👤 User</span>
              </label>

              <label
                className={
                  loginAs === "admin"
                    ? "active"
                    : ""
                }
              >
                <input
                  type="radio"
                  name="loginAs"
                  value="admin"
                  checked={loginAs === "admin"}
                  onChange={(e) =>
                    setLoginAs(e.target.value)
                  }
                />

                <span>👑 Admin</span>
              </label>

            </div>
          </div>

          {/* Email */}
          <div className="input-group">

            <label>Email Address</label>

            <div className="input-wrapper">
              <span>✉</span>

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
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
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
              />
            </div>

          </div>

          {/* Forgot Password */}
          <div className="forgot-password">

            <button
              type="button"
              onClick={() =>
                navigate("/forgot-password")
              }
            >
              Forgot Password?
            </button>

          </div>

          {/* Login */}
          <button
            type="submit"
            className="login-btn"
          >
            Login as{" "}
            {loginAs === "admin"
              ? "Admin"
              : "User"}

            <span>→</span>
          </button>

        </form>

        {/* Divider */}
        <div className="divider">
          <span>OR CONTINUE WITH</span>
        </div>

        {/* Google Login */}
        <div className="google-login">

          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const response = await fetch(
                  `${API_URL}/auth/google`,
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json"
                    },
                    credentials: "include",
                    body: JSON.stringify({
                      credential:
                        credentialResponse.credential,
                      loginAs
                    })
                  }
                );

                const data = await response.json();

                if (!response.ok) {
                  alert(data.message);
                  return;
                }

                localStorage.setItem(
                  "accessToken",
                  data.accessToken
                );

                localStorage.setItem(
                  "role",
                  data.user.role
                );

                alert("Google login successful!");

                if (data.user.role === "admin") {
                  navigate("/admin/products");
                } else {
                  navigate("/products");
                }

              } catch (error) {
                console.log(
                  "Google login error:",
                  error
                );
              }
            }}

            onError={() => {
              console.log("Google Login Failed");
            }}
          />

        </div>

        {/* Signup */}
        <p className="signup-text">
          Don't have an account?{" "}

          <button
            onClick={() =>
              navigate("/signup")
            }
          >
            Sign Up
          </button>
        </p>

      </div>

    </div>
  );
}

export default Login;