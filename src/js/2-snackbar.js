import iziToast from "izitoast";

document.querySelector('.form').addEventListener('submit', function(event) {
  event.preventDefault();

  const delayInput = parseInt(this.elements['delay'].value, 10);
  const stateInput = this.elements['state'].value;

  const notificationPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (stateInput === 'fulfilled') {
        resolve(delayInput);
      } else {
        reject(delayInput);
      }
    }, delayInput);
  });

  notificationPromise
    .then(delay => {
      iziToast.success({
        title: 'Успіх',
        message: `✅ Проміс виконано за ${delay}мс`
      });
    })
    .catch(delay => {
      iziToast.error({
        title: 'Помилка',
        message: `❌ Проміс відхилено за ${delay}мс`
      });
    })
    .finally(() => {
      this.reset(); 
    });
});
