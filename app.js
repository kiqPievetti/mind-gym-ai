// app.js
import { startMemoryTest } from "./modules/memoryTest.js";
import { startFocusTest } from "./modules/focusTest.js";
import { startLogicTest } from "./modules/logicTest.js";

const app = document.getElementById("app");

// Helper para renderizar
function render(html) {
  app.innerHTML = html;
}

// =========================
//  TELA INICIAL
// =========================
function showWelcomeScreen() {
  render(`
    <div class="screen" style="padding: 45px 30px;">
        
        <h1 style="font-size: 2.4rem; margin-bottom: 18px;">
            Mind Gym AI
        </h1>

        <p style="font-size: 1.15rem; margin-bottom: 30px; opacity: 0.9;">
            A primeira <strong>academia de inteligência</strong> do mundo.
        </p>

        <button id="startOnboardingBtn" style="margin-top: 25px;">
            Começar Agora
        </button>

        <p style="margin-top: 18px; font-size: 0.85rem; opacity: 0.5;">
            Versão MVP — Treine sua mente enquanto a IA evolui.
        </p>

    </div>
  `);

  document
    .getElementById("startOnboardingBtn")
    .addEventListener("click", startOnboarding);
}

// =========================
//  ESCOLHA DE OBJETIVO
// =========================
// =========================
//  ESCOLHA DO NÍVEL
// =========================
function showLevelSelection() {
  render(`
    <div class="screen" style="padding: 45px 30px;">

      <h1 style="font-size: 2rem;">Escolha seu nível</h1>
      <p style="opacity:0.8; margin-bottom: 25px; margin-top: 8px;">
        Isso ajuda a personalizar seus testes.
      </p>

      <div style="display:flex; flex-direction:column; gap:15px;">

        <button class="level-btn" data-level="iniciante">
          🟢 Iniciante
          <span style="display:block; opacity:0.7; font-size:0.85rem;">
            Começar com desafios leves
          </span>
        </button>

        <button class="level-btn" data-level="intermediario">
          🟡 Intermediário
          <span style="display:block; opacity:0.7; font-size:0.85rem;">
            Nível equilibrado e dinâmico
          </span>
        </button>

        <button class="level-btn" data-level="avancado">
          🔴 Avançado
          <span style="display:block; opacity:0.7; font-size:0.85rem;">
            Desafios intensos e rápidos
          </span>
        </button>

      </div>

    </div>
  `);

  document.querySelectorAll(".level-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const level = btn.getAttribute("data-level");
      saveLevel(level);
    });
  });
}

// =========================
// SALVA O OBJETIVO E INICIA TESTES
// =========================
function saveGoal(goal) {
  localStorage.setItem("userGoal", goal);

  // Agora, depois de escolher o objetivo → mostrar escolha do nível
  showLevelSelection();
}
function saveLevel(level) {
  localStorage.setItem("userLevel", level);

  // Agora sim iniciamos os testes
  startMemoryTest(app, () => {
    startFocusTest(app, () => {
      startLogicTest(app, () => {
        showFinalResults();
      });
    });
  });
}


// =========================
// RESULTADO FINAL DOS TESTES
// =========================
function showFinalResults() {
  render(`
    <div class="screen" style="padding: 45px 30px;">
      <h1>Primeira Etapa Concluída!</h1>
      <p style="opacity:0.8; margin-top:10px;">
        Seus testes cognitivos iniciais foram concluídos.
      </p>
      <button id="dailyPlanBtn" style="margin-top:20px;">Ver Plano Diário</button>
    </div>
  `);

  document
    .getElementById("dailyPlanBtn")
    .addEventListener("click", showDailyPlan);
}

// =========================
// PLANO DIÁRIO SIMPLIFICADO
// =========================
function showDailyPlan() {
  const goal = localStorage.getItem("userGoal") || "memoria";

  const plans = {
    memoria: ["Exercício de repetição (60s)", "Mini-jogo de padrão (2 rounds)"],
    foco: ["1 min de foco visual", "Detecção rápida (5 ciclos)"],
    logica: ["Puzzle rápido (2 questões)", "Sequência lógica (3 questões)"],
    disciplina: ["Tarefa de 2 minutos", "Check-in de consistência"],
  };

  const list = plans[goal].map(i => `<li>${i}</li>`).join("");

  render(`
    <div class="screen">
      <h1>Seu Plano Diário</h1>
      <ul style="text-align:left; opacity:0.95;">${list}</ul>
      <button id="voltarHome">Voltar</button>
    </div>
  `);

  document
    .getElementById("voltarHome")
    .addEventListener("click", showWelcomeScreen);
}

// =========================
// INICIALIZA
// =========================
showWelcomeScreen();
