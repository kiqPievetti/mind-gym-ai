// app.js
import { startMemoryTest } from "./modules/memoryTest.js";
import { startFocusTest } from "./modules/focusTest.js";
import { startLogicTest } from "./modules/logicTest.js";

const app = document.getElementById("app");

// Helper para renderizar HTML e depois permitir bind de listeners
function render(html) {
  app.innerHTML = html;
}

// =========================
//  TELA INICIAL
// =========================
function showWelcomeScreen() {
  render(`
    <div class="screen">
      <h1>Mind Gym AI</h1>
      <p>A primeira academia de inteligência do mundo.<br>
      Treine foco, memória, lógica e disciplina com IA.</p>
      <button id="startBtn">Começar</button>
    </div>
  `);

  document.getElementById("startBtn").addEventListener("click", startOnboarding);
}

// =========================
//  ONBOARDING
// =========================
function startOnboarding() {
  render(`
    <div class="screen">
      <h1>Antes de começarmos…</h1>
      <p>Qual seu objetivo principal?</p>
      <div style="display:flex; flex-direction:column; gap:10px; margin-top:12px;">
        <button data-goal="memoria" class="goalBtn">Melhorar Memória</button>
        <button data-goal="foco" class="goalBtn">Aumentar Foco</button>
        <button data-goal="logica" class="goalBtn">Raciocínio Lógico</button>
        <button data-goal="disciplina" class="goalBtn">Disciplina Mental</button>
      </div>
    </div>
  `);

  document.querySelectorAll(".goalBtn").forEach(btn => {
    btn.addEventListener("click", () => {
      const goal = btn.getAttribute("data-goal");
      saveGoal(goal);
    });
  });
}

// =========================
//  SALVA A ESCOLHA E INICIA SEQUÊNCIA DE TESTES
// =========================
function saveGoal(goal) {
  localStorage.setItem("userGoal", goal);
  // Starta a sequência completa de testes:
  // Memória -> Foco -> Lógica (cada módulo chama o próximo via callback)
  startMemoryTest(app, () => {
    startFocusTest(app, () => {
      startLogicTest(app, () => {
        showFinalResults();
      });
    });
  });
}

// =========================
//  MOSTRA RESULTADO FINAL / PLANO DIARIO
// =========================
function showFinalResults() {
  const goal = localStorage.getItem("userGoal") || "memoria";
  render(`
    <div class="screen">
      <h1>Avaliação Final</h1>
      <p>Você concluiu os testes cognitivos!</p>
      <p>Objetivo escolhido: <strong>${goal}</strong></p>
      <button id="verPlano">Ver plano diário</button>
    </div>
  `);
  document.getElementById("verPlano").addEventListener("click", showDailyPlan);
}

// =========================
//  PLANO DIÁRIO (MVP simples)
// =========================
function showDailyPlan() {
  const goal = localStorage.getItem("userGoal") || "memoria";

  const plans = {
    memoria: ["Exercício de repetição (60s)", "Mini-jogo de padrão (2 rounds)"],
    foco: ["1 min de foco visual", "Detecção rápida (5 ciclos)"],
    logica: ["Puzzle rápido (2 questões)", "Sequência lógica (3 questões)"],
    disciplina: ["Tarefa de 2 minutos", "Check-in de consistência"]
  };

  let list = plans[goal].map(i => `<li>${i}</li>`).join("");

  render(`
    <div class="screen">
      <h1>Seu Plano Diário</h1>
      <ul style="text-align:left; opacity:0.95;">${list}</ul>
      <button id="voltarHome">Voltar</button>
    </div>
  `);

  document.getElementById("voltarHome").addEventListener("click", showWelcomeScreen);
}

// Inicializa
showWelcomeScreen();
