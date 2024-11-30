const input = document.querySelector('.login_entrada');
const button = document.querySelector('.botao-login');
const form = document.querySelector('.login-form');

button.setAttribute('disabled', '');

const validateInput = ({ target }) => {
    console.log("validate");
    if (target.value.length > 2) {
        button.removeAttribute('disabled');
    } else {
        button.setAttribute('disabled', '');
    }
}

const handleSubmit = (event) => {
    event.preventDefault(); 
    localStorage.setItem('player', input.value); 
    window.location =  './JOGO/game.html'; 
}

const player = 
input.addEventListener('input', validateInput);
form.addEventListener('submit', handleSubmit);
