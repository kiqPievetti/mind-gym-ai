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
    app.innerHTML = `
        <div class="screen" style="padding: 45px 30px;">
            
            <h1 style="font-size: 2.4rem; margin-bottom: 18px;">
                Mind Gym AI
            </h1>

            <p style="font-size: 1.15rem; margin-bottom: 30px; opacity: 0.9;">
                A primeira <strong>academia de inteligência</strong> do mundo.
                Melhore foco, memória, lógica e disciplina com treinos guiados por IA.
            </p>

            <div style="
                margin: 25px 0;
                background: rgba(150,70,255,0.12);
                padding: 20px;
                border-radius: 14px;
                border: 1px solid rgba(150,70,255,0.25);
                box-shadow: inset 0 0 18px rgba(150,70,255,0.2);
            ">
                <p style="font-size: 1rem; opacity: 0.85;">
                    🔥 Em menos de 2 minutos você terá:
                </p>
                <ul style="margin-top: 12px; text-align:left;">
                    <li>• Um perfil cognitivo inicial</li>
                    <li>• Seu primeiro teste mental</li>
                    <li>• Seu plano diário personalizado</li>
                </ul>
            </div>

            <button onclick="startOnboarding()" style="margin-top: 25px;">
                Começar Agora
            </button>

            <p style="margin-top: 18px; font-size: 0.85rem; opacity: 0.5;">
                Versão MVP — Treine sua mente enquanto a IA evolui.
            </p>

        </div>
    `;
}


  document.getElementById("startBtn").addEventListener("click", startOnboarding);
}

// =========================
//  ONBOARDING
// =========================
function startOnboarding() {
    app.innerHTML = `
        <div class="screen" style="padding: 45px 30px;">

            <h1 style="font-size: 2.1rem; margin-bottom: 10px;">
                Vamos personalizar seu treino
            </h1>

            <p style="font-size: 1.1rem; margin-bottom: 25px; opacity: 0.85;">
                Escolha seu foco principal. A IA vai criar um programa específico para você.
            </p>

            <div style="display: flex; flex-direction: column; gap: 15px; margin-top: 20px;">

                <button onclick="saveGoal('memoria')" class="goal-btn">
                    🧠 Melhorar Memória
                    <span>Exercícios de retenção e padrões</span>
                </button>

                <button onclick="saveGoal('foco')" class="goal-btn">
                    🎯 Aumentar Foco
                    <span>Reação, atenção sustentada e precisão</span>
                </button>

                <button onclick="saveGoal('logica')" class="goal-btn">
                    🔢 Raciocínio Lógico
                    <span>Padrões, cálculos mentais e puzzles</span>
                </button>

                <button onclick="saveGoal('disciplina')" class="goal-btn">
                    🔥 Disciplina Mental
                    <span>Consistência, hábitos e micro-tarefas</span>
                </button>

            </div>

            <p style="margin-top: 25px; font-size: 0.85rem; opacity: 0.4;">
                A personalização leva menos de 30 segundos.
            </p>

        </div>
    `;
}


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
function showResults(reactionTime) {
    const goal = localStorage.getItem("userGoal");

    let nivel = "";
    if (reactionTime < 220) nivel = "Excelente";
    else if (reactionTime < 350) nivel = "Bom";
    else if (reactionTime < 500) nivel = "Regular";
    else nivel = "Precisa melhorar";

    app.innerHTML = `
        <div class="screen" style="padding: 45px 30px;">

            <h1 style="font-size: 2rem; margin-bottom: 10px;">
                Seu Desempenho
            </h1>

            <p style="font-size: 1.1rem; margin-bottom: 25px; opacity:0.85;">
                Tempo de reação:
                <strong style="color:#b26bff">${reactionTime} ms</strong>
            </p>

            <div style="
                padding: 20px;
                background: rgba(150,70,255,0.15);
                border-radius: 14px;
                border: 1px solid rgba(150,70,255,0.25);
                margin-bottom: 25px;
                box-shadow: inset 0 0 18px rgba(150,70,255,0.25);
            ">
                <p style="font-size:1.1rem; margin-bottom:8px;">
                    <strong>Nível: ${nivel}</strong>
                </p>
                <p style="font-size:0.9rem; opacity:0.8;">
                    Objetivo escolhido: <u>${goal}</u>
                </p>
            </div>

            <button onclick="showDailyPlan()">Ver Plano Diário</button>

        </div>
    `;
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
function startTest() {
    app.innerHTML = `
        <div class="screen" style="padding: 45px 30px;">

            <h1 style="font-size: 2rem; margin-bottom: 10px;">
                Teste de Foco Inicial
            </h1>

            <p style="font-size: 1rem; opacity: 0.75; margin-bottom: 20px;">
                Quando o círculo ficar <strong style="color:#b26bff">roxo</strong>, toque o mais rápido possível.
            </p>

            <div id="focus-area" style="
                width: 140px;
                height: 140px;
                margin: 40px auto;
                border-radius: 50%;
                background: rgba(255,255,255,0.08);
                display: flex;
                align-items: center;
                justify-content: center;
                transition: 0.2s;
                cursor: pointer;
                box-shadow: 0 0 20px rgba(150,70,255,0.15);
            ">
            </div>

            <p id="test-status" style="margin-top: 15px; opacity:0.5; font-size: 0.85rem;">
                Aguarde o círculo mudar de cor…
            </p>
        </div>
    `;

    const area = document.getElementById("focus-area");
    const status = document.getElementById("test-status");

    let canClick = false;
    let startTime;

    // Tempo aleatório antes do círculo ficar roxo
    const delay = Math.random() * 2500 + 2000;

    setTimeout(() => {
        area.style.background = "rgba(150,70,255,0.6)";
        area.style.boxShadow = "0 0 25px rgba(150,70,255,0.6)";
        status.innerHTML = "Clique agora!";
        canClick = true;
        startTime = Date.now();
    }, delay);

    area.onclick = () => {
        if (!canClick) {
            status.innerHTML = "Muito cedo! Tente esperar a cor roxa.";
            status.style.color = "#ff6b6b";
            return;
        }
        const reaction = Date.now() - startTime;
        showResults(reaction);
    };
}
