let currentInput = '0';
let previousInput = '';
let operator = null;

const currentDisplay = document.getElementById('current-op');
const previousDisplay = document.getElementById('previous-op');

// UPDATE DISPLAY
function updateDisplay() {
    currentDisplay.innerText = currentInput;
    previousDisplay.innerText = previousInput;
}

// APPEND NUMBER (ONLY INTEGERS)
function appendNumber(number) {
    if (currentInput === '0') {
        currentInput = number;
    } else {
        currentInput += number;
    }
    updateDisplay();
}

// CLEAR
function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = null;
    updateDisplay();
}

// DELETE LAST DIGIT
function deleteLast() {
    currentInput = currentInput.length > 1 ? currentInput.slice(0, -1) : '0';
    updateDisplay();
}

// ADD OPERATOR
function appendOperator(op) {
    if (operator !== null) compute();

    operator = op;
    previousInput = currentInput;
    currentInput = '0';
    updateDisplay();
}

// COMPUTE (INTEGER ONLY)
function compute() {
    let result;

    const prev = parseInt(previousInput);
    const current = parseInt(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            // INTEGER DIVISION
            result = Math.floor(prev / current);
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

// KEYBOARD SUPPORT (NO DECIMALS)
window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);

    if (e.key === 'Enter' || e.key === '=') compute();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('-');
    if (e.key === '*') appendOperator('*');
    if (e.key === '/') appendOperator('/');
});

// TOUCH EFFECT
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('touchstart', function(e) {
        e.currentTarget.style.filter = "brightness(1.5)";
    }, { passive: true });

    button.addEventListener('touchend', function(e) {
        e.currentTarget.style.filter = "brightness(1)";
    }, { passive: true });
});
