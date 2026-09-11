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
      localStorage.setItem("refreshToken", data.refreshToken);
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

        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Login to continue shopping</p>
        </div>

        <form onSubmit={handleLogin} className="login-form">

          {/* Login Type */}
          <div className="login-type">
            <p>Login as</p>

            <div className="login-type-options">

              <label>
                <input
                  type="radio"
                  name="loginAs"
                  value="user"
                  checked={loginAs === "user"}
                  onChange={(e) => setLoginAs(e.target.value)}
                />
                <span>👤 User</span>
              </label>

              <label>
                <input
                  type="radio"
                  name="loginAs"
                  value="admin"
                  checked={loginAs === "admin"}
                  onChange={(e) => setLoginAs(e.target.value)}
                />
                <span>👑 Admin</span>
              </label>

            </div>
          </div>

          {/* Email */}
          <div className="input-group">
            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            <button
              type="button"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </button>
          </div>

          <button type="submit" className="login-btn">
            Login as {loginAs === "admin" ? "Admin" : "User"}
          </button>

        </form>

        <div className="divider">
          <span>OR</span>
        </div>

        {/* Google Login */}
        <div className="google-login">
          <GoogleLogin
            onSuccess={async (credentialResponse) => {
              try {
                const response = await fetch(`${API_URL}/auth/google`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                    credential: credentialResponse.credential
                  })
                });

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
                  "refreshToken",
                  data.refreshToken
                );

                alert("Google login successful!");

                if (data.user.role === "admin") {
                  navigate("/admin/products");
                } else {
                  navigate("/products");
                }

              } catch (error) {
                console.log("Google login error:", error);
              }
            }}

            onError={() => {
              console.log("Google Login Failed");
            }}
          />
        </div>

        <p className="signup-text">
          Don't have an account?{" "}
          <button onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </p>

      </div>
    </div>
  );
}

export default Login;