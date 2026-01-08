const searchUser = document.getElementById("searchUser");
const searchResults = document.getElementById("searchResults");

searchUser.addEventListener("input", ()=>{
  const query = searchUser.value.toLowerCase();
  searchResults.innerHTML = "";
  if(!query) return;
  const users = JSON.parse(localStorage.getItem("users"))||[];
  users.filter(u => u.username.toLowerCase().includes(query) || (u.firstName||"").toLowerCase().includes(query))
       .forEach(u=>{
         const div = document.createElement("div");
         div.className="search-result-card";
         div.innerHTML=`<img src="${u.photo||'assets/defaultavatar.png'}" class="author-photo"><strong>${u.firstName||u.username}</strong>`;
         searchResults.appendChild(div);
       });
});
