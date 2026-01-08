const form = document.getElementById("profileForm");

form.onsubmit = (e) => {
  e.preventDefault();

  let user = JSON.parse(localStorage.getItem("currentUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  user.firstName = document.getElementById("firstName").value.trim();
  user.lastName  = document.getElementById("lastName").value.trim();
  user.age       = document.getElementById("age").value;
  user.country   = document.getElementById("country").value.trim();

  const photoInput = document.getElementById("photo");

  // 👉 PHOTO HANDLING
  if (photoInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = () => {
      user.photo = reader.result; // base64 image
      saveUser(user);
    };
    reader.readAsDataURL(photoInput.files[0]);
  } else {
    // 👉 DEFAULT AVATAR
    user.photo = "user.png";
    saveUser(user);
  }
};

function saveUser(user) {
  user.profileCompleted = true;

  localStorage.setItem("currentUser", JSON.stringify(user));

  let users = JSON.parse(localStorage.getItem("users")) || [];
  users = users.map(u => u.phone === user.phone ? user : u);
  localStorage.setItem("users", JSON.stringify(users));

  window.location.href = "index.html";
}

 
