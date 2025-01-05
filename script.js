document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');
    
    // Game State
    let gameState = {
        cardsChosen: [],
        cardsChosenId: [],
        cardsWon: [],
        isProcessing: false, // Prevent clicking during animations/checks
        gameStarted: false
    };

    // Card Configuration
    const cardArray = [
        { name: 'card1', img: 'images/distracted.png', id: 1 },
        { name: 'card1', img: 'images/distracted.png', id: 1 },
        { name: 'card2', img: 'images/drake.png', id: 2 },
        { name: 'card2', img: 'images/drake.png', id: 2 },
        { name: 'card3', img: 'images/fine.png', id: 3 },
        { name: 'card3', img: 'images/fine.png', id: 3 },
        { name: 'card4', img: 'images/rollsafe.png', id: 4 },
        { name: 'card4', img: 'images/rollsafe.png', id: 4 },
        { name: 'card5', img: 'images/success.png', id: 5 },
        { name: 'card5', img: 'images/success.png', id: 5 }
    ];

    // Enhanced shuffle function using Fisher-Yates algorithm
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Create game board with error handling
    function createBoard() {
        try {
            // Reset game state
            gameState = {
                cardsChosen: [],
                cardsChosenId: [],
                cardsWon: [],
                isProcessing: false,
                gameStarted: true
            };

            // Clear the board
            grid.innerHTML = '';
            
            // Shuffle cards
            const shuffledCards = shuffle([...cardArray]);
            
            // Create cards
            shuffledCards.forEach((card, index) => {
                const cardElement = createCardElement(index);
                grid.appendChild(cardElement);
            });

            // Update button text
            startButton.textContent = 'Restart Game';
            
            // Add transition class to game board
            grid.classList.add('opacity-100');
            grid.classList.remove('opacity-0');

        } catch (error) {
            console.error('Error creating game board:', error);
            showError('Failed to start the game. Please refresh the page.');
        }
    }

    // Create card element with error handling for missing images
    function createCardElement(index) {
        const card = document.createElement('img');
        card.setAttribute('src', 'images/blank.png');
        card.setAttribute('data-id', index);
        card.addEventListener('click', flipCard);
        
        // Add error handling for image loading
        card.addEventListener('error', (e) => {
            console.error(`Failed to load image for card ${index}`);
            e.target.src = 'images/error-placeholder.png'; // Fallback image
        });

        return card;
    }

    // Enhanced flip card function with debouncing
    function flipCard() {
        if (gameState.isProcessing) return; // Prevent clicking during processing
        
        const cardId = this.getAttribute('data-id');
        
        // Prevent clicking same card or already matched cards
        if (
            gameState.cardsChosenId.includes(cardId) || 
            this.style.visibility === 'hidden' ||
            gameState.cardsChosen.length >= 2
        ) return;

        try {
            // Add card to selected cards
            gameState.cardsChosen.push(cardArray[cardId].name);
            gameState.cardsChosenId.push(cardId);
            
            // Show card face
            this.setAttribute('src', cardArray[cardId].img);
            
            // Check for match if two cards are selected
            if (gameState.cardsChosen.length === 2) {
                gameState.isProcessing = true;
                setTimeout(checkForMatch, 800); // Increased delay for better UX
            }

        } catch (error) {
            console.error('Error flipping card:', error);
            showError('Something went wrong. Please restart the game.');
        }
    }

    // Enhanced match checking function
    function checkForMatch() {
        try {
            const cards = document.querySelectorAll('#game-board img');
            const [firstCardId, secondCardId] = gameState.cardsChosenId;
            const [firstCard, secondCard] = gameState.cardsChosen;

            // Check if cards match
            if (firstCard === secondCard && firstCardId !== secondCardId) {
                handleMatch(cards, firstCardId, secondCardId);
            } else {
                handleMismatch(cards, firstCardId, secondCardId);
            }

            // Reset selection
            gameState.cardsChosen = [];
            gameState.cardsChosenId = [];
            gameState.isProcessing = false;

            // Check for game completion
            if (gameState.cardsWon.length === cardArray.length / 2) {
                showVictoryMessage();
            }

        } catch (error) {
            console.error('Error checking match:', error);
            showError('Error checking cards. Please restart the game.');
        }
    }

    // Handle matching cards
    function handleMatch(cards, firstId, secondId) {
        // Add fade-out animation
        cards[firstId].classList.add('opacity-0', 'transition-opacity', 'duration-500');
        cards[secondId].classList.add('opacity-0', 'transition-opacity', 'duration-500');
        
        setTimeout(() => {
            cards[firstId].style.visibility = 'hidden';
            cards[secondId].style.visibility = 'hidden';
            cards[firstId].removeEventListener('click', flipCard);
            cards[secondId].removeEventListener('click', flipCard);
        }, 500);

        gameState.cardsWon.push(gameState.cardsChosen);
    }

    // Handle non-matching cards
    function handleMismatch(cards, firstId, secondId) {
        setTimeout(() => {
            cards[firstId].setAttribute('src', 'images/blank.png');
            cards[secondId].setAttribute('src', 'images/blank.png');
        }, 500);
    }

    // Show victory message with custom modal
    function showVictoryMessage() {
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50';
        modal.innerHTML = `
            <div class="bg-gray-900 border border-blue-500 p-8 text-center shadow-blue-glow">
                <h2 class="text-3xl font-bold text-blue-500 mb-4">Congratulations!</h2>
                <p class="text-white text-xl mb-6">You found all the matching pairs!</p>
                <button class="bg-blue-600 text-white px-6 py-2 hover:bg-blue-700 transition-colors">
                    Play Again
                </button>
            </div>
        `;

        document.body.appendChild(modal);
        modal.querySelector('button').onclick = () => {
            modal.remove();
            createBoard();
        };
    }

    // Show error message
    function showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded shadow-lg';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        setTimeout(() => errorDiv.remove(), 3000);
    }

    // Event Listeners
    startButton.addEventListener('click', createBoard);

    // Initialize game
    createBoard();
});
