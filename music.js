const newMusicBtn = document.getElementById("newMusicBtn");
const musicFormModal = document.getElementById("musicFormModal");
const closeMusicForm = document.getElementById("closeMusicForm");
const musicForm = document.getElementById("musicForm");
const musicContainer = document.getElementById("musicContainer");

newMusicBtn.addEventListener("click", ()=> musicFormModal.classList.remove("hidden"));
closeMusicForm.addEventListener("click", ()=> musicFormModal.classList.add("hidden"));

// Render all music
function renderMusic(){
  musicContainer.innerHTML="";
  const users = JSON.parse(localStorage.getItem("users"))||[];
  users.forEach(user=>{
    user.music?.forEach(m=>{
      const div = document.createElement("div");
      div.className="music-card";
      div.innerHTML=`
        <div class="music-author">
          <img src="${m.photo||'assets/defaultavatar.png'}" class="author-photo">
          <strong>${user.firstName||user.username}</strong>
        </div>
        <h3>${m.title}</h3>
        <audio controls src="${m.file}"></audio>
        <button class="viewMusicBtn">View</button>
      `;
      div.querySelector(".viewMusicBtn").addEventListener("click", ()=>{
        localStorage.setItem("viewMusic", JSON.stringify({music:m,user}));
        window.location.href="viewMusic.html";
      });
      musicContainer.appendChild(div);
    });
  });
}

// Upload music
musicForm.addEventListener("submit", e=>{
  e.preventDefault();
  const title = document.getElementById("musicTitle").value;
  const file = document.getElementById("musicFile").files[0];
  if(!file) return;

  const reader = new FileReader();
  reader.onload = function(){
    const users = JSON.parse(localStorage.getItem("users"))||[];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const index = users.findIndex(u=>u.username===currentUser.username);

    if(!users[index].music) users[index].music=[];
    users[index].music.push({
      title,
      file: reader.result,
      author: currentUser.username,
      photo: currentUser.photo,
      timestamp: Date.now()
    });

    localStorage.setItem("users", JSON.stringify(users));
    currentUser.music = users[index].music;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    musicForm.reset();
    musicFormModal.classList.add("hidden");
    renderMusic();
  };
  reader.readAsDataURL(file);
});

renderMusic();
