const axios = require("axios");

async function testAdminDashboard() {
  try {
    // 1. Login to get token
    const loginRes = await axios.post("http://localhost:5000/api/auth/login", {
      email: "admin@gmail.com",
      password: "admin123"
    });

    const token = loginRes.data.token;
    console.log("Login successful, token:", token);

    // 2. Fetch admin dashboard stats
    const statsRes = await axios.get("http://localhost:5000/api/admin/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    console.log("Dashboard stats retrieved:", statsRes.data);

  } catch (err) {
    if (err.response) {
      console.error("Error response:", err.response.status, err.response.data);
    } else {
      console.error("Error message:", err.message);
    }
  }
}

testAdminDashboard();
