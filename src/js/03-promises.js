
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

form.addEventListener('submit', submitForm);

function submitForm(e) {
  e.preventDefault();


  let delay = Number(form.delay.value);

  for (let i = 1; i <= form.amount.value; i++) {
    createPromise(i, delay)
  .then(({ position, delay }) => {
     Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
  })
  .catch(({ position, delay }) => {
    Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
  });
    
    delay += Number(form.step.value);
  }

}

function createPromise(position, delay) {
  const object = { position, delay };
  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        resolve(object);
      } else {
        // Reject
        reject(object);
      }
    }, delay);
  })

}
