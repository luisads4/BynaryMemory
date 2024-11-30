const grid = document.querySelector('.grid');
const timerDisplay = document.createElement('div');
const messageDisplay = document.createElement('div');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
let timer;
let timeLeft = 120; // Tempo inicial em segundos

// Adicionar displays de timer e mensagem
timerDisplay.className = 'timer';
messageDisplay.className = 'message';
document.body.prepend(timerDisplay);
document.body.append(messageDisplay);

// Função para criar elementos HTML com uma classe específica
const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

// Função para criar uma carta
const createCard = (programName) => {
    const card = createElement('div', 'card');
    const front = createElement('div', 'face frente');
    const back = createElement('div', 'face tras');

    front.style.backgroundImage = `url('../images/${programName}.png')`;

    card.appendChild(front);
    card.appendChild(back);
    card.setAttribute('data-card', programName);

    // Adiciona o evento de clique para virar a carta
    card.addEventListener('click', flipCard);

    return card;
};

// Função para embaralhar as cartas
const shuffleCards = () => {
    const cards = Array.from(grid.children);
    const shuffledCards = cards.sort(() => Math.random() - 0.5);

    // Remove as cartas da grid e as reinsere embaralhadas
    grid.innerHTML = '';
    shuffledCards.forEach((card) => {
        grid.appendChild(card);
    });
};

// Função para carregar as cartas no jogo
const loadGame = () => {
    const programs = [
        'byte',
        'css',
        'github',
        'helloWord',
        'htmlimg',
        'intelij',
        'java',
        'javascript',
        'jgrasp',
        'python',
    ];

    // Duplicar os programas para criar pares
    const duplicatedPrograms = [...programs, ...programs];

    // Criar as cartas
    duplicatedPrograms.forEach((program) => {
        const card = createCard(program);
        grid.appendChild(card);
    });

    // Embaralhar as cartas após carregá-las
    shuffleCards();
};

// Função para virar uma carta
const flipCard = (event) => {
    if (lockBoard) return;

    const clickedCard = event.target.parentElement;

    // Evitar clicar na mesma carta duas vezes
    if (clickedCard === firstCard) return;

    clickedCard.classList.add('flip');

    if (!firstCard) {
        // Primeira carta clicada
        firstCard = clickedCard;
        return;
    }

    // Segunda carta clicada
    secondCard = clickedCard;

    // Verificar se há correspondência
    checkMatch();
};

// Função para verificar se as cartas formam um par
const checkMatch = () => {
    const isMatch = firstCard.getAttribute('data-card') === secondCard.getAttribute('data-card');

    isMatch ? disableCards() : unflipCards();
};

// Função para desabilitar as cartas correspondentes
const disableCards = () => {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    matchedPairs++;

    if (matchedPairs === 10) {
        // Se todos os pares forem encontrados, o jogo termina
        endGame(true);
    }

    resetBoard();
};

// Função para desvirar as cartas se não forem correspondentes
const unflipCards = () => {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1000);
};

// Função para resetar o estado do tabuleiro
const resetBoard = () => {
    [firstCard, secondCard, lockBoard] = [null, null, false];
};

// Função para atualizar o timer regressivo
const updateTimer = () => {
    timeLeft--;
    timerDisplay.textContent = `Tempo restante: ${timeLeft}s`;
    timerDisplay.classList.add('teste');

    if (timeLeft <= 0) {

        clearInterval(timer);
        endGame(false); // Finalizar o jogo como derrota
    }
};

// Função para encerrar o jogo
const endGame = (won) => {
    clearInterval(timer);
    messageDisplay.textContent = won ? 'Você venceu!' : 'O tempo acabou! Você perdeu.';
    messageDisplay.style.fontSize = '2rem';
    messageDisplay.style.color = won ? 'green' : 'red';
    messageDisplay.style.textAlign = 'center';

    // Remover a possibilidade de interação com as cartas após o jogo terminar
    const cards = document.querySelectorAll('.card');
    cards.forEach((card) => card.removeEventListener('click', flipCard));
};

// Iniciar o jogo
const startGame = () => {
    timeLeft = 120;
    matchedPairs = 0;
    timerDisplay.textContent = 'Tempo restante: 120s';
    messageDisplay.textContent = '';
    grid.innerHTML = '';
    loadGame();
    timer = setInterval(updateTimer, 1000); // Atualizar o timer a cada segundo
};



startGame();
