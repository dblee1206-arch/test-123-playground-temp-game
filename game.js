const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const upload = document.getElementById("upload");
const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const music = document.getElementById("music");

let img = new Image();
let imgLoaded = false;

let y = 200;
let velocity = 0;
let gravity = 1;
let jumping = false;

let beatInterval = 600; // 비트 간격(ms)
let lastBeat = 0;

let miss = 0;
let gameOver = false;

// 사진 업로드
upload.addEventListener("change", e => {
  const file = e.target.files[0];
  img.src = URL.createObjectURL(file);
  img.onload = () => imgLoaded = true;
});

// 점프 (클릭 / 터치)
canvas.addEventListener("click", () => {
  if (!jumping && !gameOver) {
    jumping = true;
    velocity = -15;

    // 타이밍 판정
    const now = Date.now();
    if (Math.abs(now - lastBeat) > 200) {
      miss++;
      statusText.textContent = `틀린 횟수: ${miss} / 3`;
      if (miss >= 3) endGame();
    }
  }
});

startBtn.addEventListener("click", () => {
  if (!imgLoaded) {
    alert("사진을 먼저 업로드하세요!");
    return;
  }
  music.play();
  gameLoop();
});

function endGame() {
  gameOver = true;
  music.pause();
  alert("💀 GAME OVER");
}

function update() {
  if (jumping) {
    y += velocity;
    velocity += gravity;
    if (y >= 200) {
      y = 200;
      jumping = false;
    }
  }

  // 비트 체크
  if (Date.now() - lastBeat > beatInterval) {
    lastBeat = Date.now();
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (imgLoaded) {
    ctx.drawImage(img, 130, y, 40, 40); // 1x1 느낌 캐릭터
  }
}

function gameLoop() {
  if (gameOver) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}