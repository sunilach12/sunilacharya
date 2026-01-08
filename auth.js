function isLoggedIn() {
  return localStorage.getItem("isLoggedIn") === "true";
}

function getUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("currentUser");
  showToast("You have logged out");
  setTimeout(() => location.href = "login.html", 1200);
}
