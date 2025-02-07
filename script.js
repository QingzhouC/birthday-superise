document.addEventListener("DOMContentLoaded", () => {
    const message = document.getElementById("message");
    const text = message.textContent;
    message.textContent = '';  // 清空文本

    let i = 0;
    const speed = 150;  // 控制打字速度，单位是毫秒

    function typeWriter() {
        if (i < text.length) {
            message.textContent += text.charAt(i);  // 每次添加一个字符
            i++;
            setTimeout(typeWriter, speed);  // 递归调用，逐个字符显示
        }
    }

    typeWriter();  // 启动打字机效果

    // 心形动画
    const canvas = document.getElementById("hearts-canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const hearts = [];

    // 创建心形
    function createHeart(x, y) {
        hearts.push({ x, y, size: Math.random() * 10 + 10, speed: Math.random() * 2 + 1 });
    }

    // 绘制心形
    function drawHearts() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        hearts.forEach((heart, index) => {
            ctx.fillStyle = "rgba(255, 105, 180, 0.7)";
            ctx.beginPath();
            ctx.arc(heart.x, heart.y, heart.size, 0, Math.PI * 2);
            ctx.fill();
            heart.y -= heart.speed;
            if (heart.y < -10) hearts.splice(index, 1);
        });
        requestAnimationFrame(drawHearts);
    }

    // 点击生成心形
    canvas.addEventListener("click", (e) => createHeart(e.clientX, e.clientY));
    drawHearts();

    // 确保音乐通过点击播放
    const music = document.getElementById("bg-music");
    document.body.addEventListener("click", () => {
        music.play().catch((error) => {
            console.log("音频播放失败:", error);
        });
    }, { once: true });
});