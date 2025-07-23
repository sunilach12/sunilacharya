
  function playAudio(audioPlayer1,audioPlayer2,audioPlayer3) {
    const audio = document.getElementById(audioPlayer1,audioPlayer2,audioPlayer3);
    audio.play();
  }

  function pauseAudio(playerId) {
    const audio = document.getElementById(playerId);
    audio.pause();
  }

  function download(fileName) {
    const link = document.createElement("a");
    link.href = fileName;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
