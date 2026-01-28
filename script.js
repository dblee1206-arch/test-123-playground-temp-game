let mood = 50;
const GAME_OVER_MOOD = 20;

function updateExpression() {
  const c = document.getElementById("character");

  if (mood >= 70) {
    c.src = "assets/character_happy.png";
  } else if (mood >= 40) {
    c.src = "assets/character_normal.png";
  } else {
    c.src = "assets/character_angry.png";
  }
}

function selectChoice(choice) {
  const d = document.getElementById("dialogue");

  if (choice === 1) {
    mood += 10;
    d.innerText = "…응. 조금 괜찮아.";
  } else if (choice === 2) {
    mood -= 20;
    d.innerText = "그 말… 상처야.";
  } else {
    mood -= 5;
    d.innerText = "……";
  }

  document.getElementById("mood").innerText = `기분: ${mood}`;
  updateExpression();

  if (mood <= GAME_OVER_MOOD) gameOver();
}

function gameOver() {
  document.getElementById("dialogue").innerText =
    "이제… 더는 못 참겠어.";

  document.getElementById("choices").innerHTML =
    "<h2>💀 GAME OVER</h2>";

  document.getElementById("mood").innerText = "";
}

updateExpression();