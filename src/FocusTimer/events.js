import * as el from './elements.js';
import * as actions from './actions.js';
import state from './state.js';
import { updateDisplay } from './timer.js';

let statusMinutes;
let statusSeconds;

export function resgisterControls() {
  el.controls.addEventListener('click', (event) => {
    const action = event.target.dataset.action;
    if(typeof(actions[action])  != 'function') {
      return;
    };

    actions[action]();
  });
};

export function setMinutes() {
  el.minutes.addEventListener('focus', () => {
    statusMinutes = el.minutes.textContent;
    statusSeconds = el.seconds.textContent;
    el.minutes.textContent = "";
  });

  el.minutes.onkeypress = (event) => /\d/.test(event.key); // /\d/ -> expressao regulao que verifica se é um número

  el.minutes.addEventListener('blur', (event) => {
    let time = event.currentTarget.textContent;
    time = time > 60 ? 60 : time;

    state.minutes = time;
    state.seconds = 0;

    if(state.minutes == "") {
      state.minutes = statusMinutes;
      state.seconds = statusSeconds;
    };

    updateDisplay();
    el.minutes.removeAttribute('contenteditable');
  });
};
