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
    // ❌ Block decimal input completely
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
    // ❌ Prevent operation if current input somehow has decimal
    if (currentInput.includes('.')) {
        alert("Only integers are allowed");
        clearDisplay();
        return;
    }

    if (operator !== null) compute();

    operator = op;
    previousInput = currentInput + ' ' + op;
    currentInput = '0';
    updateDisplay();
}

function compute() {
    let result;

    // ❌ Strict check: reject any decimal numbers
    if (currentInput.includes('.') || previousInput.includes('.')) {
        alert("Only integers are allowed");
        clearDisplay();
        return;
    }

    const prev = parseInt(previousInput);
    const current = parseInt(currentInput);

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
            // ✅ Integer division only
            result = Math.floor(prev / current);
            break;
        default: return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = '';
    updateDisplay();
}

// 3. KEYBOARD SUPPORT
window.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') appendNumber(e.key);

    // ❌ Block decimal key
    if (e.key === '.') return;

    if (e.key === '=' || e.key === 'Enter') compute();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
    if (e.key === '+') appendOperator('+');
    if (e.key === '-') appendOperator('-');
    if (e.key === '*') appendOperator('*');
    if (e.key === '/') appendOperator('/');
});

// 4. TOUCH SCREEN OPTIMIZATION
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('touchstart', function(e) {
        e.currentTarget.style.filter = "brightness(1.5)";
    }, { passive: true });

    button.addEventListener('touchend', function(e) {
        e.currentTarget.style.filter = "brightness(1)";
    }, { passive: true });
});
