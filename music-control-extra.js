
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
