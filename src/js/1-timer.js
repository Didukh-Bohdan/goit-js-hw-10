import flatpickr from "flatpickr";
import iziToast from "izitoast";

import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

// Elements
const dateTimePicker = document.getElementById("datetime-picker");
const startButton = document.querySelector('button[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

// State
let userSelectedDate = null;
let countdownInterval;

// Initialize flatpickr
flatpickr(dateTimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    validateSelectedDate();
  },
});

// Event listener for Start button
startButton.addEventListener('click', startCountdown);

// Function to start the countdown
function startCountdown() {
  if (!userSelectedDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    return;
  }

  startButton.disabled = true;
  dateTimePicker.disabled = true;

  updateCountdown(); // Update immediately
  countdownInterval = setInterval(updateCountdown, 1000);
}

// Function to update the countdown
function updateCountdown() {
  const timeDiff = userSelectedDate - new Date();
  if (timeDiff <= 0) {
    clearInterval(countdownInterval);
    displayTime({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    iziToast.success({
      title: 'Done',
      message: 'Countdown finished!',
    });
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDiff);
  displayTime({ days, hours, minutes, seconds });
}

// Function to display the countdown
function displayTime({ days, hours, minutes, seconds }) {
  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

// Function to validate selected date
function validateSelectedDate() {
  const currentDate = new Date();
  if (userSelectedDate <= currentDate) {
    iziToast.error({
      title: 'Error',
      message: 'Please choose a date in the future',
    });
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
}

// Function to add leading zero to single-digit numbers
function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}

// Function to convert milliseconds to days, hours, minutes, and seconds
function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
