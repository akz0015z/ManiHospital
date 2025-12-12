console.log("🚨 SIGNUP.JS LOADED VERSION 999 🚨");

document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  console.log("📌 Collected input:", { name, email, password });

  if (!name || !email || !password) {
    alert("Please fill out all fields.");
    return;
  }

  // Debug start
  console.log("📡 Sending signup request to backend...");

  try {
    const response = await fetch("http://127.0.0.1:4000/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: {
          name: name,
          email: email,
          password: password,
        },
      }),
    }).catch((err) => {
      console.error("❌ FETCH ERROR BEFORE SERVER:", err);
      alert("❌ Fetch failed before reaching server. Check Rails server.");
    });

    console.log("🟦 Response received:", response);

    if (!response) {
      alert("❌ No response received from server.");
      return;
    }

    let data = {};
    try {
      data = await response.json();
      console.log("📨 Parsed JSON:", data);
    } catch (jsonError) {
      console.error("❌ JSON Parse Error:", jsonError);
      alert("❌ Server returned invalid JSON.");
      return;
    }

    if (response.ok) {
      alert("✅ Signup successful! You can now log in.");
      window.location.href = "login.html";
    } else {
      alert("❌ Signup failed: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    console.error("🔥 UNCAUGHT ERROR:", error);
    alert("⚠️ Server connection failed. Make sure Rails is running.");
  }
});
