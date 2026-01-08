const loginForm = document.getElementById("loginForm");
const signupForm = document.getElementById("signupForm");
const showSignup = document.getElementById("showSignup");
const showLogin = document.getElementById("showLogin");
const notification = document.getElementById("notification");
const googleBtn = document.getElementById("googleLoginBtn");

// TOGGLE
showSignup.onclick = () => {
  loginForm.classList.add("hidden");
  signupForm.classList.remove("hidden");
};

showLogin.onclick = () => {
  signupForm.classList.add("hidden");
  loginForm.classList.remove("hidden");
};

function notify(msg, error=false) {
  notification.style.color = error ? "#ff4d4d" : "#1DB954";
  notification.textContent = msg;
}

// SIGNUP
signupForm.onsubmit = (e) => {
  e.preventDefault();

  const code = document.getElementById("signupCountry").value;
  const phone = document.getElementById("signupPhone").value;
  const pass = document.getElementById("signupPass").value;
  const confirm = document.getElementById("signupConfirm").value;

  if (pass !== confirm) {
    notify("Passwords do not match", true);
    return;
  }

  const fullPhone = code + phone;
  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.phone === fullPhone)) {
    notify("Phone already registered", true);
    return;
  }

  users.push({ phone: fullPhone, password: pass });
  localStorage.setItem("users", JSON.stringify(users));

  notify("Account created! Login now");
  signupForm.reset();

  setTimeout(() => {
    signupForm.classList.add("hidden");
    loginForm.classList.remove("hidden");
  }, 1000);
};

// LOGIN
loginForm.onsubmit = (e) => {
  e.preventDefault();

  const code = document.getElementById("countryCode").value;
  const phone = document.getElementById("loginPhone").value;
  const pass = document.getElementById("loginPass").value;
  const fullPhone = code + phone;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const user = users.find(u => u.phone === fullPhone);

  if (!user) {
    notify("Number not registered", true);
    return;
  }

  if (user.password !== pass) {
    notify("Incorrect password", true);
    return;
  }

  localStorage.setItem("currentUser", JSON.stringify(user));
  notify("Login successful!");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);
};

// GOOGLE LOGIN (SIMULATED)
googleBtn.onclick = () => {
  const user = { phone: "google-user", password: "" };
  localStorage.setItem("currentUser", JSON.stringify(user));
  notify("Logged in with Google!");
  setTimeout(() => window.location.href = "index.html", 1000);
};
