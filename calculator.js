// TODO Operation History
// TODO Track Current Total?

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

function operate({ target }) {
  console.log(target);
}
