const form = document.querySelector('#newsletter-form');
const input = form.querySelector('#email');
const errorMessage = form.querySelector('#error');
const submit = form.querySelector('#submit-button');
const success = document.querySelector('#succes-popup');
const successCloseButton = success.querySelector('#success-button');
const successBlanket = document.querySelector('.success');


const isValidInput = (input) => {
    let inputValid = false;
    if (input.match(/^[A-Za-z0-9\_\.]{1,}\@[A-Za-z0-9]{2,}\.[A-Za-z]{2,}$/)) {
        inputValid = true;
    };
    return inputValid;
}

const closeSuccess = () => {
    success.classList.remove('success--show');
    document.removeEventListener('keydown', onEscKeydown);
    successCloseButton.removeEventListener('click', closeSuccess)
}

const onBlanketClick = (evt) => {
    if (evt.target === successBlanket) {
        closeSuccess();
    }
}

const onEscKeydown = (evt) => {
    if (evt.key === `Escape`) {
        closeSuccess()
    };
}

const openSuccess = () => {
    success.classList.add('success--show');
    document.addEventListener('keydown', onEscKeydown);
    successCloseButton.addEventListener('click', closeSuccess);
    document.addEventListener('click', onBlanketClick)

}

input.addEventListener ('input', () => {
    if (!isValidInput(input.value) || input.value === '') {
        errorMessage.classList.remove('error');
        errorMessage.classList.add('error--show');
        submit.setAttribute('disabled', 'true');
    } else {
        errorMessage.classList.add('error');
        errorMessage.classList.remove('error--show');
        submit.removeAttribute('disabled', 'true');
    };
})
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
})

submit.addEventListener('click', (evt) => {
    evt.preventDefault();
    openSuccess()
})
