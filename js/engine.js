export class Engine {
  /**
   * @param {object} story  la mappa delle scene (da story.js)
   * @param {object} dom    elementi: sceneEl, controlsEl, restartBtn,
   *                                  gameScreen, letterScreen, letter{Title,Body,Sign}
   */
  constructor(story, dom) {
    this.story = story;
    this.dom = dom;
    this.dom.restartBtn.addEventListener("click", () => this.restart());
    this.dom.restartBtn2.addEventListener("click", () => this.restart());
    this.defaultAvatar = this.dom.avatarImg?.getAttribute("src") || "";
    this.vars = {};
  }

  start()   { this.vai("start"); }
  restart() {
    location.reload();
  }

  vai(id) {
    const s = this.story[id];
    if (!s) { console.error(`Scena "${id}" non trovata in story.js`); return; }

    // avatar della scena (se assente, torna al default)
    if (this.dom.avatarImg) {
      this.dom.avatarImg.src = s.avatar || this.defaultAvatar;
    }

    if (s.suono) {
      const sfx = new Audio(s.suono);
      sfx.volume = 0.05;               
      sfx.play().catch(() => {});
    }

    if (s.lettera) { this._mostraLettera(s.lettera); return; }

    this.dom.sceneEl.innerHTML = "";
    (s.testo || []).forEach((par, i) => {
      const p = document.createElement("p");
      p.textContent = this._sub(par);
      p.style.animationDelay = `${i * 0.35}s`;
      this.dom.sceneEl.appendChild(p);
    });

    this.dom.controlsEl.innerHTML = "";
    this.dom.restartBtn.hidden = true;

    if (s.finale) {
      const fin = document.createElement("p");
      fin.className = "ending";
      fin.textContent = this._sub(s.finale);
      fin.style.animationDelay = `${(s.testo?.length || 0) * 0.35}s`;
      this.dom.sceneEl.appendChild(fin);
      this.dom.restartBtn.hidden = false;

    } else if (s.avanti) {
      const b = this._btn("Continue", "continue");
      b.addEventListener("click", () => this.vai(s.avanti));
      this.dom.controlsEl.appendChild(b);

    } else if (s.scelte) {
      s.scelte.forEach((c) => {
        const b = this._btn(this._sub(c.testo), "choice");
        b.addEventListener("click", () => this.vai(c.vai));
        this.dom.controlsEl.appendChild(b);
      });
    }

    this.dom.gameScreen.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  _mostraLettera(l) {
    this.dom.letterTitle.textContent = this._sub(l.titolo || "");
    this.dom.letterBody.innerHTML = "";
    (l.righe || []).forEach((r) => {
      const p = document.createElement("p");
      p.textContent = this._sub(r);
      this.dom.letterBody.appendChild(p);
    });
    this.dom.letterSign.textContent = this._sub(l.firma || "");
    this.dom.gameScreen.hidden = true;
    this.dom.letterScreen.hidden = false;
    this.dom.letterScreen.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  _btn(testo, cls) {
    const b = document.createElement("button");
    b.className = cls;
    b.textContent = testo;
    return b;
  }

  _sub(t) {
    return String(t).replace(/\{(\w+)\}/g, (_, k) => this.vars[k] ?? "");
  }
}