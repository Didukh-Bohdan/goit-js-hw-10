import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Elements
const form = document.querySelector('.form');

// Event listener for form submission
form.addEventListener('submit', function (event) {
event.preventDefault();

  // Get user inputs
const delayInput = parseInt(form.querySelector('input[name="delay"]').value, 10);
const stateInput = form.querySelector('input[name="state"]:checked').value;

  // Create a promise
const notificationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
    if (stateInput === 'fulfilled') {
        resolve(delayInput);
    } else {
        reject(delayInput);
    }
    }, delayInput);
});

  // Handle the promise
notificationPromise.then(
    (delay) => {
    iziToast.success({
        title: 'Fulfilled promise',
        message: `✅ Fulfilled promise in ${delay}ms`,
    });
    },
    (delay) => {
    iziToast.error({
        title: 'Rejected promise',
        message: `❌ Rejected promise in ${delay}ms`,
    });
    }
);
});
