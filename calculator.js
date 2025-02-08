function calculateCost() {
    // Get measurements
    const firstFloorSF = parseFloat(document.getElementById('firstFloorSF').value) || 0;
    const secondFloorSF = parseFloat(document.getElementById('secondFloorSF').value) || 0;
    const railingLF = parseFloat(document.getElementById('railingLF').value) || 0;
    const steps = parseFloat(document.getElementById('steps').value) || 0;
    const posts = parseFloat(document.getElementById('posts').value) || 0;

    // Get selected materials
    const firstLevel = document.querySelector('input[name="firstLevel"]:checked');
    const secondLevel = document.querySelector('input[name="secondLevel"]:checked');
    const railing = document.querySelector('input[name="railing"]:checked');

    let totalCost = 0;

    // Calculate first level cost
    if (firstLevel) {
        totalCost += firstFloorSF * parseFloat(firstLevel.dataset.price);
    }

    // Calculate second level cost
    if (secondLevel) {
        totalCost += secondFloorSF * parseFloat(secondLevel.dataset.price);
    }

    // Calculate railing cost
    if (railing) {
        totalCost += railingLF * parseFloat(railing.dataset.price);
    }

    // Calculate additional options
    if (document.getElementById('pressureTreated').checked) {
        totalCost += (firstFloorSF + secondFloorSF) * 32;
    }
    if (document.getElementById('postWrap').checked) {
        totalCost += posts * 355;
    }
    if (document.getElementById('stairs').checked) {
        totalCost += steps * 255;
    }
    if (document.getElementById('dumpFee').checked) {
        totalCost += (firstFloorSF + secondFloorSF) * 3;
    }
    if (document.getElementById('permits').checked) {
        totalCost += 4000;
    }
    if (document.getElementById('rainEscape').checked) {
        totalCost += (firstFloorSF + secondFloorSF) * 22;
    }

    // Display results
    document.getElementById('result').innerHTML = `
        <h3>Cost Breakdown:</h3>
        <p>Total Square Footage: ${(firstFloorSF + secondFloorSF).toFixed(2)} SF</p>
        <p>Total Railing Length: ${railingLF} LF</p>
        <p>Number of Steps: ${steps}</p>
        <p>Number of Posts: ${posts}</p>
        <p><strong>Total Estimated Cost: $${totalCost.toFixed(2)}</strong></p>
    `;
}

// Add event listeners to all inputs
function initializeAutoCalculate() {
    // Listen to number inputs
    const numberInputs = document.querySelectorAll('input[type="number"]');
    numberInputs.forEach(input => {
        input.addEventListener('input', calculateCost);
    });

    // Listen to radio buttons
    const radioInputs = document.querySelectorAll('input[type="radio"]');
    radioInputs.forEach(input => {
        input.addEventListener('change', calculateCost);
    });

    // Listen to checkboxes
    const checkboxInputs = document.querySelectorAll('input[type="checkbox"]');
    checkboxInputs.forEach(input => {
        input.addEventListener('change', calculateCost);
    });
}

// Initialize the auto-calculate functionality when the page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeAutoCalculate();
    calculateCost(); // Initial calculation
}); 