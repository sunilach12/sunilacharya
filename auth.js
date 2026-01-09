 
if (!localStorage.getItem("user")) {
  localStorage.setItem("user", JSON.stringify({
    email: "demo@gmail.com",
    name: "Demo User"
  }));
}

document.getElementById("logoutBtn").onclick = () => {
  localStorage.clear();
  location.reload();
};

