const form = document.querySelector('.feedback-form');

const saveFormDataToLocalStorage = () => {
const formData = {
    email: form.elements.email.value.trim(),
    message: form.elements.message.value.trim(),
};

localStorage.setItem('feedback-form-state', JSON.stringify(formData));
};

const loadFormDataFromLocalStorage = () => {
const storedData = localStorage.getItem('feedback-form-state');

if (storedData) {
    const formData = JSON.parse(storedData);
    form.elements.email.value = formData.email;
    form.elements.message.value = formData.message;
}
};

const clearFormDataAndLocalStorage = () => {
form.reset();
localStorage.removeItem('feedback-form-state');
};

form.addEventListener('input', saveFormDataToLocalStorage);

form.addEventListener('submit', (event) => {
event.preventDefault();

const emailValue = form.elements.email.value.trim();
const messageValue = form.elements.message.value.trim();

if (emailValue && messageValue) {
    console.log({ email: emailValue, message: messageValue });
    clearFormDataAndLocalStorage();
}
});

window.addEventListener('load', loadFormDataFromLocalStorage);

console.log("Form");