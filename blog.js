function postBlog(title, text, image) {
  let blogs = JSON.parse(localStorage.getItem("blogs")) || [];
  blogs.push({
    id: Date.now(),
    title,
    text,
    image,
    likes: 0,
    comments: [],
    author: getUser().username,
    locked: false
  });
  localStorage.setItem("blogs", JSON.stringify(blogs));
}
