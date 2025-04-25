        // Variables del juego
        let deckId = '';
        let currentCard = null;
        let nextCard = null;
        let score = 0;
        
        // Elementos del DOM
        const currentCardEl = document.getElementById('current-card');
        const nextCardEl = document.getElementById('next-card');
        const scoreEl = document.getElementById('score');
        const messageEl = document.getElementById('message');
        const higherBtn = document.getElementById('higher-btn');
        const lowerBtn = document.getElementById('lower-btn');
        const equalBtn = document.getElementById('equal-btn');
        const newBtn = document.getElementById('new-btn');
        
        // Iniciar nuevo juego
        async function startGame() {
            try {
                messageEl.textContent = "Cargando...";
                disableButtons(true);
                
                // Obtener nuevo mazo
                const deckResponse = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/');
                const deckData = await deckResponse.json();
                deckId = deckData.deck_id;
                
                // Sacar dos cartas
                const cardsResponse = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`);
                const cardsData = await cardsResponse.json();
                
                currentCard = cardsData.cards[0];
                nextCard = cardsData.cards[1];
                
                // Mostrar cartas
                currentCardEl.style.backgroundImage = `url(${currentCard.image})`;
                nextCardEl.style.backgroundImage = 'url(https://deckofcardsapi.com/static/img/back.png)';
                
                score = 0;
                updateScore();
                messageEl.textContent = "¿La próxima carta será Mayor, Menor o Igual?";
                disableButtons(false);
                
            } catch (error) {
                messageEl.textContent = "Error al cargar el juego. Intenta de nuevo.";
                console.error(error);
            }
        }
        
        // Comparar valores de cartas
        function getCardValue(card) {
            const values = {
                'ACE': 14, 'KING': 13, 'QUEEN': 12, 'JACK': 11,
                '10': 10, '9': 9, '8': 8, '7': 7, '6': 6,
                '5': 5, '4': 4, '3': 3, '2': 2
            };
            return values[card.value];
        }
        
        // Manejar predicción
        async function makeGuess(guess) {
            disableButtons(true);
            nextCardEl.style.backgroundImage = `url(${nextCard.image})`;
            
            const currentValue = getCardValue(currentCard);
            const nextValue = getCardValue(nextCard);
            
            let result = '';
            
            if ((guess === 'higher' && nextValue > currentValue) ||
                (guess === 'lower' && nextValue < currentValue) ||
                (guess === 'equal' && nextValue === currentValue)) {
                score++;
                result = "¡Correcto!";
            } else {
                result = "¡Incorrecto!";
            }
            
            updateScore();
            messageEl.textContent = `${result} La carta era ${nextValue > currentValue ? 'mayor' : nextValue < currentValue ? 'menor' : 'igual'}.`;
            
            // Preparar siguiente ronda
            setTimeout(async () => {
                currentCard = nextCard;
                currentCardEl.style.backgroundImage = `url(${currentCard.image})`;
                
                try {
                    const response = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
                    const data = await response.json();
                    
                    if (data.cards && data.cards.length > 0) {
                        nextCard = data.cards[0];
                        nextCardEl.style.backgroundImage = 'url(https://deckofcardsapi.com/static/img/back.png)';
                        messageEl.textContent = "¿La próxima carta será Mayor, Menor o Igual?";
                        disableButtons(false);
                    } else {
                        messageEl.textContent = "¡Fin del juego! Puntuación final: " + score;
                    }
                } catch (error) {
                    messageEl.textContent = "Error al obtener la siguiente carta.";
                    console.error(error);
                }
            }, 1500);
        }
        
        // Funciones auxiliares
        function updateScore() {
            scoreEl.textContent = `Puntuación: ${score}`;
        }
        
        function disableButtons(disabled) {
            higherBtn.disabled = disabled;
            lowerBtn.disabled = disabled;
            equalBtn.disabled = disabled;
        }
        
        // Event listeners
        higherBtn.addEventListener('click', () => makeGuess('higher'));
        lowerBtn.addEventListener('click', () => makeGuess('lower'));
        equalBtn.addEventListener('click', () => makeGuess('equal'));
        newBtn.addEventListener('click', startGame);
        
        // Iniciar el juego al cargar
        startGame();