const countInput = document.getElementById('count-input');
const startBtn = document.getElementById('start-btn');
const inputWrapper = document.getElementById('input-wrapper');
const durationSelector = document.getElementById('duration-selector');

const countDownNumber = document.getElementById('count-down-number');
let initNumber = 20;
const numberWrapper = document.createElement('h1');
countDownNumber.appendChild(numberWrapper);

const countDown = {
  running: false,
  number: initNumber,
  endTime: new Date(),
  wasPaused: false,
  pauseTime: new Date(),
  durationState: 's',
  timeValues: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  },
  countInterval: '',
  start() {
    //set inital endTime to current time
    this.endTime = new Date();

    //Check which state the user selected
    //Add timer time to current time (endTime)
    if (this.durationState === 's') {
      if (!this.wasPaused) {
        console.log('num is:' + this.number);
        this.endTime.setSeconds(this.endTime.getSeconds() + this.number);
      } else {
        this.setTime('s', this.endTime);
      }
    } else if (this.durationState === 'm') {
      if (!this.wasPaused) {
        this.endTime.setMinutes(this.endTime.getMinutes() + this.number);
      } else {
        this.setTime('m', this.endTime);
      }
    }

    this.countInterval = setInterval(() => {
      if (this.running) {
        this.updateTimer();
      }
    }, 300);
  },
  stop() {
    //this.running = false;
    this.wasPaused = true;

    clearInterval(this.countInterval);
    this.displayTime();
  },
  displayTime() {
    if (this.durationState === 's') {
      numberWrapper.textContent = this.timeValues.seconds + 's ';
    } else if (this.durationState === 'm') {
      numberWrapper.textContent =
        this.timeValues.minutes + 'm ' + this.timeValues.seconds + 's ';
    } else {
      numberWrapper.textContent =
        this.timeValues.days +
        'd ' +
        this.timeValues.hours +
        'h ' +
        this.timeValues.minutes +
        'm ' +
        this.timeValues.seconds +
        's ';
    }
  },
  setTime(state, time) {
    if (state === 's') {
      time.setSeconds(time.getSeconds() + this.timeValues.seconds);
      time.setMinutes(time.getMinutes());
      time.setHours(time.getHours());
    } else if (state === 'm') {
      time.setSeconds(time.getSeconds() + this.timeValues.seconds);
      time.setMinutes(time.getMinutes() + this.timeValues.minutes);
      time.setHours(time.getHours());
    }
  },
  setNumber(num) {
    this.number = num;
  },
  updateTimer() {
    const distance = this.endTime.getTime() - new Date().getTime();
    if (distance > 0) {
      this.timeValues.days = Math.floor(distance / (1000 * 60 * 60 * 24));
      this.timeValues.hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      this.timeValues.minutes = Math.floor(
        (distance % (1000 * 60 * 60)) / (1000 * 60)
      );
      this.timeValues.seconds = Math.floor((distance % (1000 * 60)) / 1000);
    } else {
      this.running = false;
      this.stop();
    }

    this.pauseTime = new Date();
    this.displayTime();
  }
};
numberWrapper.textContent = initNumber + countDown.durationState;

let startActive = true;

durationSelector.addEventListener('change', e => {
  countDown.durationState = e.target.value;
  numberWrapper.textContent = countDown.number + countDown.durationState;
  countDown.wasPaused = false;

  console.log(e.target.value);
});

countInput.addEventListener('input', e => {
  console.log(e.target.value);
  countDown.setNumber(Number(e.target.value));
  console.log('cd Num: ' + countDown.number);
  countDown.wasPaused = false;

  numberWrapper.textContent = countDown.number + countDown.durationState;

  //countDown.number = number;
  //countDown.stop();
});

startBtn.addEventListener('click', e => {
  if (startActive) {
    countDown.running = true;
    countDown.start(countDown.number);
    countInput.value = '';
    startActive = false;
    e.target.textContent = 'stop';
    e.target.style.background = 'indianred';
    inputWrapper.classList.add('input-wrapper-invisible');
  } else {
    countDown.stop();
    startActive = true;
    e.target.style.background = 'rgb(194, 255, 103)';
    e.target.textContent = 'start';
    inputWrapper.classList.remove('input-wrapper-invisible');
  }
});
