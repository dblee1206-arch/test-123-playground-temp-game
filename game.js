const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const upload = document.getElementById("upload");
const startBtn = document.getElementById("startBtn");
const statusText = document.getElementById("status");
const music = document.getElementById("music");

let img = new Image();
let imgLoaded = false;

// 플레이어
let y = 200;
let velocity = 0;
let gravity = 1;
let jumping = false;

// 비트
let beatInterval = 600; // 박자 (숫자 줄이면 빨라짐)
let lastBeat = 0;
let beatY = 0;
let beatActive = false;
const beatSpeed = 5;

// 게임 상태
let miss = 0;
let gameOver = false;

// 사진 업로드
upload.addEventListener("change", e => {
  const file = e.target.files[0];
  img.src = URL.createObjectURL(file);
  img.onload = () => imgLoaded = true;
});

// 점프 판정 (터치)
canvas.addEventListener("click", () => {
  if (gameOver || jumping) return;

  // 비트 타이밍 판정
  if (beatActive && beatY > 170 && beatY < 230) {
    jumping = true;
    velocity = -15;
    beatActive = false; // 성공
  } else {
    miss++;
    statusText.textContent = `틀린 횟수: ${miss} / 3`;
    if (miss >= 3) endGame();
  }
});

// 시작
startBtn.addEventListener("click", () => {
  if (!imgLoaded) {
    alert("사진을 먼저 업로드하세요!");
    return;
  }
  miss = 0;
  gameOver = false;
  statusText.textContent = `틀린 횟수: 0 / 3`;
  music.currentTime = 0;
  music.play();
  lastBeat = Date.now();
  gameLoop();
});

// 게임 종료
function endGame() {
  gameOver = true;
  music.pause();
  alert("💀 GAME OVER");
}

// 업데이트
function update() {
  // 플레이어 물리
  if (jumping) {
    y += velocity;
    velocity += gravity;
    if (y >= 200) {
      y = 200;
      jumping = false;
    }
  }

  // 비트 생성
  if (!beatActive && Date.now() - lastBeat > beatInterval) {
    beatActive = true;
    beatY = 0;
    lastBeat = Date.now();
  }

  // 비트 이동
  if (beatActive) {
    beatY += beatSpeed;
    if (beatY > 230) {
      beatActive = false;
      miss++;
      statusText.textContent = `틀린 횟수: ${miss} / 3`;
      if (miss >= 3) endGame();
    }
  }
}

// 그리기
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 바닥선
  ctx.beginPath();
  ctx.moveTo(0, 230);
  ctx.lineTo(300, 230);
  ctx.stroke();

  // 비트 원
  if (beatActive) {
    ctx.beginPath();
    ctx.arc(150, beatY, 12, 0, Math.PI * 2);
    ctx.fillStyle = "red";
    ctx.fill();
  }

  // 캐릭터 (사진)
  if (imgLoaded) {
    ctx.drawImage(img, 130, y, 40, 40);
  }
}

// 루프
function gameLoop() {
  if (gameOver) return;
  update();
  draw();
  requestAnimationFrame(gameLoop);
}