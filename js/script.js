const form = document.querySelector('#newsletter-form');
const input = form.querySelector('#email');
const submit = form.querySelector('#submit-button');
const success = document.querySelector('#succes-popup');
const successClose = success.querySelector('.success-button');


input.addEventListener ('input', () => {
    console.log(input.value);
})
form.addEventListener('submit', (evt) => {
    evt.preventDefault();
})

submit.addEventListener('click', (evt) => {
    evt.preventDefault();
    success.classList.remove('success');
    success.classList.add('success--show');
})
