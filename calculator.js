let runningTotal = 0;
let lastOperator;
let equalsExecuted = false;

const OPERATIONS = {
  add,
  subtract,
  multiply,
  divide,
};

function add(next, current = 0) {
  return current + next;
}

function subtract(next, current = 0) {
  return current - next;
}

function multiply(next, current = 0) {
  return current * next;
}

function divide(next, current = 0) {
  if (next === 0) {
    throw new Error("Cannot divide by 0");
  }

  return current / next;
}

function clearElement() {
  document.querySelector(".screen-bottom p").innerText = "0";
}

function clearAll() {
  equalsExecuted = false;
  document.querySelector(".screen-top p").innerText = "";
  clearElement();
}

function addDecimal() {
  const bottomScreen = document.querySelector(".screen-bottom p");

  if (!bottomScreen.innerText.includes(".")) {
    bottomScreen.innerText += ".";
  }
}

function negate() {
  const bottomScreen = document.querySelector(".screen-bottom p");

  const output =
    bottomScreen.innerText[0] === "-"
      ? bottomScreen.innerText.substring(1)
      : "-" + bottomScreen.innerText;

  bottomScreen.innerText = output;
}

function number({ target: { id } }) {
  const bottomScreen = document.querySelector(".screen-bottom p");

  if (bottomScreen.innerText === "0") {
    bottomScreen.innerText = `${id}`;
    return;
  }

  if (equalsExecuted) {
    clearAll();
    bottomScreen.innerText = `${id}`;
    return;
  }

  bottomScreen.innerText += id;
}

function operate({ target }) {
  const { id } = target;

  const topScreen = document.querySelector(".screen-top p");
  const bottomScreen = document.querySelector(".screen-bottom p");

  const displayOperator = target.innerText;

  runningTotal = +bottomScreen.innerText;
  topScreen.innerText += bottomScreen.innerText + displayOperator;
  bottomScreen.innerText = "0";

  lastOperator = id;
}

function equals() {
  if (equalsExecuted) {
    return;
  }

  const topScreen = document.querySelector(".screen-top p");
  const bottomScreen = document.querySelector(".screen-bottom p");

  const operator = OPERATIONS[lastOperator];

  topScreen.innerText += bottomScreen.innerText;
  const next = +bottomScreen.innerText;

  const output = operator(next, runningTotal);

  bottomScreen.innerText = `${output}`;

  equalsExecuted = true;
}
