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

function operate({ target }) {
  console.log(target);
}
