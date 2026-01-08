// ---------------- ELEMENTS ----------------
const menuBtn = document.getElementById('menuBtn');
const sideMenu = document.getElementById('sideMenu');
const settingsBtn = document.getElementById('settingsBtn');
const settingsDropdown = document.getElementById('settingsDropdown');
const darkModeToggle = document.getElementById('darkModeToggle');
const logoutBtn = document.getElementById('logoutBtn');

const homeBtn = document.getElementById('homeBtn');
const musicBtn = document.getElementById('musicBtn');
const blogBtn = document.getElementById('blogBtn');
const homeSection = document.getElementById('homeSection');
const musicLibrarySection = document.getElementById('musicLibrarySection');
const blogSection = document.getElementById('blogSection');

const overlay = document.getElementById('musicPlayerOverlay');
const playPauseBtn = document.getElementById('playPauseBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const shuffleBtn = document.getElementById('shuffleBtn');
const audio = new Audio();
const songs = Array.from(document.querySelectorAll('.song-card'));
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const durationEl = document.getElementById('duration');

let currentIndex = 0;
let shuffleMode = false;

// ---------------- MENU ----------------
menuBtn.addEventListener('click', () => sideMenu.classList.toggle('active'));
settingsBtn.addEventListener('click', () => settingsDropdown.classList.toggle('visible'));

// ---------------- DARK MODE ----------------
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    darkModeToggle.checked = true;
  } else {
    document.body.classList.remove('dark-mode');
    darkModeToggle.checked = false;
  }
});

darkModeToggle.addEventListener('change', () => {
  if (darkModeToggle.checked) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('theme', 'dark');
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('theme', 'light');
  }
});

// ---------------- LOGOUT ----------------
logoutBtn.addEventListener('click', () => {
  alert("You have been logged out!");
  // Optional: window.location.href = "login.html";
});

// ---------------- NAVIGATION ----------------
function hideAllSections() {
  homeSection.classList.add('hidden');
  musicLibrarySection.classList.add('hidden');
  blogSection.classList.add('hidden');
}
function closeMenu() { sideMenu.classList.remove('active'); }

function navigate(section) {
  hideAllSections();
  section.classList.remove('hidden');
  localStorage.setItem('currentSection', section.id);
  closeMenu();
}

const savedSection = localStorage.getItem('currentSection') || 'homeSection';
navigate(document.getElementById(savedSection));

homeBtn.addEventListener('click', () => navigate(homeSection));
musicBtn.addEventListener('click', () => navigate(musicLibrarySection));
blogBtn.addEventListener('click', () => navigate(blogSection));

// ---------------- MUSIC PLAYER ----------------
function playSong(index) {
  const song = songs[index];
  const title = song.getAttribute('data-title');
  const artist = song.getAttribute('data-artist');
  const img = song.getAttribute('data-img');
  const url = song.getAttribute('data-url');

  audio.src = url;
  audio.play();
  overlay.classList.remove('hidden');

  document.getElementById('playerTitle').innerText = title;
  document.getElementById('playerArtist').innerText = artist;
  document.getElementById('playerImg').src = img;
  document.getElementById('downloadBtn').href = url;
  document.getElementById('downloadBtn').setAttribute('download', `${title}.mp3`);
  playPauseBtn.innerText = "⏸";
  currentIndex = index;
}

songs.forEach((song, i) => song.addEventListener('click', () => playSong(i)));

playPauseBtn.addEventListener('click', () => {
  if(audio.paused) { audio.play(); playPauseBtn.innerText="⏸"; }
  else { audio.pause(); playPauseBtn.innerText="▶"; }
});

nextBtn.addEventListener('click', () => {
  if(shuffleMode) currentIndex = Math.floor(Math.random()*songs.length);
  else currentIndex = (currentIndex+1)%songs.length;
  playSong(currentIndex);
});

prevBtn.addEventListener('click', () => {
  if(shuffleMode) currentIndex = Math.floor(Math.random()*songs.length);
  else currentIndex = (currentIndex-1+songs.length)%songs.length;
  playSong(currentIndex);
});

shuffleBtn.addEventListener('click', () => {
  shuffleMode = !shuffleMode;
  shuffleBtn.style.background = shuffleMode ? "#1DB954" : "#555";
});

document.getElementById('closePlayer').addEventListener('click', () => {
  overlay.classList.add('hidden');
  audio.pause();
});

audio.addEventListener('timeupdate', () => {
  const progress = (audio.currentTime/audio.duration)*100;
  progressBar.value = progress || 0;
  currentTimeEl.innerText = formatTime(audio.currentTime);
  durationEl.innerText = formatTime(audio.duration || 0);
});

progressBar.addEventListener('input', () => {
  audio.currentTime = (progressBar.value/100)*audio.duration;
});

function formatTime(time) {
  const minutes = Math.floor(time/60)||0;
  const seconds = Math.floor(time%60)||0;
  return `${minutes}:${seconds<10?'0':''}${seconds}`;
}
