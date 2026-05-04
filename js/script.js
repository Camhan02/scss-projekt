const title = document.getElementById("title");
const text = document.getElementById("text");
const choices = document.getElementById("choices");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let score = 0;

const scenes = {
  start: {
    title: "Du får en mail fra IBA",
    text: "Klik på link for at logge ind!",
    choices: [
      { text: "Klik på link", next: "bad", score: -2 },
      { text: "Tjek mail", next: "good", score: 2 }
    ]
  },

  bad: {
    title: "Du blev hacket!",
    text: "Dine oplysninger er stjålet",
    choices: []
  },

  good: {
    title: "Godt valg!",
    text: "Du undgik phishing",
    choices: []
  }
};

function showScene(scene) {
  const s = scenes[scene];

  title.textContent = s.title;
  text.textContent = s.text;
  choices.innerHTML = "";

  s.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice.text;

    btn.onclick = () => {
      score += choice.score;
      scoreEl.textContent = score;
      showScene(choice.next);
    };

    choices.appendChild(btn);
  });

  if (s.choices.length === 0) {
    restartBtn.classList.remove("hidden");
  }
}

restartBtn.onclick = () => {
  score = 0;
  scoreEl.textContent = score;
  showScene("start");
};

showScene("start");