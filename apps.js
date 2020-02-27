const countInput = document.getElementById('count-input');
const startBtn = document.getElementById('start-btn');
const inputWrapper = document.getElementById('input-wrapper');

const countDownNumber = document.getElementById('count-down-number');
let initNumber = 20;
const numberWrapper = document.createElement('h1');
countDownNumber.appendChild(numberWrapper);

const countDown = {
  running: false,
  initialCall: true,
  input: '',
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
      this.setTime('s', this.endTime);
    } else if (this.durationState === 'm') {
      this.setTime('m', this.endTime);
    } else if (this.durationState === 'h') {
      this.setTime('h', this.endTime);
    }

    this.updateTimer();

    const update = () => {
      if (this.initialCall) {
        this.countInterval = setInterval(() => {
          if (this.running) {
            this.updateTimer();
            console.log('update ');
          } else {
            clearInterval(this.countInterval);
          }
        }, 1000);
      } else {
        this.countInterval = setInterval(() => {
          if (this.running) {
            this.updateTimer();
            console.log('update ');
            this.initialCall = true;
            clearInterval(this.countInterval);
            update();
          }
        }, 1);
      }
    };
    update();
  },
  stop() {
    this.running = false;
    this.wasPaused = true;
    this.initialCall = false;
    //countDown.updateTimer();
    clearInterval(this.countInterval);
    this.displayTime();
  },
  displayTime() {
    if (this.durationState === 's') {
      numberWrapper.textContent = this.timeValues.seconds + 's ';
    } else if (this.durationState === 'm') {
      numberWrapper.textContent =
        this.timeValues.minutes + 'm ' + this.timeValues.seconds + 's ';
    } else if (this.durationState === 'h') {
      numberWrapper.textContent =
        this.timeValues.hours +
        'h ' +
        this.timeValues.minutes +
        'm ' +
        this.timeValues.seconds +
        's ';
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
    } else if (state === 'h') {
      time.setSeconds(time.getSeconds() + this.timeValues.seconds);
      time.setMinutes(time.getMinutes() + this.timeValues.minutes);
      time.setHours(time.getHours() + this.timeValues.hours);
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

countInput.addEventListener('input', e => {
  console.log(e.target.value);
  // countDown.setNumber(Number(e.target.value));

  //console.log('cd Num: ' + countDown.number);
  countDown.input = e.target.value;
  stringInterpreter(countDown.input);

  countDown.wasPaused = false;

  numberWrapper.textContent = e.target.value;
});

startBtn.addEventListener('click', e => {
  if (startActive) {
    countDown.running = true;
    countDown.start(countDown.number);
    countDown.updateTimer();

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

const stringInterpreter = string => {
  const characters = string.split('');
  console.log(characters);
  countDown.durationState = checkRequiredState(characters);
  let num = [];
  for (let i = 0; i < characters.length; i++) {
    if (isValidCharacter(characters[i]) === 'num') {
      num.push(characters[i]);
    } else {
      if (characters[i] === 's') {
        countDown.timeValues.seconds = parseInt(num.join(''));
      } else if (characters[i] === 'm') {
        countDown.timeValues.minutes = parseInt(num.join(''));
      } else if (characters[i] === 'h') {
        countDown.timeValues.hours = parseInt(num.join(''));
      }
      num = [];
    }
  }
};

const checkRequiredState = chars => {
  if (chars.includes('s') && chars.includes('m') && chars.includes('h')) {
    return 'h';
  } else if (chars.includes('h') && chars.includes('m')) {
    return 'h';
  } else if (chars.includes('s') && chars.includes('m')) {
    return 'm';
  } else if (chars.includes('s')) {
    return 's';
  } else if (chars.includes('m')) {
    return 'm';
  } else if (chars.includes('h')) {
    return 'h';
  }
};

const isValidCharacter = char => {
  const validChars = ['h', 'm', 's'];
  if (!isNaN(parseInt(char))) {
    return 'num';
  } else if (validChars.includes(char)) {
    return char;
  } else {
    return 'invalid';
  }
};
