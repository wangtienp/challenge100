let currentDisplay = document.querySelector(".current");
let previewDisplay = document.querySelector(".preview");
let numBtns = document.querySelectorAll(".num");
let operandBtns = document.querySelectorAll(".operator");
let clearBtn = document.querySelector(".clear");
let delBtn = document.querySelector(".delete");
let equalBtn = document.querySelector(".equal");
let isValid = true;
let currentFormula = "0"
math.config({
  number: "BigNumber",
  precision: 12,
});
initialDisplay();
function initialDisplay() {
  previewDisplay.textContent = "";
  currentDisplay.textContent = "0";
  currentFormula = "0"
}
numBtns.forEach((num) => {
  num.addEventListener("click", () => {
    let operands = identifyOperands(currentDisplay.textContent);
    appendNumAftDotValidation(operands, num);
    updatePreview();
  });
});
operandBtns.forEach((operand) => {
  operand.addEventListener("click", () => {
    // isLastTwoWordOperator(currentDisplay.textContent, ope);
    appendOperator(operand);
    updatePreview();
  });
});

clearBtn.addEventListener("click", () => {
  initialDisplay();
});
delBtn.addEventListener("click", () => {
  deleteWord();
  updatePreview();
});
equalBtn.addEventListener("click", () => {
  getResult();
});
function identifyOperands(currentText) {
  return currentText.split(/[+\-*\/]/);
}
function appendNumAftDotValidation(operands, num) {
  let count = operands.length - 1;
  // console.log(operands);
  if (num.dataset.num == "." && operands[count].includes(".")) return;
  else {
    if (currentDisplay.textContent == "0") {
      currentDisplay.textContent = num.dataset.num;
      currentFormula = num.dataset.num
    } else {
      currentDisplay.textContent += num.dataset.num;
      currentFormula += num.dataset.num
      // console.log(currentFormula)
    }
  }
}
function appendOperator(operator) {
  // let lastChar = currentText[currentText.length-1]

  // if last two chars are operators then cannot press any operator
  if (currentFormula.length >= 2) {
    if (currentFormula[currentFormula.length - 2].match(/[*/]/)) {
      if (currentFormula[currentFormula.length - 1].match(/[*/]/)) return
      else {
        currentDisplay.textContent = currentDisplay.textContent.slice(0, -1) + operator.textContent
        currentFormula = currentFormula.slice(0, -1) + operator.dataset.num
      }
    }
  }


  // if last char is first operator
  if (currentFormula[currentFormula.length - 1].match(/[+\-*\/]/)) {
    // if current operator = * or / then just replace first operator with it OR if current operator is + or - And first operator = + or /
    if ((operator.dataset.num == "*" || operator.dataset.num == "/") ||
      ((operator.dataset.num == "+" || operator.dataset.num == "-") && currentFormula[currentFormula.length - 1].match(/[+-]/))) {
      currentFormula = currentFormula.slice(0, -1) + operator.dataset.num
      currentDisplay.textContent = currentDisplay.textContent.slice(0, -1) + operator.textContent
    }
    //else append
    else {
      currentDisplay.textContent += operator.textContent;
      currentFormula += operator.dataset.num;
    }
  }
  // if last char not operator then append
  else {
    currentDisplay.textContent += operator.textContent;
    currentFormula += operator.dataset.num
  }
}

function deleteWord() {
  if (currentDisplay.textContent.length <= 1) {
    currentDisplay.textContent = "0";
    currentFormula = "0"
  } else {
    currentFormula = currentFormula.slice(0, -1)
    currentDisplay.textContent = currentDisplay.textContent.slice(0, -1);
  }
}

function updatePreview() {
  try {
    previewDisplay.textContent = math.evaluate(currentFormula);
    isValid = true;
    // console.log(math.evaluate(currentDisplay.textContent))
  } catch (error) {
    previewDisplay.textContent = "0";
    isValid = false;
    // console.log(isValid)
  }
  //before 2nd operand / at the stage of operator not showing any display
}

function getResult() {
  currentAnimate();
  previewAnimate();
  if (!isValid) {
    return;
    // console.log("not valid")
    // return
  } else {
    let temp = currentDisplay.textContent;
    currentDisplay.textContent = previewDisplay.textContent;
    previewDisplay.textContent = temp;
  }
}

function currentAnimate() {
  currentDisplay.animate(
    [
      {
        lineHeight: "3",
      },
      {
        lineHeight: "1",
      },
    ],
    {
      duration: 250,
    }
  );
}
function previewAnimate() {
  // console.log(previewDisplay.textContent);
  if ((previewDisplay.textContent = "")) {
    return;
  } else {
    updatePreview();
    // previewDisplay.textContent = math.evaluate(currentDisplay.textContent);
    previewDisplay.animate(
      [
        {
          fontSize: "2rem",
        },
        {
          fontSize: "1rem",
        },
      ],
      {
        duration: 250,
      }
    );
  }
}
