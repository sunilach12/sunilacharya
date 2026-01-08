// ---------------- UI TOGGLE ----------------
const loginBox = document.getElementById('loginBox');
const signupBox = document.getElementById('signupBox');
const showSignup = document.getElementById('showSignup');
const showLogin = document.getElementById('showLogin');

showSignup.addEventListener('click', () => {
  loginBox.classList.add('hidden');
  signupBox.classList.remove('hidden');
});
showLogin.addEventListener('click', () => {
  signupBox.classList.add('hidden');
  loginBox.classList.remove('hidden');
});

// ---------------- LOGIN ----------------
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', function(e){
  e.preventDefault();
  const input = document.getElementById('loginInput').value.trim(); // email or username
  const password = document.getElementById('loginPassword').value.trim();

  const users = JSON.parse(localStorage.getItem('users')) || [];
  const user = users.find(u => (u.email===input || u.username===input) && u.password===password);

  if(user){
    localStorage.setItem('isLoggedIn','true');
    localStorage.setItem('currentUser', JSON.stringify(user));
    window.location.href = "index.html";
  } else {
    loginError.classList.remove('hidden');
  }
});

// ---------------- SIGNUP ----------------
const signupForm = document.getElementById('signupForm');
const signupError = document.getElementById('signupError');

signupForm.addEventListener('submit', function(e){
  e.preventDefault();

  const username = document.getElementById('signupUsername').value.trim();
  const email = document.getElementById('signupEmail').value.trim();
  const password = document.getElementById('signupPassword').value.trim();
  const confirmPassword = document.getElementById('confirmPassword').value.trim();

  const usernameRegex = /^[a-z0-9!@#$%^&*]{5}$/;
  if(!usernameRegex.test(username)){
    signupError.textContent = "Username must be 5 chars: lowercase letters, numbers, symbols.";
    signupError.classList.remove('hidden');
    return;
  }

  if(password!==confirmPassword){
    signupError.textContent = "Passwords do not match!";
    signupError.classList.remove('hidden');
    return;
  }

  let users = JSON.parse(localStorage.getItem('users')) || [];
  if(users.find(u=>u.email===email)){
    signupError.textContent = "Email already registered!";
    signupError.classList.remove('hidden');
    return;
  }

  users.push({username,email,password,photo:""});
  localStorage.setItem('users',JSON.stringify(users));

  signupError.classList.add('hidden');
  signupForm.reset();
  loginBox.classList.remove('hidden');
  signupBox.classList.add('hidden');
  document.getElementById('loginInput').value = email;
  alert("Signup successful! Please login.");
});

// ---------------- GOOGLE LOGIN ----------------
function handleCredentialResponse(response){
  const userGoogle = {username:"GoogleUser", email:"googleuser@gmail.com", photo:""};
  localStorage.setItem('isLoggedIn','true');
  localStorage.setItem('currentUser', JSON.stringify(userGoogle));
  window.location.href="index.html";
}

window.onload = function(){
  google.accounts.id.initialize({
    client_id:"16883781766-5mp4j8t5ancqj9r4j4l9quos4io5baqk.apps.googleusercontent.com",
    callback:handleCredentialResponse
  });
  google.accounts.id.renderButton(
    document.getElementById("googleSignIn"),
    { theme:"outline", size:"large" }
  );
  google.accounts.id.prompt();
};

// ---------------- REDIRECT IF ALREADY LOGGED IN ----------------
document.addEventListener('DOMContentLoaded',()=>{
  if(localStorage.getItem('isLoggedIn')==='true'){
    window.location.href="index.html";
  }
});

 
