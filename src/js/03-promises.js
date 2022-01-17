import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;

  let mainDelay = Number(delay.value);
  const stepDelay = Number(step.value);
  const amountPromise = Number(amount.value);

  for (let i = 1; i <= amountPromise; i++) {
    mainDelay += stepDelay;

    createPromise(i, mainDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    // console.log(`Start after ${mainDelay}ms delay`);
  }
}

function createPromise(position, delay) {
  // console.log(position, 'promise position');
  // console.log(delay, 'step delay');

  const shouldResolve = Math.random() > 0.3;

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  });
}
