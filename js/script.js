const title = document.getElementById("title");
const text = document.getElementById("text");
const choices = document.getElementById("choices");
const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restart");

let score = 0;

const scenes = {
  start: {
    title: "Du får en mail fra “IBA IT-support”",
    text: "Mailen siger, at din studie-konto bliver lukket i dag, hvis du ikke logger ind via linket. Hvad gør du?",
    choices: [
      { text: "Jeg klikker på linket og logger ind", next: "fakeLogin", score: -2 },
      { text: "Jeg tjekker afsender og link først", next: "checkMail", score: 2 },
      { text: "Jeg sletter mailen med det samme", next: "deleteMail", score: 0 }
    ]
  },

  fakeLogin: {
    title: "Du kommer ind på en login-side",
    text: "Siden ligner skolens login, men adressen ser mærkelig ud. Den beder også om MitID-oplysninger.",
    choices: [
      { text: "Jeg skriver mine oplysninger ind", next: "badEnding", score: -3 },
      { text: "Jeg stopper og lukker siden", next: "closePage", score: 2 },
      { text: "Jeg sender linket til en ven og spørger", next: "askFriendRisk", score: -1 }
    ]
  },

  checkMail: {
    title: "Du undersøger mailen",
    text: "Du opdager, at afsenderen ikke bruger skolens officielle mailadresse. Linket ser også forkert ud.",
    choices: [
      { text: "Jeg rapporterer mailen til IT-support", next: "bestEnding", score: 3 },
      { text: "Jeg spørger en klassekammerat, om de også har fået den", next: "askFriendGood", score: 1 },
      { text: "Jeg ignorerer den bare", next: "okayEnding", score: 0 }
    ]
  },

  deleteMail: {
    title: "Du sletter mailen",
    text: "Du undgår selv at klikke, men phishing-mailen kan stadig ramme andre studerende.",
    choices: [
      { text: "Jeg gør ikke mere", next: "okayEnding", score: 0 },
      { text: "Jeg finder mailen igen og rapporterer den", next: "bestEnding", score: 3 }
    ]
  },

  closePage: {
    title: "Godt, du stoppede!",
    text: "Du nåede ikke at sende oplysningerne. Men hvis du skrev noget ind, bør du stadig ændre adgangskode.",
    choices: [
      { text: "Jeg ændrer adgangskode og kontakter IT", next: "goodEnding", score: 3 },
      { text: "Jeg gør ingenting", next: "okayEnding", score: 0 }
    ]
  },

  askFriendRisk: {
    title: "Din ven klikker også på linket",
    text: "Fordi du sendte linket videre, risikerer din ven også at blive snydt.",
    choices: [
      { text: "Jeg advarer min ven og kontakter IT", next: "goodEnding", score: 2 },
      { text: "Jeg lader som ingenting", next: "badEnding", score: -2 }
    ]
  },

  askFriendGood: {
    title: "Din klassekammerat har også fået mailen",
    text: "I finder ud af, at flere i klassen har modtaget samme besked.",
    choices: [
      { text: "Vi advarer klassen og rapporterer mailen", next: "bestEnding", score: 3 },
      { text: "Vi sletter bare vores egne mails", next: "okayEnding", score: 0 }
    ]
  },

  badEnding: {
    title: "Dårlig slutning: Dine data er i fare",
    text: "Du delte dine oplysninger på en falsk side. En hacker kan nu forsøge at få adgang til din studie-mail, filer eller andre konti.",
    choices: []
  },

  okayEnding: {
    title: "Mellem slutning: Du undgik noget af risikoen",
    text: "Du klikkede ikke nødvendigvis videre, men du fik heller ikke stoppet phishing-forsøget for andre.",
    choices: []
  },

  goodEnding: {
    title: "God slutning: Du reagerede sikkert",
    text: "Du stoppede op, tænkte dig om og tog handling. Det beskytter både dig selv og dine konti.",
    choices: []
  },

  bestEnding: {
    title: "Bedste slutning: Du gjorde det helt rigtige, og undgik at blive hacket!",
    text: "Du tjekkede afsenderen, undgik linket og rapporterede mailen. Det beskytter både dig og andre studerende.",
    choices: []
  }
};

function showScene(scene) {
  const selectedScene = scenes[scene];

  title.textContent = selectedScene.title;
  text.textContent = selectedScene.text;
  choices.innerHTML = "";

  selectedScene.choices.forEach(function(choice) {
    const button = document.createElement("button");
    button.textContent = choice.text;

    button.addEventListener("click", function() {
      score += choice.score;
      scoreEl.textContent = score;
      showScene(choice.next);
    });

    choices.appendChild(button);
  });

  if (selectedScene.choices.length === 0) {
    restartBtn.classList.remove("hidden");
  } else {
    restartBtn.classList.add("hidden");
  }
}

restartBtn.addEventListener("click", function() {
  score = 0;
  scoreEl.textContent = score;
  showScene("start");
});

showScene("start");