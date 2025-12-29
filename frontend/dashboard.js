import { apiAuth, clearToken } from "./auth.js";

const profile = document.getElementById("profile");
const logoutBtn = document.getElementById("logoutBtn");

async function loadProfile() {
  try {
    const me = await apiAuth("/me");
    profile.innerHTML = `
      <p><strong>Email:</strong> ${me.email}</p>
      <p><strong>Phone:</strong> ${me.countryCode} ${me.phone}</p>
    `;
  } catch (err) {
    profile.textContent = `Access denied: ${err.message}`;
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1000);
  }
}

logoutBtn.addEventListener("click", () => {
  clearToken();
  window.location.href = "login.html";
});

loadProfile();