import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import Notiflix from 'notiflix';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;
let remainingTime = 0;

refs.startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  //   const time = convertMs(remainingTime);
  //   const { days, hours, minutes, seconds } = time;
  //   refs.days.textContent = `${days}`;
  //   refs.hours.textContent = `${hours}`;
  //   refs.minutes.textContent = `${minutes}`;
  //   refs.seconds.textContent = `${seconds}`;
  //   console.log(time);
  //   ________

  const intervalId = setInterval(() => {
    const time = convertMs(remainingTime);
    const { days, hours, minutes, seconds } = time;

    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.seconds.textContent = `${seconds}`;

    if (seconds === '00') {
      clearInterval(intervalId);
      Notiflix.Notify.success('Time is up');
    }

    // console.log(time);
  }, 1000);
}

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const [days] = selectedDates; //деструктуризация массива. days - первый элемент массива;

    if (days < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      refs.startBtn.disabled = false;
    }

    const intervalId = setInterval(() => {
      //console.log((remainingTime = days - new Date()));
      remainingTime = days - new Date();
      if (remainingTime < 1000) {
        clearInterval(intervalId);
        // Notiflix.Notify.success('Time is up');
      }

      return remainingTime;
    }, 1000);
  },
};

flatpickr('#datetime-picker', options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, 0);
}
