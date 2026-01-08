// Profile Onboarding after login
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(currentUser && (!currentUser.firstName || !currentUser.lastName)) {
  // Show modal to fill profile
  const onboardModal = document.createElement("div");
  onboardModal.id = "profileOnboard";
  onboardModal.innerHTML = `
    <div class="modal-content">
      <h2>Complete Your Profile</h2>
      <input type="text" id="onboardFirstName" placeholder="First Name" required>
      <input type="text" id="onboardLastName" placeholder="Last Name" required>
      <input type="tel" id="onboardPhone" placeholder="Phone Number" required>
      <select id="onboardCountry">
        <option value="Nepal">🇳🇵 Nepal</option>
        <option value="USA">🇺🇸 USA</option>
        <option value="India">🇮🇳 India</option>
        <option value="UK">🇬🇧 UK</option>
      </select>
      <input type="file" id="onboardPhoto">
      <button id="saveOnboard">Save</button>
    </div>`;
  document.body.appendChild(onboardModal);
  onboardModal.style.display = "flex";

  document.getElementById("saveOnboard").addEventListener("click", ()=>{
    const fName = document.getElementById("onboardFirstName").value.trim();
    const lName = document.getElementById("onboardLastName").value.trim();
    const phone = document.getElementById("onboardPhone").value.trim();
    const country = document.getElementById("onboardCountry").value;

    if(!fName || !lName || !phone) { alert("Please fill all required fields"); return; }

    const users = JSON.parse(localStorage.getItem("users"))||[];
    const index = users.findIndex(u=>u.username===currentUser.username);

    users[index].firstName = fName;
    users[index].lastName = lName;
    users[index].phone = phone;
    users[index].country = country;

    // Handle photo
    const file = document.getElementById("onboardPhoto").files[0];
    if(file){
      const reader = new FileReader();
      reader.onload = function(){
        users[index].photo = reader.result;
        finalizeOnboard(users);
      };
      reader.readAsDataURL(file);
    } else finalizeOnboard(users);
  });

  function finalizeOnboard(users){
    localStorage.setItem("users", JSON.stringify(users));
    currentUser = users.find(u=>u.username===currentUser.username);
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    onboardModal.style.display = "none";
    showNotification("Profile completed!", "#1DB954");
    updateProfileUI(); // call from profile.js
  }
} 




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

// Notification
function showNotification(msg,color="#1DB954"){ 
  notification.textContent=msg; 
  notification.style.background=color; 
  notification.classList.add("show"); 
  setTimeout(()=>notification.classList.remove("show"),2000);
}

// Hide all sections
function hideAllSections(){
  homeSection.classList.add("hidden");
  blogSection.classList.add("hidden");
  musicSection.classList.add("hidden");
  videoSection.classList.add("hidden");
  profileSection.classList.add("hidden");
  settingsSection.classList.add("hidden");
}

// Navigation
homeBtn.addEventListener("click", ()=>{hideAllSections(); homeSection.classList.remove("hidden");});
blogBtn.addEventListener("click", ()=>{hideAllSections(); blogSection.classList.remove("hidden");});
musicBtn.addEventListener("click", ()=>{hideAllSections(); musicSection.classList.remove("hidden");});
videoBtn.addEventListener("click", ()=>{hideAllSections(); videoSection.classList.remove("hidden");});
profileBtn.addEventListener("click", ()=>{hideAllSections(); profileSection.classList.remove("hidden");});
settingsBtn.addEventListener("click", ()=>{hideAllSections(); settingsSection.classList.remove("hidden");});

// Load user
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
if(!currentUser){ window.location.href="login.html"; }
else{ 
  userDisplayName.textContent=currentUser.firstName||currentUser.username; 
  document.getElementById("profilePic").src=currentUser.photo||"assets/defaultavatar.png";
  document.getElementById("profileName").textContent=currentUser.firstName+" "+(currentUser.lastName||"");
  document.getElementById("profileEmail").textContent=currentUser.email||"";
  document.getElementById("profilePhone").textContent=currentUser.phone||"";
  document.getElementById("profileCountry").textContent=currentUser.country||"";
}

// Logout
logoutBtn.addEventListener("click", ()=>{
  localStorage.removeItem("currentUser");
  showNotification("You have logged out!","#ff4d4d");
  setTimeout(()=>window.location.href="login.html",1200);
});
