import API_URL from "./api";

const apiFetch = async (endpoint, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");

  // First request
  let response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${accessToken}`
    },
    credentials: "include"
  });

  // Access token expired
  if (response.status === 401) {
    const refreshResponse = await fetch(
      `${API_URL}/auth/refresh`,
      {
        method: "POST",
        credentials: "include"
      }
    );

    // Refresh token invalid / expired
    if (!refreshResponse.ok) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("role");

      window.location.href = "/login";

      return new Response(
        JSON.stringify({
          message: "Session expired. Please login again."
        }),
        {
          status: 401,
          headers: {
            "Content-Type": "application/json"
          }
        }
      );
    }

    const refreshData = await refreshResponse.json();

    // Save new access token
    localStorage.setItem(
      "accessToken",
      refreshData.accessToken
    );

    accessToken = refreshData.accessToken;

    // Retry original request with new token
    response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`
      },
      credentials: "include"
    });
  }

  return response;
};

export default apiFetch;