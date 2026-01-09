function signup(){
  const email = suEmail.value;
  const pass = suPass.value;
  let users = JSON.parse(localStorage.users || "[]");
  users.push({email,pass,blogs:[]});
  localStorage.users = JSON.stringify(users);
  alert("Signup done");
}

function loginUser(){
  let users = JSON.parse(localStorage.users || "[]");
  const user = users.find(u=>u.email===loginUser.value && u.pass===loginPass.value);
  if(user){
    localStorage.currentUser = JSON.stringify(user);
    location.href="index.html";
  }
}

function handleGoogle(res){
  const data = JSON.parse(atob(res.credential.split('.')[1]));
  let users = JSON.parse(localStorage.users || "[]");

  let user = users.find(u=>u.email===data.email);
  if(!user){
    user={email:data.email,name:data.name,photo:data.picture,blogs:[]};
    users.push(user);
    localStorage.users=JSON.stringify(users);
  }
  localStorage.currentUser=JSON.stringify(user);
  location.href="index.html";
}
