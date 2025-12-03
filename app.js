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

            <h1 style="font-size: 2rem; margin-bottom: 10px;">
                Qual é o seu nível atual?
            </h1>

            <p style="opacity:0.8; margin-bottom:25px;">
                Isso ajuda a IA a montar um plano ideal para você.
            </p>

            <div style="display:flex; flex-direction:column; gap:15px;">

                <button class="levelBtn" data-level="iniciante">
                    🟣 Iniciante
                    <span>Começando agora, preciso de orientação clara.</span>
                </button>

                <button class="levelBtn" data-level="intermediario">
                    🟣 Intermediário
                    <span>Já tenho alguma experiência, quero melhorar.</span>
                </button>

                <button class="levelBtn" data-level="avancado">
                    🟣 Avançado
                    <span>Busco alta performance e otimização máxima.</span>
                </button>

            </div>

        </div>
    `);

    // ativa os botões agora que o HTML foi criado
    document.querySelectorAll(".levelBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const level = btn.getAttribute("data-level");
            saveLevel(level);
        });
    });
}
function showLevelSelection() {
    render(`
        <div class="screen" style="padding: 45px 30px;">

            <h1 style="font-size: 2rem; margin-bottom: 10px;">
                Qual é o seu nível atual?
            </h1>

            <p style="opacity:0.8; margin-bottom:25px;">
                Isso ajuda a IA a montar um plano ideal para você.
            </p>

            <div style="display:flex; flex-direction:column; gap:15px;">

                <button class="levelBtn" data-level="iniciante">
                    🟣 Iniciante
                    <span>Começando agora, preciso de orientação clara.</span>
                </button>

                <button class="levelBtn" data-level="intermediario">
                    🟣 Intermediário
                    <span>Já tenho alguma experiência, quero melhorar.</span>
                </button>

                <button class="levelBtn" data-level="avancado">
                    🟣 Avançado
                    <span>Busco alta performance e otimização máxima.</span>
                </button>

            </div>

        </div>
    `);

    // ativa os botões agora que o HTML foi criado
    document.querySelectorAll(".levelBtn").forEach(btn => {
        btn.addEventListener("click", () => {
            const level = btn.getAttribute("data-level");
            saveLevel(level);
        });
    });
}
function saveLevel(level) {
    localStorage.setItem("userLevel", level);
    console.log("Nível salvo:", level);

    // Agora inicia automaticamente os testes
    startMemoryTest(app, () => {
        startFocusTest(app, () => {
            startLogicTest(app, () => {
                showFinalResults();
            });
        });
    });
}
function saveGoal(goal) {
    localStorage.setItem("userGoal", goal);

    // Depois de escolher objetivo → vai para níveis
    showLevelSelection();
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
