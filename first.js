function download(file) {
  const link = document.createElement('a');
  link.href = file;
  link.download = file;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function playMusic() {
  const audio = document.getElementById("mysong");
  audio.play();
}
