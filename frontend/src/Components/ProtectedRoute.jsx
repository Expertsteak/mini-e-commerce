import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, adminOnly = false }) {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));

      if (payload.role !== "admin") {
        return <Navigate to="/products" replace />;
      }

    } catch (error) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");

      return <Navigate to="/login" replace />;
    }
  }

  return children;
}

export default ProtectedRoute;