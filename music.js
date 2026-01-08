function uploadMusic(file, title) {
  let music = JSON.parse(localStorage.getItem("music")) || [];
  music.push({
    id: Date.now(),
    title,
    likes: 0,
    author: getUser().username
  });
  localStorage.setItem("music", JSON.stringify(music));
}
