function uploadVideo(url) {
  let videos = JSON.parse(localStorage.getItem("videos")) || [];
  videos.push({
    id: Date.now(),
    url,
    likes: 0,
    author: getUser().username
  });
  localStorage.setItem("videos", JSON.stringify(videos));
}

