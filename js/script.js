const form = document.querySelector('#newsletter-form');
const input = form.querySelector('#email');
const errorMessage = form.querySelector('#error');
const submit = form.querySelector('#submit-button');
const success = document.querySelector('#succes-popup');
const successCloseButton = success.querySelector('#success-button');
const successBlanket = document.querySelector('.success');
const userEmail = success.querySelector('.your-email');


const isValidInput = (input) => {
    let inputValid = false;
    if (input.match(/^[A-Za-z0-9\_\.]{1,}\@[A-Za-z0-9]{2,}\.[A-Za-z]{2,}$/)) {
        inputValid = true;
    };
    return inputValid;
}

const checkInput = (input) => {
    if (!isValidInput(input.value) || input.value === '') {
        errorMessage.classList.remove('error');
        errorMessage.classList.add('error--show');
        submit.setAttribute('disabled', 'true');
    } else {
        errorMessage.classList.add('error');
        errorMessage.classList.remove('error--show');
        submit.removeAttribute('disabled');
        submit.addEventListener('click', openSuccess)
    };
}

const closeSuccess = () => {
    success.classList.remove('success--show');
    document.removeEventListener('keydown', onEscKeydown);
    successCloseButton.removeEventListener('click', closeSuccess);
    document.removeEventListener('click', onBlanketClick);
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
    userEmail.textContent = input.value;
    document.addEventListener('keydown', onEscKeydown);
    successCloseButton.addEventListener('click', closeSuccess);
    document.addEventListener('click', onBlanketClick);
    setTimeout(() => {
        form.reset();
        submit.setAttribute('disabled', true);
    }, 350)
}

// i chose to use input instead of the change event, because validation is going more user friendly in this case. if i use change event, while focus 
// stays in the input user can not see the result of fixing the value. only pressing enter/tab/clicking elsewhere makes error message dissapear. And
// input event, on the other hand works beautifully, catching any changes and approving input while typing

input.addEventListener ('input', () => {
    checkInput(input);
})

// form.addEventListener('submit', (evt) => {
// })

// ----------i had to prevent submition, because i don`t know how to avoid default error messages, and preventDefault did not help. so i decided to catch
// every click.

submit.addEventListener('click', (evt) => {
    evt.preventDefault();
    checkInput(input);
})

submit.setAttribute('disabled', true);
