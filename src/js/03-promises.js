import Notiflix from 'notiflix';
Notiflix.Notify.init({
  position: 'right-bottom',
});

const refs = {
  form: document.querySelector('.form'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', evt => {
  evt.preventDefault();

  let delayValue = refs.delay.value;
  let stepValue = refs.step.value;
  let amountValue = refs.amount.value;

  let positionNum = 0;
  let stepNumber = Number(delayValue) - Number(stepValue);

  for (i = 0; i < Number(amountValue); i += 1) {
    positionNum += 1;
    stepNumber += Number(stepValue);
    createPromise(positionNum, stepNumber)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
