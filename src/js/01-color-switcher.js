function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
console.log(getRandomHexColor());

const refs = {
  startBTN: document.querySelector('button[data-start]'),
  stopBTN: document.querySelector('button[data-stop]'),
  bodyLink: document.querySelector('body'),
};

const colorChanger = {
  timerId: null,
  disabled: false,

  start() {
    if (this.disabled) {
      return;
    }

    this.disabled = true;
    this.timerId = setInterval(() => {
      refs.bodyLink.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },

  stop() {
    clearInterval(this.timerId);
    this.disabled = false;
  },
};

refs.startBTN.addEventListener('click', colorChanger.start.bind(colorChanger));
refs.stopBTN.addEventListener('click', colorChanger.stop.bind(colorChanger));
