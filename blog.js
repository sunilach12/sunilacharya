// Elements
const blogForm = document.getElementById("blogForm");
const blogsContainer = document.getElementById("blogsContainer");

// Current user
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let users = JSON.parse(localStorage.getItem("users")) || [];

// Submit blog
blogForm.addEventListener("submit", e => {
  e.preventDefault();
  const title = document.getElementById("blogTitle").value.trim();
  const content = document.getElementById("blogContent").value.trim();
  if(!title || !content) return showNotification("Please enter title and content", "#FF4B5C");

  const blog = { title, content, date: new Date().toLocaleString() };

  // Save to current user
  currentUser.blogs = currentUser.blogs || [];
  currentUser.blogs.push(blog);

  // Update users array
  const index = users.findIndex(u => u.username === currentUser.username);
  users[index] = currentUser;

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("currentUser", JSON.stringify(currentUser));

  showNotification("Blog posted!", "#1DB954");
  blogForm.reset();
  renderBlogs();
  updateProfileUI(); // Update recent activity
});

// Render blogs for all users
function renderBlogs() {
  blogsContainer.innerHTML = "";
  users.forEach(u => {
    u.blogs?.forEach((blog, idx) => {
      const div = document.createElement("div");
      div.className = "blog-card animated-blogs";
      div.innerHTML = `
        <h3>${blog.title}</h3>
        <p>${blog.content}</p>
        <small>By: ${u.firstName||u.username} (${u.date || ""})</small>
        ${u.username === currentUser.username ? '<button class="deleteBtn">Delete</button>' : ""}
      `;
      // Delete functionality
      if(u.username === currentUser.username){
        div.querySelector(".deleteBtn").addEventListener("click", () => {
          currentUser.blogs.splice(idx, 1);
          const i = users.findIndex(user => user.username === currentUser.username);
          users[i] = currentUser;
          localStorage.setItem("users", JSON.stringify(users));
          localStorage.setItem("currentUser", JSON.stringify(currentUser));
          showNotification("Blog deleted!", "#FF4B5C");
          renderBlogs();
          updateProfileUI();
        });
      }
      blogsContainer.appendChild(div);
    });
  });
}

// Initial render
renderBlogs();
