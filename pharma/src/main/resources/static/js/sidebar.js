
        // Sidebar Toggle
        document.addEventListener('DOMContentLoaded', () => {
            const sidebarToggle = document.querySelector('.sidebar-toggle');
            const sidebar = document.querySelector('.sidebar');

            sidebarToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });

            // Close sidebar when clicking outside
            document.addEventListener('click', (event) => {
                if (!sidebar.contains(event.target) && 
                    !sidebarToggle.contains(event.target) && 
                    sidebar.classList.contains('active')) {
                    sidebar.classList.remove('active');
                }
            });
        });

        function fetchMedicineInfo() {
            const dropdown = document.getElementById('medicineDropdown');
            const medicineDetails = document.getElementById('medicineDetails');
            
            const selectedMedicine = dropdown.value;
            if (selectedMedicine) {
                medicineDetails.innerHTML = `
                    <h3><i class="fas fa-prescription-bottle-alt"></i> ${selectedMedicine} Details</h3>
                    <p><strong>Manufacturer:</strong> Example Pharma</p>
                    <p><strong>Dosage:</strong> 500mg</p>
                    <p><strong>Common Uses:</strong> Treatment of various conditions</p>
                    <p><strong>Side Effects:</strong> Consult with a healthcare professional</p>
                `;
            } else {
                medicineDetails.innerHTML = '<p>Please select a medicine first.</p>';
            }
        }

        function fetchAllMedicines() {
            const allMedicines = document.getElementById('allMedicines');
            
            const medicines = [
                'Paracetamol', 'Ibuprofen', 'Aspirin', 
                'Amoxicillin', 'Metformin', 'Lisinopril'
            ];

            allMedicines.innerHTML = medicines.map(medicine => `
                <div class="medicine-card">
                    <h3><i class="fas fa-capsules"></i> ${medicine}</h3>
                    <p>Brief description of ${medicine}</p>
                    <button onclick="fetchMedicineInfo()"><i class="fas fa-info-circle"></i> View Details</button>
                </div>
            `).join('');

            const dropdown = document.getElementById('medicineDropdown');
            dropdown.innerHTML = `
                <option value="" disabled selected>Select a medicine</option>
                ${medicines.map(medicine => `
                    <option value="${medicine}">${medicine}</option>
                `).join('')};
            `;
        }

        function logoutUser() {
            alert('Logging out...');
        }

        document.addEventListener('DOMContentLoaded', fetchAllMedicines);
  