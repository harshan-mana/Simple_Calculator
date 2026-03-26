let currentInput = '0';
let previousInput = '';
let operator = null;

const currentDisplay = document.getElementById('current-op');
const previousDisplay = document.getElementById('previous-op');

function updateDisplay() {
    currentDisplay.innerText = currentInput;
    previousDisplay.innerText = previousInput;
}

// 1. INPUT LOGIC (Allows Decimals)
function appendNumber(number) {
    if (currentInput === '0' && number !== '.') {
        currentInput = number;
    } else {
        // Prevent multiple decimals in one number
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

// 2. COMPUTATION LOGIC (The "Float Result" Guard)
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
                showError("Div by 0");
                return;
            }
            result = prev / current;
            break;
        default: return;
    }

    // 🔍 THE CORE CHANGE:
    // We use Number.isInteger() to check if the result is a whole number.
    // Example: 2.5 + 2.5 = 5.0 (Passes)
    // Example: 10 / 3 = 3.33 (Fails -> Error)
    if (!Number.isInteger(result)) {
        showError("Float Error");
    } else {
        currentInput = result.toString();
        operator = null;
        previousInput = '';
        updateDisplay();
    }
}

// 3. ERROR HANDLING HELPER
function showError(msg) {
    currentInput = msg;
    previousInput = '';
    operator = null;
    updateDisplay();
    // Auto-reset after 1.5s for better UX
    setTimeout(() => { 
        if(currentInput === msg) clearDisplay(); 
    }, 1500);
}

// 4. CROSS-PLATFORM SUPPORT (Windows & Touch)
window.addEventListener('keydown', (e) => {
    if (e.key >= 0 && e.key <= 9) appendNumber(e.key);
    if (e.key === '.') appendNumber('.');
    if (e.key === 'Enter' || e.key === '=') compute();
    if (e.key === 'Backspace') deleteLast();
    if (e.key === 'Escape') clearDisplay();
    if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
});
