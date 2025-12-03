// modules/memoryTest.js
export function startMemoryTest(app, onDone) {
  // Simon-like small sequence: o usuário repete sequência de números
  let sequence = [];
  let index = 0;
  let round = 0;
  let maxRounds = 3;

  function nextRound() {
    round++;
    index = 0;
    sequence = [];
    // gerar sequência (round+2 números)
    for (let i = 0; i < round + 2; i++) {
      sequence.push(Math.floor(Math.random() * 9) + 1);
    }
    showSequence();
  }

  function showSequence() {
    renderScreen(`
      <div class="screen">
        <h1>Memória de Trabalho</h1>
        <p>Memorize a sequência. Vai aparecer um número por vez.</p>
        <div id="showNumber" style="font-size:3rem; margin:20px 0;"></div>
        <div id="buttons"></div>
      </div>
    `);

    let i = 0;
    const display = document.getElementById("showNumber");
    const interval = setInterval(() => {
      if (i >= sequence.length) {
        clearInterval(interval);
        setTimeout(showInputButtons, 600);
        return;
      }
      display.innerText = sequence[i];
      i++;
    }, 800);
  }

  function showInputButtons() {
    const buttons = document.getElementById("buttons");
    buttons.innerHTML = `
      <p>Repita a sequência clicando nos números na ordem correta:</p>
      <div id="numGrid" style="display:flex; gap:8px; flex-wrap:wrap; justify-content:center;"></div>
      <div style="margin-top:12px;"><button id="resetRound">Reset Round</button></div>
    `;
    const grid = document.getElementById("numGrid");
    for (let n = 1; n <= 9; n++) {
      const b = document.createElement("button");
      b.innerText = n;
      b.style.padding = "12px";
      b.style.minWidth = "48px";
      b.addEventListener("click", () => handleInput(n));
      grid.appendChild(b);
    }
    document.getElementById("resetRound").addEventListener("click", () => nextRound());
  }

  let inputPos = 0;
  function handleInput(num) {
    if (num === sequence[inputPos]) {
      inputPos++;
      if (inputPos >= sequence.length) {
        // round vencido
        if (round >= maxRounds) {
          finishTest();
        } else {
          // próximo round
          inputPos = 0;
          nextRound();
        }
      }
    } else {
      // erro: terminar com resultado parcial
      finishTest();
    }
  }

  function finishTest() {
    renderScreen(`
      <div class="screen">
        <h1>Resultado: Memória</h1>
        <p>Você finalizou o teste de memória.</p>
        <button id="proximoFoco">Próximo: Foco</button>
      </div>
    `);
    document.getElementById("proximoFoco").addEventListener("click", () => onDone && onDone());
  }

  function renderScreen(html) {
    app.innerHTML = html;
  }

  // start
  nextRound();
}
