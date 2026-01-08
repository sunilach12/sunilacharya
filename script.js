// ---------------- LOGIN CHECK ----------------
if(localStorage.getItem('isLoggedIn')!=='true'){window.location.href="login.html";}

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
const darkModeBtn=document.getElementById('darkModeBtn');
const notification=document.getElementById('notification');
const profileLogoutBtn=document.getElementById('profileLogoutBtn');

let currentUser=JSON.parse(localStorage.getItem('currentUser'));
usernameDisplay.textContent="Hello, "+(currentUser.username || currentUser.email);

// ---------------- MENU ----------------
menuBtn.addEventListener('click',()=>sideMenu.classList.toggle('active'));
function hideAllSections(){
  homeSection.classList.add('hidden');
  musicLibrarySection.classList.add('hidden');
  blogSection.classList.add('hidden');
  profileSection.classList.add('hidden');
  sideMenu.classList.remove('active'); // auto hide
}
homeBtn.addEventListener('click',()=>{hideAllSections();homeSection.classList.remove('hidden');});
musicBtn.addEventListener('click',()=>{hideAllSections();musicLibrarySection.classList.remove('hidden');});
blogBtn.addEventListener('click',()=>{hideAllSections();blogSection.classList.remove('hidden');renderBlogs();});
profileBtn.addEventListener('click',()=>{hideAllSections();profileSection.classList.remove('hidden');renderProfile();});

// ---------------- PROFILE ----------------
const profileUsername=document.getElementById('profileUsername');
const profileEmail=document.getElementById('profileEmail');
const profilePhone=document.getElementById('profilePhone');
const profileCountry=document.getElementById('profileCountry');
const profileFlag=document.getElementById('profileFlag');
const profilePhoto=document.getElementById('profilePhoto');
const profilePhotoInput=document.getElementById('profilePhotoInput');

function renderProfile(){
  profileUsername.textContent=currentUser.username || currentUser.email;
  profileEmail.textContent=currentUser.email;
  profilePhone.textContent=currentUser.phone || 'Not added';
  profileCountry.textContent=currentUser.country || 'Unknown';
  profileFlag.src=currentUser.flag || '';
  profilePhoto.src=currentUser.photo || 'defaultavatar.png';
}
profilePhotoInput.addEventListener('change',function(){
  const reader=new FileReader();
  reader.onload=(e)=>{currentUser.photo=e.target.result;profilePhoto.src=e.target.result;saveUserData();}
  reader.readAsDataURL(this.files[0]);
});

// Logout in profile
profileLogoutBtn.addEventListener('click',()=>{
  localStorage.setItem('isLoggedIn','false');
  localStorage.removeItem('currentUser');
  showNotification("You have logged out!");
  setTimeout(()=>{window.location.href="login.html";},1500);
});

// ---------------- NOTIFICATION ----------------
function showNotification(msg){
  notification.textContent=msg;
  notification.classList.add('show');
  setTimeout(()=>notification.classList.remove('show'),2000);
}

// ---------------- DARK MODE ----------------
darkModeBtn.addEventListener('click',()=>{document.body.classList.toggle('dark-mode');});

// ---------------- BLOG ----------------
const blogForm=document.getElementById('blogForm');
const blogPosts=document.getElementById('blogPosts');
const postBlogBtn=document.getElementById('postBlogBtn');
const blogTitle=document.getElementById('blogTitle');
const blogContent=document.getElementById('blogContent');
const blogImage=document.getElementById('blogImage');

postBlogBtn.addEventListener('click',(e)=>{
  e.preventDefault();
  if(!currentUser.blogs) currentUser.blogs=[];
  const file=blogImage.files[0];
  if(file){
    const reader=new FileReader();
    reader.onload=(ev)=>{
      currentUser.blogs.push({title:blogTitle.value,content:blogContent.value,image:ev.target.result,locked:false});
      saveUserData();renderBlogs();blogForm.reset();showNotification("Blog posted!");
    }
    reader.readAsDataURL(file);
  }else{
    currentUser.blogs.push({title:blogTitle.value,content:blogContent.value,image:'',locked:false});
    saveUserData();renderBlogs();blogForm.reset();showNotification("Blog posted!");
  }
});

function renderBlogs(){
  blogPosts.innerHTML='';
  const users=JSON.parse(localStorage.getItem('users'))||[];
  users.forEach(user=>{
    if(user.blogs){
      user.blogs.forEach((b,i)=>{
        if(!b.locked || user.username===currentUser.username){
          const card=document.createElement('div');
          card.className='blog-card';
          card.innerHTML=`<h3>${b.title}</h3><p>${b.content}</p>${b.image?'<img src="'+b.image+'">':''}`;
          if(user.username===currentUser.username){
            const lockBtn=document.createElement('button');
            lockBtn.className='lock-btn';
            lockBtn.innerText=b.locked?'Unlock':'Lock';
            lockBtn.onclick=()=>{b.locked=!b.locked;saveUserData();renderBlogs();}
            card.appendChild(lockBtn);
          }
          blogPosts.appendChild(card);
        }
      });
    }
  });
}

// ---------------- SAVE USER ----------------
function saveUserData(){
  let users=JSON.parse(localStorage.getItem('users'))||[];
  users=users.map(u=>u.username===currentUser.username?currentUser:u);
  localStorage.setItem('users',JSON.stringify(users));
}
