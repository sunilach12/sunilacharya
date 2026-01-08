const newVideoBtn = document.getElementById("newVideoBtn");
const videoFormModal = document.getElementById("videoFormModal");
const closeVideoForm = document.getElementById("closeVideoForm");
const videoForm = document.getElementById("videoForm");
const videoContainer = document.getElementById("videoContainer");

newVideoBtn.addEventListener("click", ()=> videoFormModal.classList.remove("hidden"));
closeVideoForm.addEventListener("click", ()=> videoFormModal.classList.add("hidden"));

// Render all videos
function renderVideos(){
  videoContainer.innerHTML="";
  const users = JSON.parse(localStorage.getItem("users"))||[];
  users.forEach(user=>{
    user.videos?.forEach(v=>{
      const div = document.createElement("div");
      div.className="video-card";
      div.innerHTML=`
        <div class="video-author">
          <img src="${v.photo||'assets/defaultavatar.png'}" class="author-photo">
          <strong>${user.firstName||user.username}</strong>
        </div>
        <h3>${v.title}</h3>
        <video controls width="100%" src="${v.file}"></video>
        <button class="viewVideoBtn">View</button>
      `;
      div.querySelector(".viewVideoBtn").addEventListener("click", ()=>{
        localStorage.setItem("viewVideo", JSON.stringify({video:v,user}));
        window.location.href="viewVideo.html";
      });
      videoContainer.appendChild(div);
    });
  });
}

// Upload video
videoForm.addEventListener("submit", e=>{
  e.preventDefault();
  const title = document.getElementById("videoTitle").value;
  const file = document.getElementById("videoFile").files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = function(){
    const users = JSON.parse(localStorage.getItem("users"))||[];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const index = users.findIndex(u=>u.username===currentUser.username);

    if(!users[index].videos) users[index].videos=[];
    users[index].videos.push({
      title,
      file: reader.result,
      author: currentUser.username,
      photo: currentUser.photo,
      timestamp: Date.now()
    });

    localStorage.setItem("users", JSON.stringify(users));
    currentUser.videos = users[index].videos;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    videoForm.reset();
    videoFormModal.classList.add("hidden");
    renderVideos();
  };
  reader.readAsDataURL(file);
});

renderVideos();
