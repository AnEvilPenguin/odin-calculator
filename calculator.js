let runningTotal = 0;
let lastOperator;
let equalsExecuted = false;
let errorOperation = false;

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

function getElementInnerText(selector) {
  return document.querySelector(selector).innerText;
}

function setElementInnerText(selector, content) {
  const element = document.querySelector(selector);
  element.innerText = content;
}

function getTopScreenContent() {
  return getElementInnerText(".screen-top p");
}

function setTopScreenContent(content) {
  setElementInnerText(".screen-top p", content);
}

function getBottomScreenContent() {
  return getElementInnerText(".screen-bottom p");
}

function setBottomScreenContent(content) {
  setElementInnerText(".screen-bottom p", content);
}

function clearElement() {
  setBottomScreenContent("0");
}

function clearAll() {
  equalsExecuted = false;
  setTopScreenContent("");
  clearElement();
}

function addDecimal() {
  const bottomScreenContent = getBottomScreenContent();

  if (!bottomScreenContent.includes(".")) {
    setBottomScreenContent(bottomScreenContent + ".");
  }
}

function negate() {
  const bottomScreenContent = getBottomScreenContent();

  const output =
    bottomScreenContent[0] === "-"
      ? bottomScreenContent.substring(1)
      : "-" + bottomScreenContent;

  setBottomScreenContent(output);
}

function number({ target: { id } }) {
  if (errorOperation) {
    clearAll();
    errorOperation = false;
  }

  const bottomScreenContent = getBottomScreenContent();

  if (bottomScreenContent === "0") {
    setBottomScreenContent(`${id}`);
    return;
  }

  if (equalsExecuted) {
    clearAll();
    setBottomScreenContent(`${id}`);
    equalsExecuted = false;
    return;
  }

  setBottomScreenContent(bottomScreenContent + id);
}

function operate({ target }) {
  if (errorOperation) {
    clearAll();
    errorOperation = false;
  }

  if (equalsExecuted) {
    setTopScreenContent("");
    equalsExecuted = false;
  }

  const { id } = target;

  const bottomScreenContent = getBottomScreenContent();
  const topScreenContent = getTopScreenContent();

  const displayOperator = target.innerText;

  const nextNumber = +bottomScreenContent;

  if (topScreenContent === "") {
    runningTotal = nextNumber;

    setTopScreenContent(bottomScreenContent + displayOperator);
  } else {
    if (bottomScreenContent === "0") {
      setTopScreenContent(topScreenContent + displayOperator);
    } else {
      setTopScreenContent(
        topScreenContent + bottomScreenContent + displayOperator
      );

      runningTotal += nextNumber;

      execute(nextNumber);
    }
  }

  setBottomScreenContent("0");

  lastOperator = id;
}

function equals() {
  if (equalsExecuted) {
    return;
  }

  const bottomScreenContent = getBottomScreenContent();
  const topScreenContent = getTopScreenContent();

  setTopScreenContent(topScreenContent + bottomScreenContent);

  execute(+bottomScreenContent);

  equalsExecuted = true;
  runningTotal = 0;
}

function execute(nextNumber) {
  const operator = OPERATIONS[lastOperator];

  let output;

  try {
    output = operator(nextNumber, runningTotal);
  } catch (error) {
    output = error.message;
    errorOperation = true;
  }

  setBottomScreenContent(output);
}
