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

  bottomScreen.innerText += id;
}

function operate({ target }) {
  console.log(target);
}
