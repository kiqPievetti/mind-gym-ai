function startFocusTest() {
    let attempts = 12;
    let points = 0;
    let clickable = false;

    function showStimulus() {
        if (attempts <= 0) return finishFocusTest(points);

        attempts--;

        let isGo = Math.random() < 0.6; // 60% verde, 40% vermelho
        clickable = isGo;

        app.innerHTML = `
            <div class="screen">
                <h1>Foco Sustentado</h1>
                <p>Clique APENAS quando aparecer verde.</p>
                <div style="
                    width:150px; height:150px; margin:30px auto;
                    border-radius:12px; 
                    background:${isGo ? 'green' : 'red'};
                "></div>

                <button onclick="userClicked()">Cliquei</button>
            </div>
        `;
    }

    window.userClicked = function() {
        if (clickable) points++;      // clicou certo
        if (!clickable) points -= 1;  // clicou errado

        showStimulus();
    };

    window.finishFocusTest = function(score) {
        if (score < 0) score = 0;

        app.innerHTML = `
            <div class="screen">
                <h1>Resultado: Foco</h1>
                <p>Pontuação: <strong>${score}</strong> de 12</p>
                <button onclick="startLogicTest()">Próximo Teste</button>
            </div>
        `;
    };

    showStimulus();
}
