let currentInput = '0';
let previousInput = '';
let operator = null;

const currentDisplay = document.getElementById('current-op');
const previousDisplay = document.getElementById('previous-op');

// 1. UPDATE DISPLAY FUNCTION
function updateDisplay() {
    currentDisplay.innerText = currentInput;
    previousDisplay.innerText = previousInput;
}

// 2. CORE LOGIC FUNCTIONS
function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        if (number === '.' && currentInput.includes('.')) return;
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
    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(current)) return;

    switch (operator) {
        case '+': result = prev + current; break;
        case '-': result = prev - current; break;
        case '*': result = prev * current; break;
        case '/':
            if (current === 0) {
                alert("Cannot divide by zero");
                clearDisplay();
                return;
            }
            result = prev / current;
            break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

// 3. WINDOWS KEYBOARD SUPPORT
// This allows users to use the Numpad or Top Row numbers
window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === '=') compute();
    if (e.key === 'Enter') compute();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('-');
    if (e.key === '*') appendOperator('*');
    if (e.key === '/') appendOperator('/');
});

// 4. TOUCH SCREEN OPTIMIZATION
// Prevents accidental "double-tap to zoom" on mobile devices
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('touchstart', function(e) {
        // This ensures the button feels "instant" on mobile
        e.currentTarget.style.filter = "brightness(1.5)";
    }, {passive: true});

    button.addEventListener('touchend', function(e) {
        e.currentTarget.style.filter = "brightness(1)";
    }, {passive: true});
});
