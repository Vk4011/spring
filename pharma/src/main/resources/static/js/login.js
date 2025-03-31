document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');
    const apiErrorElement = document.getElementById('apiError');

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        clearErrors();
        
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        // Basic validation
        if (!validateEmail(email)) {
            showFieldError(emailInput, 'emailError', 'Please enter a valid email address');
            return;
        }
        
        if (!password) {
            showFieldError(passwordInput, 'passwordError', 'Password is required');
            return;
        }

        try {
            // Show loading state
            loginButton.disabled = true;
            loginButton.innerHTML = '<div class="spinner"></div> Logging in...';

            const response = await fetch('https://spring-1-z6rq.onrender.com/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    email: email,
                    password: password
                })
            });

            const responseText = await response.text();

            if (!response.ok) {
                const errorMessage = responseText.includes("Invalid credentials") 
                    ? "Invalid email or password" 
                    : responseText || `Login failed (Status: ${response.status})`;
                throw new Error(errorMessage);
            }

            // Handle successful login
            localStorage.setItem('authToken', responseText);
            window.location.href = './home.html';

        } catch (error) {
            console.error('Login error:', error);
            showApiError(error.message);
            passwordInput.value = ''; // Clear password field on error
        } finally {
            // Reset button state
            loginButton.disabled = false;
            loginButton.innerHTML = 'Login';
        }
    });

    // Helper functions
    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function showFieldError(input, errorId, message) {
        const errorElement = document.getElementById(errorId);
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    }

    function showApiError(message) {
        apiErrorElement.textContent = message;
        apiErrorElement.style.display = 'block';
    }

    function clearErrors() {
        apiErrorElement.style.display = 'none';
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
    }
});


function logoutUser() {
    localStorage.removeItem('authToken');
    window.location.href = "login.html";
}
