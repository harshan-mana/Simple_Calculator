let currentInput = '0';
let previousInput = '';
let operator = null;

const currentDisplay = document.getElementById('current-op');
const previousDisplay = document.getElementById('previous-op');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    previousDisplay.innerText = previousInput;
}
function appendNumber(number) {
    if (number === '.') return; 

    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

function deleteLast() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}

function appendOperator(op) {
    if (operator !== null) compute();
    operator = op;
    previousInput = currentInput + ' ' + op;
    currentInput = '0';
    updateDisplay();
}

function compute() {
    let result;
    const prev = parseInt(previousInput);
    const current = parseInt(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/':
            if (current === 0) {
                showError("Div by 0");
                return;
            }
            result = prev / current;
            break;
        default: return;
    }
    if (!Number.isInteger(result)) {
        showError("Integer Only");
    } else {
        currentInput = result.toString();
        operator = null;
        previousInput = '';
        updateDisplay();
    }
}

function showError(msg) {
    currentInput = msg;
    previousInput = '';
    operator = null;
    updateDisplay();
    setTimeout(() => { if(currentInput === msg) clearDisplay(); }, 1500);
}

window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === 'Enter' || e.key === '=') compute();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
    if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
});
