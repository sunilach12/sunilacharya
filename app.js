// ----------------- ELEMENTS -----------------
const homeBtn = document.getElementById("homeBtn");
const blogBtn = document.getElementById("blogBtn");
const musicBtn = document.getElementById("musicBtn");
const videoBtn = document.getElementById("videoBtn");
const profileBtn = document.getElementById("profileBtn");
const settingsBtn = document.getElementById("settingsBtn");
const logoutBtn = document.getElementById("logoutBtn");

const homeSection = document.getElementById("homeSection");
const blogSection = document.getElementById("blogSection");
const musicSection = document.getElementById("musicSection");
const videoSection = document.getElementById("videoSection");
const profileSection = document.getElementById("profileSection");
const settingsSection = document.getElementById("settingsSection");

const userDisplayName = document.getElementById("userDisplayName");
const notification = document.getElementById("notification");

// ----------------- UTILS -----------------
function showNotification(msg, color="#1DB954") {
  notification.textContent = msg;
  notification.style.background = color;
  notification.classList.add("show");
  setTimeout(()=> notification.classList.remove("show"), 2000);
}

// ----------------- USER -----------------
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){
  window.location.href = "login.html";
}else{
  userDisplayName.textContent = currentUser.firstName || currentUser.username || "User";
}

// ----------------- NAVIGATION -----------------
function hideAllSections(){
  homeSection.classList.add("hidden");
  blogSection.classList.add("hidden");
  musicSection.classList.add("hidden");
  videoSection.classList.add("hidden");
  profileSection.classList.add("hidden");
  settingsSection.classList.add("hidden");
}

homeBtn.addEventListener("click", ()=>{
  hideAllSections();
  homeSection.classList.remove("hidden");
});
blogBtn.addEventListener("click", ()=>{
  hideAllSections();
  blogSection.classList.remove("hidden");
});
musicBtn.addEventListener("click", ()=>{
  hideAllSections();
  musicSection.classList.remove("hidden");
});
videoBtn.addEventListener("click", ()=>{
  hideAllSections();
  videoSection.classList.remove("hidden");
});
profileBtn.addEventListener("click", ()=>{
  hideAllSections();
  profileSection.classList.remove("hidden");
});
settingsBtn.addEventListener("click", ()=>{
  hideAllSections();
  settingsSection.classList.remove("hidden");
});

// ----------------- LOGOUT -----------------
logoutBtn.addEventListener("click", ()=>{
  localStorage.removeItem("currentUser");
  showNotification("You have logged out!", "#ff4d4d");
  setTimeout(()=> window.location.href="login.html", 1200);
});
