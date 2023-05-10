const buttonStart = document.querySelector('[data-start]');
const buttonStop = document.querySelector('[data-stop]');
const bodyColor = document.querySelector('body');

let timerId = null;



buttonStart.addEventListener('click', onStart);
buttonStop.addEventListener('click', onStop);

function onStart() {
    timerId = setInterval(bgColor, 1000);
    
    buttonStart.toggleAttribute('disabled');
}

function onStop() {
    clearInterval(timerId);

    buttonStart.removeAttribute('disabled');
}

function bgColor() {
    bodyColor.style.backgroundColor = getRandomHexColor();
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}
