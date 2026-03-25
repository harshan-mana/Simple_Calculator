async function performCalculation() {
    const n1 = document.getElementById('num1').value;
    const n2 = document.getElementById('num2').value;
    const op = document.getElementById('op').value;
    const display = document.getElementById('result-display');
    if (!n1 || !n2) {
        display.innerText = "Please enter both numbers.";
        return;
    }
    try {
        const response = await fetch(`/api/calculate?op=${op}&num1=${n1}&num2=${n2}`);
        const data = await response.json();

        if (response.ok) {
            display.innerText = `Result: ${data.result}`;
        } else {
            display.innerText = `Error: ${data.error || "Invalid Request"}`;
        }
    } catch (error) {
        display.innerText = "Error connecting to server.";
    }
}
