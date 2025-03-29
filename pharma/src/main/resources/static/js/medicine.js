const API_BASE_URL = "http://localhost:4040/medicine";

// Global variable to store medicines data
let medicinesData = [];

document.addEventListener("DOMContentLoaded", () => {
    fetchMedicinesForDropdown();
});

// Fetch all medicines for dropdown
async function fetchMedicinesForDropdown() {
    try {
        const response = await fetch(`${API_BASE_URL}/medicine_info`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        medicinesData = await response.json();
        populateDropdown(medicinesData);
    } catch (error) {
        console.error("Error fetching medicines:", error);
        showErrorMessage("Error loading medicine data. Please try again later.");
    }
}

// Populate dropdown with medicine names
function populateDropdown(medicines) {
    const dropdown = document.getElementById("medicineDropdown");
    dropdown.innerHTML = `<option value="" disabled selected>Select a medicine</option>`;

    medicines.forEach(medicine => {
        const option = document.createElement("option");
        option.value = medicine.id;
        option.textContent = medicine.name;
        dropdown.appendChild(option);
    });
}

// Fetch details for the selected medicine
function fetchMedicineInfo() {
    const selectedId = document.getElementById("medicineDropdown").value;
    if (!selectedId) return alert("Please select a medicine first.");

    const selectedMedicine = medicinesData.find(med => med.id == selectedId);
    displayMedicineDetails(selectedMedicine);
}

// Display single medicine details
function displayMedicineDetails(medicine) {
    if (!medicine) {
        showErrorMessage("Medicine details not found.");
        return;
    }

    const detailsDiv = document.getElementById("medicineDetails");
    detailsDiv.innerHTML = `
        <h3>${medicine.name}</h3>
        <div class="medicine-detail"><strong>ID:</strong> ${medicine.id}</div>
        <div class="medicine-detail"><strong>Precautions:</strong> ${medicine.precautions}</div>
        <div class="medicine-detail"><strong>Suggested Dosage:</strong> ${medicine.suggestedDosage}</div>
        <div class="medicine-detail"><strong>Best Time to Take:</strong> ${medicine.bestTimeToTake}</div>
        <div class="medicine-detail"><strong>Uses:</strong> ${medicine.uses}</div>
    `;

    document.getElementById("allMedicines").style.display = "none";
    detailsDiv.style.display = "block";
}

// Fetch and display all medicines
async function fetchAllMedicines() {
    try {
        const response = await fetch(`${API_BASE_URL}/all_medicines`);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const medicines = await response.json();
        displayAllMedicines(medicines);
    } catch (error) {
        console.error("Error fetching all medicines:", error);
        showErrorMessage("Error loading all medicines. Please try again later.");
    }
}

// Display all medicines in a table
function displayAllMedicines(medicines) {
    if (!medicines.length) {
        showErrorMessage("No medicines available.");
        return;
    }

    const allMedicinesDiv = document.getElementById("allMedicines");
    allMedicinesDiv.innerHTML = `
        <h3>All Medicines</h3>
        <table border="1" style="width: 100%; border-collapse: collapse;">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Precautions</th>
                    <th>Dosage</th>
                    <th>Best Time</th>
                    <th>Uses</th>
                </tr>
            </thead>
            <tbody>
                ${medicines.map(medicine => `
                    <tr>
                        <td>${medicine.id}</td>
                        <td>${medicine.name}</td>
                        <td>${medicine.precautions}</td>
                        <td>${medicine.suggestedDosage}</td>
                        <td>${medicine.bestTimeToTake}</td>
                        <td>${medicine.uses}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;

    document.getElementById("medicineDetails").style.display = "none";
    allMedicinesDiv.style.display = "block";
}

// Show error message
function showErrorMessage(message) {
    document.getElementById("medicineDetails").innerHTML = `<p style="color: red;">${message}</p>`;
}

// Prevent browser back navigation
function clearPageStack() {
    setTimeout(() => {
        window.history.pushState(null, null, window.location.href);
        window.onpopstate = () => window.history.pushState(null, null, window.location.href);
    }, 0);
}

window.onload = clearPageStack;
