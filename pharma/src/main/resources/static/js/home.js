// Global variables
let allMedicines = [];
const apiBaseUrl = 'https://spring-1-z6rq.onrender.com/api/pharma/medicine';

// Initialize when page loads
document.addEventListener('DOMContentLoaded', function () {
    fetchMedicines();
    initializeSidebar();
});

// Fetch all medicines from API
async function fetchMedicines() {
    try {
        const response = await fetch(apiBaseUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        allMedicines = await response.json();

        // Ensure all stores are present
        addMissingStores();

        populateMedicineDropdown(allMedicines);
        populateStoreFilter(allMedicines);
        displayMedicines(allMedicines);
    } catch (error) {
        console.error('Error fetching medicines:', error);
        showError('Error loading medicine data. Please try again later.');
    }
}

// Ensure all predefined stores exist
function addMissingStores() {
    const storeList = [
        'Apollo Pharmacy', 'Medsquad', 'Om Pharmacy', 'Pharmacy',
        'Pride Pharmacy', 'Walgreens', 'Carewell Pharmacy',
        'Drug Emporium', 'Health Hub'
    ];

    allMedicines.forEach(medicine => {
        if (!medicine.store_name || medicine.store_name.trim() === '') {
            const randomStore = storeList[Math.floor(Math.random() * storeList.length)];
            medicine.store_name = randomStore; // Assign random store
        }
    });
}

// Populate medicine dropdown
function populateMedicineDropdown(medicines) {
    const dropdown = document.getElementById('medicineDropdown');
    dropdown.innerHTML = '<option value="" disabled selected>Select a medicine</option>';

    medicines.forEach(medicine => {
        const option = document.createElement('option');
        option.value = medicine.id;
        option.textContent = medicine.name;
        dropdown.appendChild(option);
    });
}

// Populate store filter dropdown
function populateStoreFilter(medicines) {
    const storeFilter = document.getElementById('storeFilter');
    const stores = [...new Set(medicines.map(med => med.store_name))]; // Unique stores

    storeFilter.innerHTML = '<option value="">All Stores</option>';
    stores.forEach(store => {
        const option = document.createElement('option');
        option.value = store;
        option.textContent = store;
        storeFilter.appendChild(option);
    });
}

// Search for specific medicine
function searchMedicine() {
    const dropdown = document.getElementById('medicineDropdown');
    const selectedId = dropdown.value;

    if (!selectedId) {
        showError('Please select a medicine first');
        return;
    }

    const selectedMedicine = allMedicines.find(med => med.id == selectedId);
    if (selectedMedicine) {
        displayMedicines([selectedMedicine]);
    }
}

// Apply filters and sorting
function applyFilters() {
    const storeFilter = document.getElementById('storeFilter').value;
    const sortDirection = document.getElementById('sortPrice').value;

    let filtered = allMedicines.filter(med =>
        !storeFilter || med.store_name === storeFilter
    );

    filtered.sort((a, b) =>
        sortDirection === 'asc' ? a.price - b.price : b.price - a.price
    );

    displayMedicines(filtered);
}

// Display medicines in results
function displayMedicines(medicines) {
    const resultsDiv = document.getElementById('medicineResults');

    if (medicines.length === 0) {
        resultsDiv.innerHTML = '<div class="no-results">No medicines found matching your criteria.</div>';
        return;
    }

    resultsDiv.innerHTML = medicines.map(medicine => `
        <div class="medicine-card">
            <h3>${medicine.name}</h3>
            <div class="medicine-detail"><strong>Store:</strong> ${medicine.store_name || 'N/A'}</div>
            <div class="medicine-detail"><strong>Location:</strong> ${medicine.store_location || 'N/A'}</div>
            <div class="medicine-detail"><strong>Price:</strong> ₹${medicine.price ? medicine.price.toFixed(2) : 'N/A'}</div>
            <div class="medicine-detail"><strong>Quantity:</strong> ${medicine.quantity || 'N/A'}</div>
            <div class="medicine-detail"><strong>Expiry:</strong> ${medicine.expiry_date || 'N/A'}</div>
            <div class="medicine-detail"><strong>Discount:</strong> ${medicine.discount ? (medicine.discount * 100).toFixed(0) : '0'}%</div>
        </div>
    `).join('');
}

// Sidebar initialization
function initializeSidebar() {
    document.querySelector('.sidebar-toggle').addEventListener('click', () => {
        document.querySelector('.sidebar').classList.toggle('active');
    });
}

// Error handling
function showError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error';
    errorDiv.textContent = message;
    document.getElementById('medicineResults').appendChild(errorDiv);
    setTimeout(() => errorDiv.remove(), 3000);
}

// Logout function
function logoutUser() {
    localStorage.removeItem('authToken');
    window.location.href = 'login.html';
}
