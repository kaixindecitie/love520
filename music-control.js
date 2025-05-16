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
let initialClick = false;
  
// 初始化第一首歌
music.src = songs[currentSongIndex].file;
songTitle.textContent = `🎶 当前：${songs[currentSongIndex].name}`;
  
// 点击页面任意位置播放音乐
document.addEventListener('click', function(e) {
    // 排除按钮点击，避免重复触发
    if (!initialClick && !e.target.closest('#music-controls')) {
        initialClick = true;
        playMusic();
    }
});
  
musicToggle.addEventListener("click", function () {
    togglePlayPause();
});
  
// 下一首按钮
nextBtn.addEventListener("click", function () {
    playNextSong();
});
  
// 播放进度控制
music.addEventListener("timeupdate", function () {
    progress.value = (music.currentTime / music.duration) * 100 || 0;

    // 如果接近结尾，手动触发切歌（防止 ended 事件被浏览器忽略）
    if (music.duration - music.currentTime < 0.3 && !music._almostEnded) {
        music._almostEnded = true;
        playNextSong();
    }
});

// 重置标志位，当播放新歌时
music.addEventListener("play", function () {
    music._almostEnded = false;
});

progress.addEventListener("input", function () {
    music.currentTime = (progress.value / 100) * music.duration;
});
  
// 播放音乐函数
function playMusic() {
    music.play()
        .then(() => {
            isMusicPlaying = true;
            updatePlayButton();
        })
        .catch(error => {
            console.error("播放失败:", error);
            // 处理自动播放被浏览器阻止的情况
            alert("由于浏览器限制，请手动点击播放按钮");
        });
}
  
// 切换播放/暂停状态
function togglePlayPause() {
    if (!isMusicPlaying) {
        playMusic();
    } else {
        music.pause();
        isMusicPlaying = false;
        updatePlayButton();
    }
}
  
// 更新播放按钮文本
function updatePlayButton() {
    musicToggle.textContent = isMusicPlaying ? "🔇 停止音乐" : "🎵 播放音乐";
}
  
// 播放下一首歌曲
function playNextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    music.src = songs[currentSongIndex].file;
    songTitle.textContent = `🎶 当前：${songs[currentSongIndex].name}`;
    
    if (isMusicPlaying) {
        playMusic();
    }
}

// 新增：快闪按钮和快速关闭弹窗逻辑
const flashBtn = document.getElementById("flash-through");
const closeBtn = document.getElementById("popup-close");

flashBtn.addEventListener("click", function () {
    let i = 0;
    const interval = setInterval(() => {
        if (i >= clickThreshold) {
            clearInterval(interval);
            popupEnabled = false;
            document.getElementById("click-status").textContent = "💌 情话已快闪完毕！";
            return;
        }
        clickCount++;
        document.dispatchEvent(new Event('click'));
        document.getElementById("click-status").textContent = `💘 快闪中...（${clickCount} / ${clickThreshold}）`;
        i++;
    }, 80); // 每 80ms 显示一条，约 40秒刷完520条
});

closeBtn.addEventListener("click", function () {
    popupEnabled = false;
    document.getElementById("click-status").textContent = "💤 情话已关闭，可随时重启";
});

// 新增：自动播放下一首的处理函数
function handleAutoPlay() {
    music.play().then(() => {
        isMusicPlaying = true;
        updatePlayButton();
    }).catch(error => {
        console.error("自动播放下一首失败:", error);
    });
}
// 监听歌曲播放结束，自动切换下一首
music.addEventListener("ended", function () {
    playNextSong();
});
music.addEventListener("timeupdate", function () {
    progress.value = (music.currentTime / music.duration) * 100 || 0;

    // 若接近末尾（例如播放到了 99.9%），当作播放结束
    if (music.duration - music.currentTime < 0.5 && !music._almostEnded) {
        music._almostEnded = true;
        playNextSong();
    }
});