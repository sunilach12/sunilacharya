// ---------------- ELEMENTS ----------------
const sections = {
  home: document.getElementById('homeSection'),
  blog: document.getElementById('blogSection'),
  music: document.getElementById('musicSection'),
  video: document.getElementById('videoSection'),
  profile: document.getElementById('profileSection'),
  settings: document.getElementById('settingsSection')
};

const homeBtn = document.getElementById('homeBtn');
const blogBtn = document.getElementById('blogBtn');
const musicBtn = document.getElementById('musicBtn');
const videoBtn = document.getElementById('videoBtn');
const profileBtn = document.getElementById('profileBtn');
const settingsBtn = document.getElementById('settingsBtn');
const logoutBtn = document.getElementById('logoutBtn');
const notification = document.getElementById('notification');

// ---------------- CHECK LOGIN ----------------
let currentUser = JSON.parse(localStorage.getItem('currentUser'));
if(!localStorage.getItem('isLoggedIn') || !currentUser){
  window.location.href = 'login.html';
}

// ---------------- DISPLAY USER INFO ----------------
document.getElementById('userDisplayName').innerText = currentUser.firstName || currentUser.username;
document.getElementById('profilePic').src = currentUser.photo || 'assets/defaultavatar.png';
document.getElementById('profileName').innerText = currentUser.firstName + ' ' + (currentUser.lastName||'');
document.getElementById('profileUsername').innerText = currentUser.username;
document.getElementById('profileEmail').innerText = currentUser.email;
document.getElementById('profilePhone').innerText = currentUser.phone;
document.getElementById('profileAge').innerText = currentUser.age || '';
document.getElementById('profileCountry').innerText = currentUser.country || '';

// ---------------- NAVIGATION ----------------
function showSection(sec){
  Object.values(sections).forEach(s=>s.classList.add('hidden'));
  sec.classList.remove('hidden');
}
homeBtn.onclick = ()=>showSection(sections.home);
blogBtn.onclick = ()=>showSection(sections.blog);
musicBtn.onclick = ()=>showSection(sections.music);
videoBtn.onclick = ()=>showSection(sections.video);
profileBtn.onclick = ()=>showSection(sections.profile);
settingsBtn.onclick = ()=>showSection(sections.settings);

// ---------------- LOGOUT ----------------
logoutBtn.onclick = ()=>{
  localStorage.removeItem('currentUser');
  localStorage.setItem('isLoggedIn','false');
  showNotification("You have logged out!");
  setTimeout(()=>{window.location.href='login.html';},1500);
};

// ---------------- NOTIFICATION ----------------
function showNotification(msg){
  notification.textContent = msg;
  notification.classList.add('show');
  setTimeout(()=>notification.classList.remove('show'),2000);
}

// ---------------- BLOG SYSTEM ----------------
const blogForm = document.getElementById('blogForm');
const blogsContainer = document.getElementById('blogsContainer');
let blogs = currentUser.blogs || [];

function renderBlogs(){
  blogsContainer.innerHTML = '';
  blogs.forEach((b,i)=>{
    const div = document.createElement('div');
    div.className = 'blog-card';
    div.innerHTML = `<h3>${b.title}</h3><p>${b.content}</p>
      <div class="card-actions">
        <button class="like">Like (${b.likes||0})</button>
        <button class="comment">Comment</button>
      </div>`;
    blogsContainer.appendChild(div);
    div.querySelector('.like').onclick = ()=>{
      b.likes = (b.likes||0)+1;
      localStorage.setItem('currentUser',JSON.stringify(currentUser));
      renderBlogs();
    };
  });
}
blogForm.onsubmit = (e)=>{
  e.preventDefault();
  const title = document.getElementById('blogTitle').value;
  const content = document.getElementById('blogContent').value;
  blogs.push({title,content,likes:0});
  currentUser.blogs = blogs;
  localStorage.setItem('currentUser',JSON.stringify(currentUser));
  renderBlogs();
  blogForm.reset();
};
renderBlogs();

// ---------------- MUSIC SYSTEM ----------------
const musicForm = document.getElementById('musicForm');
const musicContainer = document.getElementById('musicContainer');
let music = currentUser.music || [];

function renderMusic(){
  musicContainer.innerHTML = '';
  music.forEach((m,i)=>{
    const div = document.createElement('div');
    div.className = 'music-card';
    div.innerHTML = `<p>${m.title}</p>
      <audio controls src="${m.url}"></audio>
      <div class="card-actions"><button class="like">Like (${m.likes||0})</button></div>`;
    musicContainer.appendChild(div);
    div.querySelector('.like').onclick = ()=>{
      m.likes = (m.likes||0)+1;
      localStorage.setItem('currentUser',JSON.stringify(currentUser));
      renderMusic();
    };
  });
}
musicForm.onsubmit = (e)=>{
  e.preventDefault();
  const title = document.getElementById('musicTitle').value;
  const file = document.getElementById('musicFile').files[0];
  if(!file){return;}
  const url = URL.createObjectURL(file);
  music.push({title,url,likes:0});
  currentUser.music = music;
  localStorage.setItem('currentUser',JSON.stringify(currentUser));
  renderMusic();
  musicForm.reset();
};
renderMusic();

// ---------------- VIDEO SYSTEM ----------------
const videoForm = document.getElementById('videoForm');
const videoContainer = document.getElementById('videoContainer');
let videos = currentUser.videos || [];

function renderVideos(){
  videoContainer.innerHTML = '';
  videos.forEach((v,i)=>{
    const div = document.createElement('div');
    div.className = 'video-card';
    div.innerHTML = `<p>${v.title}</p>
      <video controls width="100%" src="${v.url}"></video>
      <div class="card-actions"><button class="like">Like (${v.likes||0})</button></div>`;
    videoContainer.appendChild(div);
    div.querySelector('.like').onclick = ()=>{
      v.likes = (v.likes||0)+1;
      localStorage.setItem('currentUser',JSON.stringify(currentUser));
      renderVideos();
    };
  });
}
videoForm.onsubmit = (e)=>{
  e.preventDefault();
  const title = document.getElementById('videoTitle').value;
  const file = document.getElementById('videoFile').files[0];
  if(!file){return;}
  const url = URL.createObjectURL(file);
  videos.push({title,url,likes:0});
  currentUser.videos = videos;
  localStorage.setItem('currentUser',JSON.stringify(currentUser));
  renderVideos();
  videoForm.reset();
};
renderVideos();

// ---------------- SETTINGS PASSWORD CHANGE ----------------
const passwordForm = document.getElementById('passwordForm');
passwordForm.onsubmit = (e)=>{
  e.preventDefault();
  const current = document.getElementById('currentPass').value;
  const newPass = document.getElementById('newPass').value;
  const confirm = document.getElementById('confirmPass').value;
  if(current !== currentUser.password){showNotification("Current password incorrect!"); return;}
  if(newPass !== confirm){showNotification("New passwords do not match!"); return;}
  currentUser.password = newPass;
  localStorage.setItem('currentUser',JSON.stringify(currentUser));
  showNotification("Password changed successfully!");
  passwordForm.reset();
};
// ---------------- PROFILE EDIT ----------------
const editBtn = document.getElementById('editProfileBtn');
const editForm = document.getElementById('editProfileForm');
const saveBtn = document.getElementById('saveProfileBtn');

editBtn.onclick = ()=> editForm.classList.toggle('hidden');

saveBtn.onclick = ()=>{
  const fName = document.getElementById('editFirstName').value;
  const lName = document.getElementById('editLastName').value;
  const phone = document.getElementById('editPhone').value;
  const country = document.getElementById('editCountry').value;
  const file = document.getElementById('editPhoto').files[0];
  if(fName) currentUser.firstName = fName;
  if(lName) currentUser.lastName = lName;
  if(phone) currentUser.phone = phone;
  if(country) currentUser.country = country;
  if(file) currentUser.photo = URL.createObjectURL(file);
  localStorage.setItem('currentUser',JSON.stringify(currentUser));
  showNotification("Profile updated!");
  location.reload(); // refresh profile info
};

