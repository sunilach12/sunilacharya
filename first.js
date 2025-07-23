//Audio 1
function playAudio() {
  const player = document.getElementById('audioPlayer');
   const player1 = document.getElementById('audioPlayer1');
   const player2 = document.getElementById('audioPlayer2');
  
}

function pauseAudio() {
  const player = document.getElementById('audioPlayer');
  const player1 = document.getElementById('audioPlayer1');
  const player2 = document.getElementById('audioPlayer2');
  player.pause();
  player1.pause();
  player2.pause();
}

function download(file) {
  const link = document.createElement('a');
  link.href = file;
  link.download = file;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
