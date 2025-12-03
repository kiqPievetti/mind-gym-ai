function startMemoryTest() {
    let sequence = [];
    let currentIndex = 0;
    let points = 0;

    function generateNumber() {
        return Math.floor(Math.random() * 9) + 1;
    }

    function showNext() {
        if (currentIndex >= 8) {
            return finishMemoryTest(points);
        }

        let num = generateNumber();
        sequence.push(num);

        app.innerHTML = `
            <div class="screen">
                <h1>Memória de Trabalho</h1>
                <p>Memorize o número e diga se é igual ao número anterior.</p>
                <h1 style="font-size:4rem;">${num}</h1>

                <button onclick="answerMemory(true)">Igual</button><br><br>
                <button onclick="answerMemory(false)">Diferente</button>
            </div>
        `;
    }

    window.answerMemory = function(isEqual) {
        if (currentIndex === 0) {
            // primeiro não conta
        } else {
            const prev = sequence[currentIndex - 1];
            const curr = sequence[currentIndex];

            if ((curr === prev && isEqual) || (curr !== prev && !isEqual)) {
                points++;
            }
        }

        currentIndex++;
        setTimeout(showNext, 500);
    };

    window.finishMemoryTest = function(score) {
        app.innerHTML = `
            <div class="screen">
                <h1>Resultado: Memória</h1>
                <p>Você acertou <strong>${score}</strong> de 7.</p>
                <button onclick="startFocusTest()">Próximo Teste</button>
            </div>
        `;
    };

    showNext();
}

