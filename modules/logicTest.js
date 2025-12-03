function startLogicTest() {
    const tests = [
        { seq: "2, 4, 6, 8", correct: "10" },
        { seq: "3, 6, 12, 24", correct: "48" },
        { seq: "1, 1, 2, 3, 5", correct: "8" },
        { seq: "5, 10, 15, 20", correct: "25" }
    ];

    let index = 0;
    let score = 0;

    function showQuestion() {
        if (index >= tests.length) return finishLogicTest(score);

        let q = tests[index];

        app.innerHTML = `
            <div class="screen">
                <h1>Raciocínio Lógico</h1>
                <p>Complete a sequência:</p>
                <h2>${q.seq}</h2>

                <input id="logicAnswer" placeholder="Resposta" 
                style="padding:10px; width:70%; margin-top:20px; border-radius:8px;">

                <br><br>
                <button onclick="submitLogic()">Enviar</button>
            </div>
        `;
    }

    window.submitLogic = function() {
        let input = document.getElementById("logicAnswer").value.trim();

        if (input === tests[index].correct) score++;

        index++;
        showQuestion();
    };

    window.finishLogicTest = function(score) {
        app.innerHTML = `
            <div class="screen">
                <h1>Resultado: Lógica</h1>
                <p>Você acertou <strong>${score}</strong> de 4.</p>

                <button onclick="showFinalResults(${score})">Finalizar Avaliação</button>
            </div>
        `;
    };

    window.showFinalResults = function() {
        app.innerHTML = `
            <div class="screen">
                <h1>Avaliação Final</h1>
                <p>Você concluiu os 3 testes cognitivos!</p>
                <p>A IA agora vai gerar seu plano diário inteligente.</p>

                <button onclick="showDailyPlan()">Ver plano diário</button>
            </div>
        `;
    };

    showQuestion();
}
