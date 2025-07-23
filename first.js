
  function playAudio(playerId) {
    const audio = document.getElementById(playerId);
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
