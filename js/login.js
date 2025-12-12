console.log("🚀 LOGIN.JS ACTIVE VERSION 1.0");

document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  if (!email || !password) {
    alert("Please enter both email and password.");
    return;
  }

  try {
    console.log("📡 Sending login request...");

    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password
      }),
    });

    const data = await response.json();
    console.log("🔍 Login response:", data);

    if (response.ok) {
      alert("✅ Login successful!");

      // store logged-in user info
      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      // redirect to dashboard
      window.location.href = "dashboard.html";
    } else {
      alert("❌ Login failed: " + (data.error || "Invalid email or password"));
    }

  } catch (error) {
    console.error("Login error:", error);
    alert("⚠️ Server connection failed. Make sure Rails is running.");
  }
});
