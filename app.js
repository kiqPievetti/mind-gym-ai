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
//  ONBOARDING (próxima etapa)
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
//  SALVA A OPÇÃO E VAI PARA PRÓXIMA TELA
// =========================
function saveGoal(goal) {
    localStorage.setItem("userGoal", goal);
    startTest();
}

// =========================
//  TESTE (versão MVP simples)
// =========================
function startTest() {
    app.innerHTML = `
        <div class="screen">
            <h1>Teste Inicial</h1>
            <p>Vamos medir sua velocidade de resposta. Clique o mais rápido possível quando o botão aparecer.</p>
            <button id="startTestBtn">Iniciar Teste</button>
        </div>
    `;

    setTimeout(() => {
        let btn = document.getElementById("startTestBtn");
        btn.innerText = "CLIQUE AGORA!";
        let start = Date.now();

        btn.onclick = () => {
            let reaction = Date.now() - start;
            showResults(reaction);
        };
    }, Math.random() * 2000 + 1500);
}

// =========================
//  RESULTADOS
// =========================
function showResults(reactionTime) {
    const goal = localStorage.getItem("userGoal");

    app.innerHTML = `
        <div class="screen">
            <h1>Resultado</h1>
            <p>Seu tempo de reação: <strong>${reactionTime}ms</strong></p>
            <p>Objetivo escolhido: <strong>${goal}</strong></p>

            <button onclick="showDailyPlan()">Ver plano diário</button>
        </div>
    `;
}

// =========================
//  PLANO DIÁRIO (MVP simples)
// =========================
function showDailyPlan() {
    const goal = localStorage.getItem("userGoal");

    const plans = {
        memoria: ["Exercício de repetição", "Mini-jogo de padrão"],
        foco: ["1 min de foco visual", "Detecção rápida"],
        logica: ["Puzzle simples", "Sequência lógica"],
        disciplina: ["Tarefa de 2 minutos", "Desafio de consistência"]
    };

    let list = plans[goal].map(i => `<li>${i}</li>`).join("");

    app.innerHTML = `
        <div class="screen">
            <h1>Seu Plano Diário</h1>
            <ul style="text-align:left; opacity:0.9;">
                ${list}
            </ul>
        </div>
    `;
}

// Inicializar
showWelcomeScreen();

