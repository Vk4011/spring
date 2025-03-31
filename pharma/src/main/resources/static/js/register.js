document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm_password');
    const submitBtn = document.getElementById('submitBtn');
    const loader = document.getElementById('loader');
    const apiErrorElement = document.getElementById('apiError');
    const successMessageElement = document.getElementById('successMessage');

    // Real-time validation
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    confirmPasswordInput.addEventListener('input', validateConfirmPassword);

    form.addEventListener('submit', async function(event) {
        event.preventDefault();
        clearMessages();
        
        if (validateForm()) {
            try {
                showLoading(true);
                
                // API call
                const response = await fetch('https://spring-1-z6rq.onrender.com/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: new URLSearchParams({
                        email: emailInput.value.trim(),
                        password: passwordInput.value.trim()
                    })
                });

                const responseText = await response.text();

                if (!response.ok) {
                    throw new Error(responseText || 'Registration failed');
                }

                // Registration successful
                showSuccess('Registration successful! Redirecting...');
                localStorage.setItem('authToken', responseText);
                setTimeout(() => {
                    window.location.href = './login.html';
                }, 2000);

            } catch (error) {
                handleError(error);
            } finally {
                showLoading(false);
            }
        }
    });

    function validateEmail() {
        const email = emailInput.value.trim();
        const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        toggleError(emailInput, 'emailError', !isValid, 'Please enter a valid email address');
        return isValid;
    }

    function validatePassword() {
        const password = passwordInput.value;
        const isValid = password.length >= 8;
        toggleError(passwordInput, 'passwordError', !isValid, 'Password must be at least 8 characters');
        return isValid;
    }

    function validateConfirmPassword() {
        const confirmPassword = confirmPasswordInput.value;
        const isValid = confirmPassword === passwordInput.value;
        toggleError(confirmPasswordInput, 'confirmPasswordError', !isValid, 'Passwords do not match');
        return isValid;
    }

    function validateForm() {
        return validateEmail() && validatePassword() && validateConfirmPassword();
    }

    function toggleError(input, errorId, showError, message) {
        const errorElement = document.getElementById(errorId);
        input.classList.toggle('error', showError);
        errorElement.textContent = showError ? message : '';
        errorElement.style.display = showError ? 'block' : 'none';
    }

    function showLoading(show) {
        submitBtn.disabled = show;
        loader.style.display = show ? 'block' : 'none';
    }

    function showSuccess(message) {
        successMessageElement.textContent = message;
        successMessageElement.style.display = 'block';
        apiErrorElement.style.display = 'none';
        form.reset();
    }

    function handleError(error) {
        console.error('Registration error:', error);
        apiErrorElement.textContent = error.message.includes('already exists') 
            ? 'Email already registered' 
            : 'Registration failed. Please try again.';
        apiErrorElement.style.display = 'block';
        successMessageElement.style.display = 'none';
    }

    function clearMessages() {
        apiErrorElement.style.display = 'none';
        successMessageElement.style.display = 'none';
        document.querySelectorAll('.error-message').forEach(el => {
            el.style.display = 'none';
        });
        document.querySelectorAll('.error').forEach(el => {
            el.classList.remove('error');
        });
    }
});