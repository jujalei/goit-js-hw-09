import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  inputDateRef: document.querySelector('#datetime-picker'),
  btnStartRef: document.querySelector('button[data-start]'),
  dataDaysRef: document.querySelector('span[data-days]'),
  dataHoursRef: document.querySelector('span[data-hours]'),
  dataMinutesRef: document.querySelector('span[data-minutes]'),
  dataSecondsRef: document.querySelector('span[data-seconds]'),
};

refs.btnStartRef.disabled = true;

let selectedDate = {};

// ******
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectedDate = selectedDates[0];

    checkDate();
  },
};
// ******

flatpickr(refs.inputDateRef, options);

const nowDate = new Date();

function checkDate() {
  if (selectedDate > nowDate) {
    refs.btnStartRef.disabled = false;
    // notifySuccess();
    // console.log(convertMs(selectedDate.getTime()));
  } else {
    refs.btnStartRef.disabled = true;
    Notiflix.Notify.failure('Please choose a date in the future', {
      timeout: 1500,
    });
  }
}

const timer = {
  isActive: false,

  start() {
    if (this.isActive) {
      return;
    }

    Notiflix.Notify.success('The timer has started counting down', {
      timeout: 2000,
    });

    this.isActive = true;
    setInterval(() => {
      const startTime = Date.now();
      let deltaTime = selectedDate - startTime;
      if (deltaTime > 100) {
        let timerComponents = convertMs(deltaTime);

        updateTimer(timerComponents);
      }
    }, 1000);
  },
};

refs.btnStartRef.addEventListener('click', timer.start);

// ******
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// ******

function updateTimer({ days, hours, minutes, seconds }) {
  refs.dataDaysRef.textContent = addZeroOnStart(days);
  refs.dataHoursRef.textContent = addZeroOnStart(hours);
  refs.dataMinutesRef.textContent = addZeroOnStart(minutes);
  refs.dataSecondsRef.textContent = addZeroOnStart(seconds);
}

function addZeroOnStart(value) {
  return String(value).padStart(2, '0');
}
