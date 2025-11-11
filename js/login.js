document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const validUser = users.find(u => u.email === email && u.password === password);

  if (validUser) {
    alert("Login successful! Welcome " + validUser.name);
    localStorage.setItem("loggedInUser", JSON.stringify(validUser));
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid email or password. Try again.");
  }
});
