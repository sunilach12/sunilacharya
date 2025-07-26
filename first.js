
     function playAudio(playerId) {
      const players = ['audioPlayer1', 'audioPlayer2', 'audioPlayer3','audioPlayer4'];
      players.forEach(id => {
        const audio = document.getElementById(id);
        if (audio && id !== playerId) {
          audio.pause();
          audio.currentTime = 0;
        }
      });
      const audio = document.getElementById(playerId);
      if (audio) audio.play();
    }

    function pauseAudio(playerId) {
      const audio = document.getElementById(playerId);
      if (audio) audio.pause();
    }

  function download(fileName) {
    const link = document.createElement("a");
    link.href = fileName;
    link.download = '';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
