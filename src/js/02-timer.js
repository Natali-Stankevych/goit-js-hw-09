import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Notify } from 'notiflix/build/notiflix-notify-aio';


const input = document.querySelector('#datetime-picker');
const buttonStart = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-minutes]');
const minutes = document.querySelector('[data-minutes]')
const seconds = document.querySelector('[data-seconds]');

let timeDiference = 0;
let timerId = null;
let dateFormat = null;




const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
      console.log(selectedDates[0]);
     currentDifferenceDate(selectedDates[0]);
  },
};

buttonStart.setAttribute('disabled', true);
flatpickr(input, options);


buttonStart.addEventListener('click', onStart);

function onStart() {
    timerId = setInterval(startTimer, 1000);;
}


window.addEventListener('keydown', e => {
    if (e.code === 'Escape' && timerId) {

        input.removeAttribute('disabled');
        buttonStart.setAttribute('disabled',true);

        days.textContent = '00';
        hours.textContent = '00';
        minutes.textContent = '00';
        seconds.textContent = '00';
    }
});



function currentDifferenceDate(selectedDates) {
    const currentDates = Date.now();

    if (selectedDates < currentDates) {
        buttonStart.setAttribute('disabled', true);
        return Notify.failure('Please choose a date in the future');
    }

    timeDiference = selectedDates.getTime() - currentDates;
    dateFormat = convertMs(timeDiference);

    renderDate(dateFormat);
    buttonStart.removeAttribute('disabled');
}


function startTimer() {

     buttonStart.setAttribute('disabled',true);
    input.setAttribute('disabled', true);
    
    timeDiference -= 1000;

    if (seconds.textContent <= 0 && minutes.textContent <= 0) {
        Notify.success('Time end');
        clearInterval(timerId);
    } else {
        dateFormat = convertMs(timeDiference);
        renderDate(dateFormat);
    }

}


function renderDate(dateFormat) {
    hours.textContent = dateFormat.hours;
    days.textContent = dateFormat.days;
    minutes.textContent = dateFormat.minutes;
    seconds.textContent = dateFormat.seconds;

}

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
