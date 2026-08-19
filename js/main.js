import { story } from "./story.js";
import { Engine } from "./engine.js";

const PASSWORD = "cutie";

let frase = "";

// Musica di sottofondo
const bgm = new Audio("assets/music.mp3");   
bgm.loop = true;
bgm.volume = 0.05;

// Schermata iniziale
const startScreen  = document.getElementById("start-screen");
const passwordInput = document.getElementById("password");
const enterBtn     = document.getElementById("enter");
const errorMsg     = document.getElementById("error");

// Motore
const engine = new Engine(story, {
  avatarImg:    document.querySelector(".avatar"),
  sceneEl:      document.getElementById("scene"),
  controlsEl:   document.getElementById("controls"),
  restartBtn:   document.getElementById("restart"),
  restartBtn2:  document.getElementById("restart2"),
  gameScreen:   document.getElementById("game-screen"),
  letterScreen: document.getElementById("letter-screen"),
  letterTitle:  document.getElementById("letter-title"),
  letterBody:   document.getElementById("letter-body"),
  letterSign:   document.getElementById("letter-sign"),
});


function salvaFrase() {
  const val = passwordInput.value.trim();
  if (val === "") {           // se vuoto, non proseguire
    errorMsg.hidden = false;
    passwordInput.focus();
    return;
  }
  frase = val;
  engine.vars.frase = frase;  // la passi al motore
  startScreen.hidden = true;
  document.getElementById("game-screen").hidden = false;
  engine.start();
}

function avviaMusica() {
  bgm.play().catch(() => {});
}

enterBtn.addEventListener("click", salvaFrase);
passwordInput.addEventListener("keydown", (e) => { if (e.key === "Enter") salvaFrase(); });
document.addEventListener("click", avviaMusica, { once: true });
passwordInput.addEventListener("input", () => { errorMsg.hidden = true; });
passwordInput.focus();


document.querySelectorAll(".floaty").forEach((el, i) => {
  function muovi() {
    if (startScreen.hidden) return;
    const pad = 60;
    el.style.left = pad + Math.random() * (innerWidth  - pad * 2) + "px";
    el.style.top  = pad + Math.random() * (innerHeight - pad * 2) + "px";
    el.style.opacity = "1";
    setTimeout(() => (el.style.opacity = "0"), 1200 + Math.random() * 1500);
  }
  setTimeout(muovi, i * 700);
  setInterval(muovi, 4000 + Math.random() * 3000);
});