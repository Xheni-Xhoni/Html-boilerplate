let firstOperand = '';
let secondOperand = '';
let result = '';
let operation = '';

let content;

const displayScreen = document.getElementById('display');
const clearButton = document.getElementById('clear');
const deleteButton = document.getElementById('delete');
const operators = document.querySelectorAll('#operators > div');
const equal = document.getElementById('equal');
const numbers = document.querySelectorAll('#numbers > div');

function keyOrClick(e) {
    if(e.key === undefined) {
        content = e.target.textContent;
    } else {
        if(e.key === 'Enter') {
            content = '=';
        } else {
            content = e.key;
        }
    }

    if (content === 'c' || content === 'C') {
        clear();
    } else if (content === 'DEL' || content === 'Backspace') {
        del()
    } else {
        display(content);
    }
}
            
function isNumber(num) { return num <= 9 && num >= 0 ? true : false }
function isDecimal(dec) { return dec === '.' ? true : false }
function isOperator(op) { return op === '+' || op === '-' || op === '*' || op === '/' ? true : false }
function isEqual(op) { return op === '=' ? true : false }

function display(entry) {
    if (displayScreen.textContent.includes('ERROR')) {
        clear();
    }
    if (!firstOperand && !secondOperand && !operation) {
        if (isNumber(entry)) {
            firstOperand = entry;
            displayScreen.textContent = firstOperand;
        }
    } else if (firstOperand && !secondOperand && !operation) {
        if (firstOperand === '0' && isNumber(entry)) {
            firstOperand = entry;
            displayScreen.textContent = firstOperand;
        } else if (isNumber(entry)) {
            if(result) {
                firstOperand = '';
                result = '';
            }
            firstOperand += entry;
            displayScreen.textContent = firstOperand;
        } else if (isDecimal(entry) && !firstOperand.includes('.')) {
            firstOperand += entry;
            displayScreen.textContent = firstOperand;
        } else if (isOperator(entry)) {
            operation = entry;
            displayScreen.textContent = firstOperand + ' ' + operation;
        }
    } else if (firstOperand && !secondOperand && operation) {
        if (isNumber(entry)) {
            secondOperand = entry;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;
        }
    } else if (firstOperand && secondOperand && operation) {
        if (secondOperand === '0' && (isNumber(entry))) {
            secondOperand = entry;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;;
        } else if (isNumber(entry)) {
            secondOperand += entry;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;
        } else if (isDecimal(entry) && !secondOperand.includes('.')) {
            secondOperand += entry;
            displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;
        } else if (isOperator(entry)) {
            result = operate(firstOperand, operation, secondOperand);
            if (result.includes('ERROR')) {
                operation = '';
                firstOperand = ''
                displayScreen.textContent = result;
            } else {
                operation = entry;
                displayScreen.textContent = result + ' ' + operation;
                firstOperand = result;
            }
            secondOperand = '';
            result = ''
        } else if (isEqual(entry)) {
            result = operate(firstOperand, operation, secondOperand);
            displayScreen.textContent = result;
            firstOperand = result;
            operation = '';
            secondOperand = '';
        }
    } 
}

function operate(firstOperand, operation, secondOperand) {
    firstOperand = Number(firstOperand);
    secondOperand = Number(secondOperand);
    if(secondOperand === 0 && operation === '/') {
        result = 'ERROR: we can\'t divide per 0';
    } else {
        switch (operation) {
            case '+':
                result = Math.round((firstOperand + secondOperand) * 1000000) / 1000000;
                break;
            case '-':
                result = Math.round((firstOperand - secondOperand) * 1000000) / 1000000;
                break;
            case '*':
                result = Math.round((firstOperand * secondOperand) * 1000000) / 1000000;
                break;
            case '/':
                result = Math.round((firstOperand / secondOperand) * 1000000) / 1000000;
                break;
        }
    }
    return result.toString()
}

function clear() {
    displayScreen.textContent = '';
    firstOperand = '';
    secondOperand = '';
    operation = '';
    result = '';
};

function del() {
    if (displayScreen.textContent.includes('ERROR') || result) {
        clear();
    } else if(secondOperand) {
        secondOperand = secondOperand.slice(0, -1);
        displayScreen.textContent = firstOperand + ' ' + operation + ' ' + secondOperand;
    } else if (operation) {
        operation = '';
        displayScreen.textContent = firstOperand;
    } else if (firstOperand) {
        firstOperand = firstOperand.slice(0, -1);
        displayScreen.textContent = firstOperand;
    }
}

clearButton.addEventListener('click', keyOrClick);
deleteButton.addEventListener('click', keyOrClick);
numbers.forEach(number => {number.addEventListener('click', keyOrClick)});
operators.forEach(operator => {operator.addEventListener('click', keyOrClick)});
equal.addEventListener('click', keyOrClick);

document.addEventListener('keydown', keyOrClick);
