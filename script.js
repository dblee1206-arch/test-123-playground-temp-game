let mood = 50;
const GAME_OVER = 20;

function selectChoice(choice) {
  const dialogue = document.getElementById("dialogue");

  if (choice === 1) {
    mood += 10;
    dialogue.innerText = "…고마워. 조금 나아졌어.";
  } else if (choice === 2) {
    mood -= 20;
    dialogue.innerText = "그 말, 정말 최악이야.";
  } else {
    mood -= 5;
    dialogue.innerText = "…왜 아무 말도 안 해?";
  }

  document.getElementById("mood").innerText = `기분: ${mood}`;

  if (mood <= GAME_OVER) {
    gameOver();
  }
}

function gameOver() {
  document.getElementById("dialogue").innerText = "더 이상 못 참겠어.";
  document.getElementById("choices").innerHTML =
    "<h2>💀 GAME OVER</h2>";
}