const countInput = document.getElementById('count-input');
const startBtn = document.getElementById('start-btn');

const countDownNumber = document.getElementById('count-down-number');
let number = countDownNumber.dataset.number;
const numberWrapper = document.createElement('h1');
numberWrapper.textContent = number;
countDownNumber.appendChild(numberWrapper);

let running = false;
let startActive = true;
let currentNumber = number;

countInput.addEventListener('input', e => {
  number = Number(e.target.value);
  currentNumber = number;
  stopCountdown();
});

startBtn.addEventListener('click', e => {
  if (startActive) {
    running = true;
    countDown(currentNumber);
    countInput.value = '';
    startActive = false;
    e.target.textContent = 'stop';
    e.target.style.background = 'indianred';
    countInput.classList.add('input-invisible');
  } else {
    stopCountdown();
    startActive = true;
    e.target.style.background = 'greenyellow';
    e.target.textContent = 'start';
    countInput.classList.remove('input-invisible');
  }
});

const stopCountdown = () => {
  running = false;
  numberWrapper.textContent = currentNumber;
};

const countDown = num => {
  let i = 0;
  setTimeout(() => {
    if (running) {
      num -= 1;
      numberWrapper.textContent = num;
      currentNumber = num;
      i++;
      if (i <= num) {
        countDown(num);
      }
    } else {
      currentNumber = num;
    }
  }, 1000);
};
