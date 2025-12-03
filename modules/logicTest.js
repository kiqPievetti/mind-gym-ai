// modules/logicTest.js
export function startLogicTest(app, onDone) {
  const tests = [
    { seq: "2, 4, 6, 8", correct: "10" },
    { seq: "3, 6, 12, 24", correct: "48" },
    { seq: "1, 1, 2, 3, 5", correct: "8" },
    { seq: "5, 10, 15, 20", correct: "25" }
  ];

  let index = 0;
  let score = 0;

  function showQuestion() {
    if (index >= tests.length) return finish();

    const q = tests[index];
    renderScreen(`
      <div class="screen">
        <h1>Raciocínio Lógico</h1>
        <p>Complete a sequência:</p>
        <h2>${q.seq}</h2>
        <input id="logicAnswer" placeholder="Resposta" style="padding:10px; width:70%; margin-top:20px; border-radius:8px;">
        <br><br>
        <button id="enviar">Enviar</button>
      </div>
    `);

    document.getElementById("enviar").addEventListener("click", () => {
      const input = document.getElementById("logicAnswer").value.trim();
      if (input === q.correct) score++;
      index++;
      showQuestion();
    });
  }

  function finish() {
    renderScreen(`
      <div class="screen">
        <h1>Resultado: Lógica</h1>
        <p>Você acertou <strong>${score}</strong> de ${tests.length}.</p>
        <button id="finalizar">Finalizar Avaliação</button>
      </div>
    `);
    document.getElementById("finalizar").addEventListener("click", () => onDone && onDone());
  }

  function renderScreen(html) {
    app.innerHTML = html;
  }

  showQuestion();
}
