import { api } from "./auth.js";

const form = document.getElementById("signupForm");
const msg = document.getElementById("msg");
const select = document.getElementById("countryCode");

async function loadCountries() {
  try {
    const countries = await api("/countries");
    select.innerHTML = countries
      .map(c => `<option value="${c.code}">${c.name} (${c.code})</option>`)
      .join("");
    // Preselect Nepal for you
    const nepal = [...select.options].find(o => o.textContent.includes("Nepal"));
    if (nepal) nepal.selected = true;
  } catch (err) {
    msg.textContent = `Failed to load country codes: ${err.message}`;
    msg.className = "error";
  }
}
loadCountries();

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.textContent = "";
  msg.className = "note";

  const data = {
    email: form.email.value.trim(),
    password: form.password.value,
    phone: form.phone.value.trim(),
    countryCode: form.countryCode.value
  };

  try {
    const res = await api("/signup", {
      method: "POST",
      body: JSON.stringify(data)
    });
    msg.textContent = res.message;
    msg.className = "success";
    setTimeout(() => {
      window.location.href = "login.html";
    }, 800);
  } catch (err) {
    msg.textContent = err.message;
    msg.className = "error";
  }
});