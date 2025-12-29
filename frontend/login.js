import { api, saveToken } from "./auth.js";

const form = document.getElementById("loginForm");
const msg = document.getElementById("msg");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "";
  msg.className = "note";

  const data = {
    email: form.email.value.trim(),
    password: form.password.value
  };

  try {
    const res = await api("/login", {
      method: "POST",
      body: JSON.stringify(data)
    });
    saveToken(res.token);
    msg.textContent = res.message;
    msg.className = "success";
    setTimeout(() => {
      window.location.href = "dashboard.html";
    }, 600);
  } catch (err) {
    msg.textContent = err.message;
    msg.className = "error";
  }
});