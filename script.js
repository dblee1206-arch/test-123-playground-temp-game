let mood = 50;
const GAME_OVER_MOOD = 20;

function updateExpression() {
  const character = document.getElementById("character");

  if (mood >= 70) {
    character.src = "assets/character_happy.png";
  } else if (mood >= 40) {
    character.src = "assets/character_normal.png";
  } else {
    character.src = "assets/character_angry.png";
  }
}

function selectChoice(choice) {
  const dialogue = document.getElementById("dialogue");

  if (choice === 1) {
    mood += 10;
    dialogue.innerText = "…응. 조금 괜찮아졌어.";
  } 
  else if (choice === 2) {
    mood -= 20;
    dialogue.innerText = "그 말, 정말 상처야.";
  } 
  else {
    mood -= 5;
    dialogue.innerText = "……왜 아무 말도 안 해?";
  }

  document.getElementById("mood").innerText = `기분: ${mood}`;

  updateExpression();

  if (mood <= GAME_OVER_MOOD) {
    gameOver();
  }
}

function gameOver() {
  document.getElementById("dialogue").innerText =
    "이제… 더 이상 못 버티겠어.";

  document.getElementById("choices").innerHTML =
    "<h2>💀 GAME OVER</h2>";

  document.getElementById("mood").innerText = "";
}

// 시작 시 표정 설정
updateExpression();