const user = JSON.parse(localStorage.getItem("currentUser"));

if (!user) location.href = "login.html";

document.getElementById("settingName").innerText =
  user.firstName + " " + user.lastName;

document.getElementById("settingCountry").innerText =
  "Country: " + user.country;

function changePassword() {
  const newPass = document.getElementById("newPassword").value;
  if (newPass.length < 6) {
    showToast("Password too short");
    return;
  }
  user.password = newPass;
  localStorage.setItem("currentUser", JSON.stringify(user));
  showToast("Password updated");
}
