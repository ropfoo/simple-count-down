const body = document.querySelector('body');
const numberWrapper = document.getElementById('count-down__display');
const countDown = {
  display: '',
  running: false,
  initialCall: false,
  input: '30s',
  endTime: new Date(),
  wasPaused: false,
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
            // console.log('update ');
          } else {
            clearInterval(this.countInterval);
          }
        }, 1000);
      } else {
        this.countInterval = setInterval(() => {
          if (this.running) {
            this.updateTimer();
            //console.log('update ');
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
      body.classList.add('count-down--finished');
    }

    this.pauseTime = new Date();
    this.displayTime();
  }
};

numberWrapper.textContent = countDown.input;

export const stringInterpreter = (string, cd) => {
  const characters = string.split('');
  cd.durationState = checkRequiredState(characters, cd);
  let num = [];
  if (Number(characters.join(''))) {
    cd.timeValues.seconds = parseInt(characters.join(''));
  } else {
    for (let i = 0; i < characters.length; i++) {
      if (isValidCharacter(characters[i]) === 'num') {
        num.push(characters[i]);
      } else if (characters[i] === 'invalid') {
        console.log('invalid');
      } else {
        if (characters[i] === 's') {
          cd.timeValues.seconds = parseInt(num.join(''));
        } else if (characters[i] === 'm') {
          cd.timeValues.minutes = parseInt(num.join(''));
        } else if (characters[i] === 'h') {
          cd.timeValues.hours = parseInt(num.join(''));
        }
        num = [];
      }
    }
  }
};

const checkRequiredState = (chars, cd) => {
  if (chars.includes('s') && chars.includes('m') && chars.includes('h')) {
    return 'h';
  } else if (chars.includes('h') && chars.includes('m')) {
    return 'h';
  } else if (chars.includes('s') && chars.includes('m')) {
    return 'm';
  } else if (chars.includes('s')) {
    return 's';
  } else if (chars.includes('m')) {
    cd.timeValues.seconds = 0;
    cd.timeValues.hours = 0;
    return 'm';
  } else if (chars.includes('h')) {
    cd.timeValues.seconds = 0;
    cd.timeValues.minutes = 0;
    return 'h';
  } else {
    return 's';
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

export default countDown;
