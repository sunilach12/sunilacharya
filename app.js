const user = JSON.parse(localStorage.currentUser || "{}");
if(!user.email) location.href="login.html";

// UI
userName.innerText = user.name || user.email;
profileName.innerText = user.name || user.email;
profilePic.src = user.photo || "assets/defaultavatar.png";

// Navigation
function showSection(id){
  document.querySelectorAll('.section').forEach(s=>s.classList.add('hidden'));
  document.getElementById(id).classList.remove('hidden');
}

// ---------------- BLOG SYSTEM ----------------
let blogsData = JSON.parse(localStorage.blogs || "[]");

function postBlog(){
  const blog = {
    id: Date.now(),
    title: blogTitle.value,
    text: blogText.value,
    authorEmail: user.email,
    authorName: user.name || user.email,
    authorPhoto: user.photo || "assets/defaultavatar.png",
    likes: [],
    comments: []
  };

  blogsData.unshift(blog);
  localStorage.blogs = JSON.stringify(blogsData);

  blogTitle.value="";
  blogText.value="";
  renderBlogs();
}

function likeBlog(id){
  const blog = blogsData.find(b=>b.id===id);
  if(!blog.likes.includes(user.email)){
    blog.likes.push(user.email);
  } else {
    blog.likes = blog.likes.filter(e=>e!==user.email);
  }
  localStorage.blogs = JSON.stringify(blogsData);
  renderBlogs();
}

function addComment(id){
  const input = document.getElementById("c_"+id);
  const blog = blogsData.find(b=>b.id===id);
  blog.comments.push({
    user: user.name || user.email,
    text: input.value
  });
  input.value="";
  localStorage.blogs = JSON.stringify(blogsData);
  renderBlogs();
}

function deleteBlog(id){
  blogsData = blogsData.filter(b=>b.id!==id);
  localStorage.blogs = JSON.stringify(blogsData);
  renderBlogs();
}

function renderBlogs(){
  blogs.innerHTML="";
  myBlogs.innerHTML="";

  blogsData.forEach(b=>{
    blogs.innerHTML += `
      <div class="post fade">
        <div class="post-head">
          <img src="${b.authorPhoto}">
          <b>${b.authorName}</b>
        </div>
        <h3>${b.title}</h3>
        <p>${b.text}</p>

        <button onclick="likeBlog(${b.id})">❤️ ${b.likes.length}</button>

        <input id="c_${b.id}" placeholder="Write comment">
        <button onclick="addComment(${b.id})">Comment</button>

        <div class="comments">
          ${b.comments.map(c=>`<p><b>${c.user}:</b> ${c.text}</p>`).join("")}
        </div>

        ${b.authorEmail===user.email ? 
          `<button class="danger" onclick="deleteBlog(${b.id})">Delete</button>` 
          : ""}
      </div>
    `;

    if(b.authorEmail===user.email){
      myBlogs.innerHTML += `<p>📝 ${b.title}</p>`;
    }
  });
}

renderBlogs();

// Logout
function logout(){
  localStorage.removeItem("currentUser");
  location.href="login.html";
}
