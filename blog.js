const blogForm = document.getElementById("blogForm");
const blogsContainer = document.getElementById("blogsContainer");

function renderBlogs(){
  blogsContainer.innerHTML = "";
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const blogs = currentUser.blogs || [];
  blogs.forEach((b,i)=>{
    const div = document.createElement("div");
    div.className = "blog-card";
    div.innerHTML = `
      <h3>${b.title}</h3>
      <p>${b.content}</p>
      ${b.image ? `<img src="${b.image}" class="blog-img">` : ""}
      <small>Posted by you</small>
    `;
    blogsContainer.appendChild(div);
  });
}

blogForm.addEventListener("submit", e=>{
  e.preventDefault();
  const title = document.getElementById("blogTitle").value;
  const content = document.getElementById("blogContent").value;
  const imageFile = document.getElementById("blogImage")?.files[0];
  const reader = new FileReader();

  reader.onload = function(){
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if(!currentUser.blogs) currentUser.blogs = [];
    currentUser.blogs.push({
      title,
      content,
      image: reader.result || null
    });
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
    blogForm.reset();
    renderBlogs();
    showNotification("Blog posted!");
  }

  if(imageFile){
    reader.readAsDataURL(imageFile);
  } else {
    reader.onload();
  }
});

// Render on page load
renderBlogs();
