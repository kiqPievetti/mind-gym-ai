// modules/focusTest.js
export function startFocusTest(app, onDone) {
  let attempts = 10;
  let score = 0;

  function nextStimulus() {
    if (attempts <= 0) return finish();

    attempts--;
    const isGo = Math.random() < 0.6; // verdadeiro = clicar
    renderScreen(`
      <div class="screen">
        <h1>Foco Sustentado</h1>
        <p>Clique no botão apenas quando estiver verde.</p>
        <div id="box" style="width:160px;height:160px;border-radius:12px;margin:20px auto;background:${isGo ? "green" : "red"}"></div>
        <div style="display:flex;gap:12px;justify-content:center;">
          <button id="clicked">Cliquei</button>
          <button id="skip">Pular</button>
        </div>
      </div>
    `);

    document.getElementById("clicked").addEventListener("click", () => {
      if (isGo) score += 1;
      else score -= 1;
      nextStimulus();
    });
    document.getElementById("skip").addEventListener("click", () => {
      // pular conta como neutro
      nextStimulus();
    });
  }

  function finish() {
    if (score < 0) score = 0;
    renderScreen(`
      <div class="screen">
        <h1>Resultado: Foco</h1>
        <p>Pontuação: <strong>${score}</strong></p>
        <button id="proximoLogica">Próximo: Lógica</button>
      </div>
    `);
    document.getElementById("proximoLogica").addEventListener("click", () => onDone && onDone());
  }

  function renderScreen(html) {
    app.innerHTML = html;
  }

  nextStimulus();
}
