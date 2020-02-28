import countDown, { stringInterpreter } from './js/count-down.js';
import './style/style.css';

const body = document.querySelector('body');
const numberWrapper = document.getElementById('count-down__display');

const countInput = document.getElementById('count-down__input');
const startBtn = document.getElementById('count-down__start-btn');
const inputWrapper = document.getElementById('count-down__input-wrapper');

numberWrapper.textContent = countDown.input;

let startActive = true;

countInput.addEventListener('input', e => {
  countDown.setNumber(Number(e.target.value));

  //console.log('cd Num: ' + countDown.number);
  countDown.input = e.target.value;
  stringInterpreter(countDown.input, countDown);

  countDown.wasPaused = false;

  numberWrapper.textContent = e.target.value;
});

startBtn.addEventListener('click', e => {
  body.classList.remove('count-down--finished');
  if (startActive) {
    countDown.running = true;

    countDown.start();
    countDown.updateTimer();

    countInput.value = '';
    startActive = false;
    e.target.textContent = 'stop';
    e.target.style.background = 'indianred';
    inputWrapper.classList.add('count-down__input-wrapper--invisible');
  } else {
    countDown.stop();
    startActive = true;

    e.target.style.background = 'rgb(194, 255, 103)';
    e.target.textContent = 'start';
    inputWrapper.classList.remove('count-down__input-wrapper--invisible');
  }
});

stringInterpreter(countDown.input, countDown);
