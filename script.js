document.addEventListener('DOMContentLoaded', function() {
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const opSelect = document.getElementById('operation');
    const calculateBtn = document.getElementById('calculate-btn');
    const outputSpan = document.getElementById('output');
    function calculate() {
        const n1 = parseFloat(num1Input.value);
        const n2 = parseFloat(num2Input.value);
        const operation = opSelect.value;
        let result = 0;
        if (isNaN(n1) || isNaN(n2)) {
            outputSpan.innerText = "Error: Invalid Input";
            outputSpan.style.color = "#dc3545";
            return;
        }
        switch (operation) {
            case 'add':
                result = n1 + n2;
                break;
            case 'subtract':
                result = n1 - n2;
                break;
            case 'multiply':
                result = n1 * n2;
                break;
            case 'divide':
                if (n2 === 0) {
                    outputSpan.innerText = "Error: Cannot divide by 0";
                    outputSpan.style.color = "#dc3545"; 
                    return;
                }
                result = n1 / n2;
                break;
            default:
                result = "Unknown Operation";
        }
        outputSpan.innerText = result;
        outputSpan.style.color = "#28a745"; 
    }
    calculateBtn.addEventListener('click', calculate);
});
