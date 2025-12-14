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

  console.log("📡 Sending signup request to backend...");

  try {
    const response = await fetch(
      "https://manihospital-api.onrender.com/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: {
            name: name,
            email: email,
            password: password,
          },
        }),
      }
    );

    console.log("🟦 Response received:", response);

    const data = await response.json();
    console.log("📨 Parsed JSON:", data);

    if (response.ok) {
      alert("✅ Signup successful! You can now log in.");
      window.location.href = "login.html";
    } else {
      alert("❌ Signup failed: " + (data.error || "Unknown error"));
    }
  } catch (error) {
    console.error("🔥 ERROR:", error);
    alert("⚠️ Server connection failed.");
  }
});
