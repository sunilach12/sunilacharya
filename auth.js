let currentUser = JSON.parse(localStorage.getItem("currentUser"));

// Check login
function checkLogin(){ 
  if(!currentUser){ window.location.href="login.html"; return false; } 
  return true; 
}

// Logout
function logout(){
  localStorage.removeItem("currentUser");
  showToast("You have logged out!");
  setTimeout(()=>window.location.href="login.html",1200);
}
