
const songs = [
  { name: "告白气球", file: "music/love-song-1.mp3" },
  { name: "恋爱循环", file: "music/love-song-2.mp3" },
  { name: "多远都要在一起", file: "music/love-song-3.mp3" }
];

let currentSongIndex = 0;
const music = document.getElementById("bg-music");
const musicToggle = document.getElementById("music-toggle");
const songTitle = document.getElementById("song-title");
const progress = document.getElementById("music-progress");
const nextBtn = document.getElementById("next-song");

let isMusicPlaying = false;

// 初始化第一首歌
music.src = songs[currentSongIndex].file;
songTitle.textContent = `🎶 当前：${songs[currentSongIndex].name}`;

musicToggle.addEventListener("click", function () {
    if (!isMusicPlaying) {
        music.play();
        musicToggle.textContent = "🔇 停止音乐";
    } else {
        music.pause();
        musicToggle.textContent = "🎵 播放音乐";
    }
    isMusicPlaying = !isMusicPlaying;
});

// 下一首按钮
nextBtn.addEventListener("click", function () {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    music.src = songs[currentSongIndex].file;
    songTitle.textContent = `🎶 当前：${songs[currentSongIndex].name}`;
    if (isMusicPlaying) {
        music.play();
    }
});

// 播放进度控制
music.addEventListener("timeupdate", function () {
    progress.value = (music.currentTime / music.duration) * 100 || 0;
});

progress.addEventListener("input", function () {
    music.currentTime = (progress.value / 100) * music.duration;
});
