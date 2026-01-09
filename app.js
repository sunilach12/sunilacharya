document.addEventListener("DOMContentLoaded", () => {

  const user = JSON.parse(localStorage.getItem("user"));
  document.getElementById("userDisplayName").textContent = user?.name || "User";

  const map = {
    homeBtn: "homeSection",
    blogBtn: "blogSection",
    musicBtn: "musicSection",
    videoBtn: "videoSection",
    profileBtn: "profileSection",
    settingsBtn: "settingsSection"
  };

  function hideAll() {
    Object.values(map).forEach(id => {
      document.getElementById(id).classList.add("hidden");
    });
  }

  Object.keys(map).forEach(btn => {
    document.getElementById(btn).onclick = () => {
      hideAll();
      document.getElementById(map[btn]).classList.remove("hidden");
    };
  });

});
