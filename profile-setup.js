const form = document.getElementById("profileForm");

form.onsubmit = (e) => {
  e.preventDefault();

  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  user.firstName = document.getElementById("firstName").value;
  user.lastName = document.getElementById("lastName").value;
  user.age = document.getElementById("age").value;
  user.country = document.getElementById("country").value;
  user.profileCompleted = true;

  localStorage.setItem("currentUser", JSON.stringify(user));

  // update user in users list
  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.map(u => u.phone === user.phone ? user : u);
  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "index.html";
};
