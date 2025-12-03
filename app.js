// IMPORTAÇÃO DOS MÓDULOS
import { startMemoryTest } from "./modules/memoryTest.js";
import { startFocusTest } from "./modules/focusTest.js";
import { startLogicTest } from "./modules/logicTest.js";

// APP ROOT
const app = document.getElementById("app");

// =========================
//  TELA INICIAL
// =========================
function showWelcomeScreen() {
    app.innerHTML = `
        <div class="screen">
            <h1>Mind Gym AI</h1>
            <p>A primeira academia de inteligência do mundo.<br>
            Treine foco, memória, lógica e disciplina com IA.</p>
            <button onclick="startOnboarding()">Começar</button>
        </div>
    `;
}

// =========================
//  ONBOARDING
// =========================
function startOnboarding() {
    app.innerHTML = `
        <div class="screen">
            <h1>Antes de começarmos…</h1>
            <p>Qual seu objetivo principal?</p>

            <button onclick="saveGoal('memoria')">Melhorar Memória</button><br><br>
            <button onclick="saveGoal('foco')">Aumentar Foco</button><br><br>
            <button onclick="saveGoal('logica')">Raciocínio Lógico</button><br><br>
            <button onclick="saveGoal('disciplina')">Disciplina Mental</button><br><br>
        </div>
    `;
}

// =========================
//  SALVA A ESCOLHA E INICIA TESTE
// =========================
function saveGoal(goal) {
    localStorage.setItem("userGoal", goal);
    startTestFlow(goal);
}

// =========================
//  DECIDE QUAL TESTE CHAMAR
// =========================
function startTestFlow(goal) {
    if (goal === "memoria") startMemoryTest();
    else if (goal === "foco") startFocusTest();
    else if (goal === "logica") startLogicTest();
    else startDisciplineTest(); // (futuramente)
}

// INICIALIZAÇÃO
showWelcomeScreen();
