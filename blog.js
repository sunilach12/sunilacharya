const blogs = JSON.parse(localStorage.getItem("blogs") || "[]");

function saveBlogs() {
  localStorage.setItem("blogs", JSON.stringify(blogs));
}

function renderBlogs() {
  const all = document.getElementById("blogsContainer");
  const mine = document.getElementById("myBlogs");

  all.innerHTML = "";
  mine.innerHTML = "";

  blogs.forEach((b, i) => {
    const div = document.createElement("div");
    div.className = "blog";
    div.innerHTML = `
      <h3>${b.title}</h3>
      <p>${b.content}</p>
      <small>By ${b.author}</small>
      ${b.mine ? `<button onclick="deleteBlog(${i})">Delete</button>` : ""}
    `;
    all.appendChild(div);

    if (b.mine) mine.appendChild(div.cloneNode(true));
  });
}

document.getElementById("postBlog").onclick = () => {
  const title = blogTitle.value;
  const content = blogContent.value;
  const user = JSON.parse(localStorage.getItem("user"));

  blogs.push({
    title,
    content,
    author: user.name,
    mine: true
  });

  saveBlogs();
  renderBlogs();
};

function deleteBlog(i) {
  blogs.splice(i, 1);
  saveBlogs();
  renderBlogs();
}

renderBlogs();
