// ---------------- LOGIN CHECK ----------------
if(localStorage.getItem('isLoggedIn')!=='true'){
  window.location.href="login.html";
}

// ---------------- ELEMENTS ----------------
const menuBtn=document.getElementById('menuBtn');
const sideMenu=document.getElementById('sideMenu');
const homeBtn=document.getElementById('homeBtn');
const musicBtn=document.getElementById('musicBtn');
const blogBtn=document.getElementById('blogBtn');
const profileBtn=document.getElementById('profileBtn');
const homeSection=document.getElementById('homeSection');
const musicLibrarySection=document.getElementById('musicLibrarySection');
const blogSection=document.getElementById('blogSection');
const profileSection=document.getElementById('profileSection');
const usernameDisplay=document.getElementById('usernameDisplay');
const logoutBtn=document.getElementById('logoutBtn');
const darkModeBtn=document.getElementById('darkModeBtn');
const notification=document.getElementById('notification');

// ---------------- CURRENT USER ----------------
let currentUser=JSON.parse(localStorage.getItem('currentUser'));
usernameDisplay.textContent="Hello, "+currentUser.username;

// ---------------- MENU ----------------
menuBtn.addEventListener('click',()=>sideMenu.classList.toggle('active'));
function hideAllSections(){
  homeSection.classList.add('hidden');
  musicLibrarySection.classList.add('hidden');
  blogSection.classList.add('hidden');
  profileSection.classList.add('hidden');
}
homeBtn.addEventListener('click',()=>{hideAllSections();homeSection.classList.remove('hidden');});
musicBtn.addEventListener('click',()=>{hideAllSections();musicLibrarySection.classList.remove('hidden');});
blogBtn.addEventListener('click',()=>{hideAllSections();blogSection.classList.remove('hidden');renderBlogs();});
profileBtn.addEventListener('click',()=>{hideAllSections();profileSection.classList.remove('hidden');renderProfile();});

// ---------------- LOGOUT ----------------
logoutBtn.addEventListener('click',()=>{
  localStorage.setItem('isLoggedIn','false');
  localStorage.removeItem('currentUser');
  showNotification("You have logged out!");
  setTimeout(()=>{window.location.href="login.html";},1500);
});

// ---------------- DARK MODE ----------------
darkModeBtn.addEventListener('click',()=>{
  document.body.classList.toggle('dark-mode');
});

// ---------------- MUSIC PLAYER ----------------
const overlay=document.getElementById('musicPlayerOverlay');
const playPauseBtn=document.getElementById('playPauseBtn');
const nextBtn=document.getElementById('nextBtn');
const prevBtn=document.getElementById('prevBtn');
const shuffleBtn=document.getElementById('shuffleBtn');
const audio=new Audio();
const songs=Array.from(document.querySelectorAll('.song-card'));
const progressBar=document.getElementById('progressBar');
const currentTimeEl=document.getElementById('currentTime');
const durationEl=document.getElementById('duration');
let currentIndex=0,shuffleMode=false;

function playSong(index){
  const song=songs[index];
  audio.src=song.dataset.url;
  audio.play();
  overlay.classList.remove('hidden');
  document.getElementById('playerTitle').innerText=song.dataset.title;
  document.getElementById('playerArtist').innerText=song.dataset.artist;
  document.getElementById('playerImg').src=song.dataset.img;
  document.getElementById('downloadBtn').href=song.dataset.url;
  document.getElementById('downloadBtn').setAttribute('download',`${song.dataset.title}.mp3`);
  playPauseBtn.innerText="⏸";currentIndex=index;
}
songs.forEach((s,i)=>s.addEventListener('click',()=>playSong(i)));
playPauseBtn.addEventListener('click',()=>{if(audio.paused){audio.play();playPauseBtn.innerText="⏸";}else{audio.pause();playPauseBtn.innerText="▶";}});
nextBtn.addEventListener('click',()=>{if(shuffleMode) currentIndex=Math.floor(Math.random()*songs.length); else currentIndex=(currentIndex+1)%songs.length; playSong(currentIndex);});
prevBtn.addEventListener('click',()=>{if(shuffleMode) currentIndex=Math.floor(Math.random()*songs.length); else currentIndex=(currentIndex-1+songs.length)%songs.length; playSong(currentIndex);});
shuffleBtn.addEventListener('click',()=>shuffleMode=!shuffleMode);
document.getElementById('closePlayer').addEventListener('click',()=>{overlay.classList.add('hidden');audio.pause();});
audio.addEventListener('timeupdate',()=>{const p=(audio.currentTime/audio.duration)*100;progressBar.value=p||0;currentTimeEl.innerText=formatTime(audio.currentTime);durationEl.innerText=formatTime(audio.duration||0);});
progressBar.addEventListener('input',()=>{audio.currentTime=(progressBar.value/100)*audio.duration;});
function formatTime(t){const m=Math.floor(t/60)||0,s=Math.floor(t%60)||0;return `${m}:${s<10?'0':''}${s}`;}

// ---------------- NOTIFICATION ----------------
function showNotification(msg){
  notification.textContent=msg;
  notification.classList.add('show');
  setTimeout(()=>notification.classList.remove('show'),2000);
}

// ---------------- PROFILE ----------------
const profileUsername=document.getElementById('profileUsername');
const profileEmail=document.getElementById('profileEmail');
const profilePhoto=document.getElementById('profilePhoto');
const profilePhotoInput=document.getElementById('profilePhotoInput');

function renderProfile(){
  profileUsername.textContent=currentUser.username;
  profileEmail.textContent=currentUser.email;
  profilePhoto.src=currentUser.photo||'defaultavatar.png';
}
profilePhotoInput.addEventListener('change',function(){
  const reader=new FileReader();
  reader.onload=(e)=>{currentUser.photo=e.target.result;profilePhoto.src=e.target.result;saveUserData();}
  reader.readAsDataURL(this.files[0]);
});

// ---------------- BLOG ----------------
const blogForm=document.getElementById('blogForm');
const blogPosts=document.getElementById('blogPosts');

blogForm.addEventListener('submit',function(e){
  e.preventDefault();
  const title=document.getElementById('blogTitle').value;
  const content=document.getElementById('blogContent').value;
  const file=document.getElementById('blogImage').files[0];
  if(!currentUser.blogs) currentUser.blogs=[];
  if(file){
    const reader=new FileReader();
    reader.onload=(ev)=>{
      currentUser.blogs.push({title,content,image:ev.target.result,locked:false});
      saveUserData();renderBlogs();blogForm.reset();
      showNotification("Blog posted!");
    }
    reader.readAsDataURL(file);
  }else{
    currentUser.blogs.push({title,content,image:'',locked:false});
    saveUserData();renderBlogs();blogForm.reset();
    showNotification("Blog posted!");
  }
});

function renderBlogs(){
  blogPosts.innerHTML='';
  let users=JSON.parse(localStorage.getItem('users'))||[];
  users.forEach(u=>{
    if(u.blogs) u.blogs.forEach((b,i)=>{
      if(!b.locked || u.username===currentUser.username){
        const div=document.createElement('div');
        div.className='blog-card';
        div.innerHTML=`<h3>${b.title}</h3><p>${b.content}</p>${b.image?'<img src="'+b.image+'">':''}`;
        if(u.username===currentUser.username){
          const lockBtn=document.createElement('button');
          lockBtn.className='lock-btn';
          lockBtn.innerText=b.locked?'Unlock':'Lock';
          lockBtn.onclick=()=>{b.locked=!b.locked;saveUserData();renderBlogs();}
          div.appendChild(lockBtn);
        }
        blogPosts.appendChild(div);
      }
    });
  });
}

// ---------------- SAVE USER DATA ----------------
function saveUserData(){
  let users=JSON.parse(localStorage.getItem('users'))||[];
  users=users.map(u=>u.username===currentUser.username?currentUser:u);
  localStorage.setItem('users',JSON.stringify(users));
}
