const loginForm=document.getElementById('loginForm');
const signupForm=document.getElementById('signupForm');
const showSignup=document.getElementById('showSignup');
const showLogin=document.getElementById('showLogin');
const loginNotification=document.getElementById('loginNotification');
const googleLoginBtn=document.getElementById('googleLoginBtn');

// TOGGLE LOGIN/SIGNUP
showSignup.addEventListener('click',()=>{loginForm.classList.add('hidden');signupForm.classList.remove('hidden');});
showLogin.addEventListener('click',()=>{signupForm.classList.add('hidden');loginForm.classList.remove('hidden');});

// NOTIFICATION
function showNotification(msg){
  loginNotification.textContent=msg;
  loginNotification.classList.add('show');
  setTimeout(()=>loginNotification.classList.remove('show'),2000);
}

// GOOGLE LOGIN
googleLoginBtn.addEventListener('click',()=>{
  const user={username:'GoogleUser',email:'googleuser@example.com',blogs:[],music:[],videos:[],photo:'assets/defaultavatar.png'};
  localStorage.setItem('currentUser',JSON.stringify(user));
  let users=JSON.parse(localStorage.getItem('users'))||[];
  users.push(user);
  localStorage.setItem('users',JSON.stringify(users));
  localStorage.setItem('isLoggedIn','true');
  showNotification("Logged in with Google!");
  setTimeout(()=>{window.location.href="info.html";},1500);
});

// LOGIN FORM
loginForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const userInput=document.getElementById('loginUser').value;
  const passInput=document.getElementById('loginPass').value;
  let users=JSON.parse(localStorage.getItem('users'))||[];
  const user=users.find(u=>u.username===userInput||u.email===userInput||u.phone===userInput);
  if(user && passInput===user.password){
    localStorage.setItem('currentUser',JSON.stringify(user));
    localStorage.setItem('isLoggedIn','true');
    showNotification("Login successful!");
    setTimeout(()=>{
      if(user.firstName){window.location.href="index.html";}
      else{window.location.href="info.html";}
    },1500);
  } else {showNotification("Invalid credentials!");}
});

// SIGNUP FORM
signupForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  const username=document.getElementById('signupUsername').value;
  const email=document.getElementById('signupEmail').value;
  const phone=document.getElementById('signupPhone').value;
  const pass=document.getElementById('signupPass').value;
  const confirm=document.getElementById('signupConfirm').value;
  if(pass!==confirm){showNotification("Passwords do not match!");return;}
  let users=JSON.parse(localStorage.getItem('users'))||[];
  if(users.find(u=>u.username===username||u.email===email)){showNotification("User already exists!");return;}
  const newUser={username,email,phone,password:pass,blogs:[],music:[],videos:[],photo:'assets/defaultavatar.png'};
  users.push(newUser);
  localStorage.setItem('users',JSON.stringify(users));
  showNotification("Account created!");
  setTimeout(()=>{signupForm.classList.add('hidden');loginForm.classList.remove('hidden');},1000);
});
