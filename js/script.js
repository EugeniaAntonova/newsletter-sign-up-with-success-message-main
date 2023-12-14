const form = document.querySelector('#newsletter-form');
const input = form.querySelector('#email');
const errorMessage = form.querySelector('#error');
const submitButton = form.querySelector('#submit-button');
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
        submitButton.setAttribute('disabled', 'true');
    } else {
        errorMessage.classList.add('error');
        errorMessage.classList.remove('error--show');
        submitButton.removeAttribute('disabled');
        submitButton.addEventListener('click', openSuccess)
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
        submitButton.setAttribute('disabled', true);
    }, 350)
}

// i chose to use input instead of the change event, because validation is going more user friendly in this case. if i use change event, while focus 
// stays in the input user can not see the result of fixing the value. only pressing enter/tab/clicking elsewhere makes error message dissapear. And
// input event, on the other hand works beautifully, catching any changes and approving input while typing

input.addEventListener ('input', () => {
    checkInput(input);
})

input.addEventListener ('input', () => {
    checkInput(input);
})

form.addEventListener('submit', async (evt) => {
    evt.preventDefault();
    checkInput(input);
    const data = new FormData(form);
    console.log(data.get('email'));
    try {
        const res = await fetch(
          'https://jsonplaceholder.typicode.com/posts',
          {
            method: 'POST',
            body: data,
          },
        );

        const resData = await res.json();
        console.log(resData);
    } catch (err) {
    console.log(err.message);
  }  

})

// by default the button is disabled for the sake of more intuitive ux

submitButton.setAttribute('disabled', true);
