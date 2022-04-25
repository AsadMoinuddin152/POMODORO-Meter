










///////////////////////////////////////////////////

let pomodoro = {
  started: false,
  minutes: 0,
  seconds: 0,
  interval: null,
  minutesDom: null,
  secondsDom: null,
  init: function () {
    let self = this;
    this.minutesDom = document.querySelector("#minutes");
    this.secondsDom = document.querySelector("#seconds");
    this.interval = setInterval(function () {
      self.intervalCallback.apply(self);
    }, 1000);
    let start = document.querySelector("#start");
    let shortBreak = document.querySelector("#shortBreak");
    let longBreak = document.querySelector("#longBreak");
    let body = document.querySelector("body");

    start.onclick = function () {
      self.startStart.apply(self);
      start.classList.add("border");
      shortBreak.classList.remove("border");
      longBreak.classList.remove("border");
      body.style.backgroundColor = "#4B5A7E";
    };
    shortBreak.onclick = function () {
      self.startShortBreak.apply(self);
      start.classList.remove("border");
      shortBreak.classList.add("border");
      longBreak.classList.remove("border");
      body.style.backgroundColor = "#7B734C";
    };
    longBreak.onclick = function () {
      self.startLongBreak.apply(self);
      start.classList.remove("border");
      shortBreak.classList.remove("border");
      longBreak.classList.add("border");
      body.style.backgroundColor = "#7B734C";
    };

    document.querySelector("#stop").onclick = function () {
      self.stopTimer.apply(self);
      start.classList.remove("border");
      shortBreak.classList.remove("border");
      longBreak.classList.remove("border");
      body.style.backgroundColor = "#4B5A7E";
    };
  },
  resetVariables: function (mins, secs, started) {
    this.minutes = mins;
    this.seconds = secs;
    this.started = started;
  },
  startStart: function () {
    this.resetVariables(25, 0, true);
  },
  startShortBreak: function () {
    this.resetVariables(5, 0, true);
  },
  startLongBreak: function () {
    this.resetVariables(15, 0, true);
  },
  stopTimer: function () {
    this.resetVariables(25, 0, false);
    this.updateDom();
  },
  toDoubleDigit: function (num) {
    if (num < 10) {
      return "0" + parseInt(num, 10);
    }
    return num;
  },
  updateDom: function () {
    this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
    this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
    this.fillerHeight = this.fillerHeight + this.fillerIncrement;
  },
  intervalCallback: function () {
    if (!this.started) return false;
    if (this.seconds == 0) {
      if (this.minutes == 0) {
        this.timerComplete();
        return;
      }
      this.seconds = 59;
      this.minutes--;
    } else {
      this.seconds--;
    }
    this.updateDom();
  },
  timerComplete: function () {
    this.started = false;
    this.fillerHeight = 0;
  },
};
window.onload = function () {
  pomodoro.init();
};
