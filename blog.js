// Elements
const newBlogBtn = document.getElementById("newBlogBtn");
const blogFormModal = document.getElementById("blogFormModal");
const closeBlogForm = document.getElementById("closeBlogForm");
const blogForm = document.getElementById("blogForm");
const blogsContainer = document.getElementById("blogsContainer");

newBlogBtn.addEventListener("click", ()=> blogFormModal.classList.remove("hidden"));
closeBlogForm.addEventListener("click", ()=> blogFormModal.classList.add("hidden"));

// Render all blogs from all users
function renderBlogs(){
  blogsContainer.innerHTML="";
  const users = JSON.parse(localStorage.getItem("users"))||[];
  users.forEach(user=>{
    user.blogs?.forEach(blog=>{
      const div = document.createElement("div");
      div.className = "blog-card";
      div.innerHTML = `
        <div class="blog-author">
          <img src="${blog.photo||'assets/defaultavatar.png'}" class="author-photo">
          <strong>${user.firstName||user.username}</strong>
        </div>
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        ${blog.image?`<img src="${blog.image}" class="blog-img">`:""}
        <button class="viewBlogBtn">View</button>
      `;
      div.querySelector(".viewBlogBtn").addEventListener("click", ()=>{
        localStorage.setItem("viewBlog", JSON.stringify({blog,user}));
        window.location.href="viewBlog.html";
      });
      blogsContainer.appendChild(div);
    });
  });
}

// Post a new blog
blogForm.addEventListener("submit", e=>{
  e.preventDefault();
  const title = document.getElementById("blogTitle").value;
  const content = document.getElementById("blogContent").value;
  const imageFile = document.getElementById("blogImage").files[0];
  const reader = new FileReader();

  reader.onload = function(){
    const users = JSON.parse(localStorage.getItem("users"))||[];
    let currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const index = users.findIndex(u=>u.username===currentUser.username);

    if(!users[index].blogs) users[index].blogs=[];
    users[index].blogs.push({
      title, content,
      image: reader.result||null,
      author: currentUser.username,
      photo: currentUser.photo,
      timestamp: Date.now()
    });

    localStorage.setItem("users", JSON.stringify(users));
    currentUser.blogs = users[index].blogs;
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    blogForm.reset();
    blogFormModal.classList.add("hidden");
    renderBlogs();
  };

  if(imageFile) reader.readAsDataURL(imageFile);
  else reader.onload();
});

renderBlogs();
