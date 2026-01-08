// Elements
const editProfileBtn = document.getElementById("editProfileBtn");
const editProfileForm = document.getElementById("editProfileForm");
const saveProfileBtn = document.getElementById("saveProfileBtn");

const editFirstName = document.getElementById("editFirstName");
const editLastName = document.getElementById("editLastName");
const editPhone = document.getElementById("editPhone");
const editCountry = document.getElementById("editCountry");
const editPhoto = document.getElementById("editPhoto");

const recentActivity = document.getElementById("recentActivity");

// Show/hide edit form
editProfileBtn.addEventListener("click", ()=> editProfileForm.classList.toggle("hidden"));

// Load current user
let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Fill form with current info
function fillProfileForm(){
  if(!currentUser) return;
  editFirstName.value = currentUser.firstName||"";
  editLastName.value = currentUser.lastName||"";
  editPhone.value = currentUser.phone||"";
  editCountry.value = currentUser.country||"Nepal";
}

fillProfileForm();

// Save profile changes
saveProfileBtn.addEventListener("click", ()=>{
  const users = JSON.parse(localStorage.getItem("users"))||[];
  const index = users.findIndex(u=>u.username===currentUser.username);

  users[index].firstName = editFirstName.value;
  users[index].lastName = editLastName.value;
  users[index].phone = editPhone.value;
  users[index].country = editCountry.value;

  // Update photo if selected
  if(editPhoto.files[0]){
    const reader = new FileReader();
    reader.onload = function(){
      users[index].photo = reader.result;
      currentUser.photo = reader.result;
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currentUser", JSON.stringify(currentUser));
      showNotification("Profile updated!");
      updateProfileUI();
    };
    reader.readAsDataURL(editPhoto.files[0]);
  } else {
    localStorage.setItem("users", JSON.stringify(users));
    currentUser = users[index];
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    showNotification("Profile updated!");
    updateProfileUI();
  }

  editProfileForm.classList.add("hidden");
});

// Update profile display
function updateProfileUI(){
  document.getElementById("profilePic").src = currentUser.photo || "assets/defaultavatar.png";
  document.getElementById("profileName").textContent = currentUser.firstName + " " + (currentUser.lastName||"");
  document.getElementById("profileEmail").textContent = currentUser.email||"";
  document.getElementById("profilePhone").textContent = currentUser.phone||"";
  document.getElementById("profileCountry").textContent = currentUser.country||"";
  userDisplayName.textContent = currentUser.firstName||currentUser.username;
  renderRecentActivity();
}

// Render recent activity
function renderRecentActivity(){
  recentActivity.innerHTML = "";

  // Blogs
  currentUser.blogs?.forEach(blog=>{
    const div = document.createElement("div");
    div.className = "activity-card";
    div.innerHTML = `<strong>Blog:</strong> ${blog.title}`;
    recentActivity.appendChild(div);
  });

  // Music
  currentUser.music?.forEach(music=>{
    const div = document.createElement("div");
    div.className = "activity-card";
    div.innerHTML = `<strong>Music:</strong> ${music.title}`;
    recentActivity.appendChild(div);
  });

  // Videos
  currentUser.videos?.forEach(video=>{
    const div = document.createElement("div");
    div.className = "activity-card";
    div.innerHTML = `<strong>Video:</strong> ${video.title}`;
    recentActivity.appendChild(div);
  });
}

// Initial render
updateProfileUI();

// Toast notification helper
function showNotification(msg,color="#1DB954"){ 
  const notification = document.getElementById("notification");
  notification.textContent=msg; 
  notification.style.background=color; 
  notification.classList.add("show"); 
  setTimeout(()=>notification.classList.remove("show"),2000);
}
