//Audio 1
function playAudio() {
  const player = document.getElementById('audioPlayer');
   const player = document.getElementById('audioPlayer1');
   const player = document.getElementById('audioPlayer2');
  player.play();
}

function pauseAudio() {
  const player = document.getElementById('audioPlayer');
  const player = document.getElementById('audioPlayer1');
  const player = document.getElementById('audioPlayer2');
  player.pause();


function download(file) {
  const link = document.createElement('a');
  link.href = file;
  link.download = file;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
