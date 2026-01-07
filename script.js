// Signup logic
document.getElementById("signupForm")?.addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("newUsername").value;
  const password = document.getElementById("newPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  localStorage.setItem("user", JSON.stringify({ username, password }));
  alert("Signup successful! Redirecting to login...");
  window.location.href = "login.html";
});

// Login logic
document.getElementById("loginForm")?.addEventListener("submit", function(event) {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.username === username && storedUser.password === password) {
    alert("Login successful! Welcome " + username);
    window.location.href = "index.html"; // redirect to homepage
  } else {
    alert("Invalid username or password.");
  }
});

// Placeholder social login
function loginWithGoogle() {
  alert("Google login integration goes here.");
}

function loginWithFacebook() {
  alert("Facebook login integration goes here.");
}
