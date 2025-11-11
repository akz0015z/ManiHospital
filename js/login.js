document.getElementById("loginForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = users.find(u => u.email === email && u.password === password);

  // remove old alerts if any
  const existingAlert = document.querySelector(".alert");
  if (existingAlert) existingAlert.remove();

  const card = document.querySelector(".card");

  if (validUser) {
    //  creating a styled Bootstrap success alert
    const successAlert = document.createElement("div");
    successAlert.classList.add("alert", "alert-success", "text-center", "mt-3", "shadow-sm");
    successAlert.style.borderRadius = "10px";
    successAlert.style.animation = "fadeIn 0.6s ease";
    successAlert.innerText = `✅ Login successful! Welcome, ${validUser.name}`;
    card.appendChild(successAlert);

    // stores current session
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));

    // redirects after short delay
    setTimeout(() => {
      successAlert.style.transition = "opacity 0.6s ease";
      successAlert.style.opacity = "0";
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 600);
    }, 1500);
  } else {
    //  creates an error alert
    const errorAlert = document.createElement("div");
    errorAlert.classList.add("alert", "alert-danger", "text-center", "mt-3", "shadow-sm");
    errorAlert.style.borderRadius = "10px";
    errorAlert.style.animation = "fadeIn 0.6s ease";
    errorAlert.innerText = "❌ Invalid email or password. Please try again.";
    card.appendChild(errorAlert);

    // removes error after 2.5 seconds
    setTimeout(() => {
      errorAlert.style.transition = "opacity 0.6s ease";
      errorAlert.style.opacity = "0";
      setTimeout(() => errorAlert.remove(), 600);
    }, 2500);
  }
});
