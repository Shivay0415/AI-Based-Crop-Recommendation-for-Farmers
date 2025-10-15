document.addEventListener('DOMContentLoaded', () => {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    const recommendationTab = document.getElementById('recommendation-tab');
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const recommendationForm = document.getElementById('recommendation-form');
    const recommendationResults = document.getElementById('recommendation-results');
    const cropList = document.getElementById('crop-list');
    const formLinks = document.querySelectorAll('.form-link a');

    let isLoggedIn = false; // Simulate login state
    let users = JSON.parse(localStorage.getItem('cropAdvisorUsers')) || [];

    // Function to switch tabs
    function switchTab(targetId) {
        tabButtons.forEach(button => {
            if (button.dataset.tab === targetId) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        tabContents.forEach(content => {
            if (content.id === targetId) {
                content.classList.add('active');
            } else {
                content.classList.remove('active');
            }
        });
    }

    // Handle tab button clicks
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchTab(button.dataset.tab);
        });
    });

    // Handle form links (e.g., "Register here" from login form)
    formLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = link.dataset.tabSwitch;
            if (targetTab) {
                switchTab(targetTab);
            }
        });
    });


    // User Login
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const identifier = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;

        const user = users.find(u => (u.email === identifier || u.username === identifier) && u.password === password);

        if (user) {
            console.log('Login successful for:', user.username);
            isLoggedIn = true;
            recommendationTab.classList.remove('hidden');
            switchTab('recommendation');
            alert('Login Successful! You can now get crop recommendations.');
            loginForm.reset();
        } else {
            console.log('Login failed.');
            alert('Invalid email/username or password.');
            isLoggedIn = false;
        }
    });

    // User Registration
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('register-username').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm-password').value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (users.some(u => u.username === username)) {
            alert('Username already exists. Please choose another one.');
            return;
        }

        if (users.some(u => u.email === email)) {
            alert('An account with this email already exists.');
            return;
        }

        const newUser = { username, email, password };
        users.push(newUser);
        localStorage.setItem('cropAdvisorUsers', JSON.stringify(users));

        console.log('Registration successful for:', username);
        alert('Account Created Successfully! Please login.');
        switchTab('login');
        registerForm.reset();
    });

    // Simulate getting recommendations (replace with actual AJAX call to backend)
    recommendationForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('Please login to get recommendations.');
            switchTab('login');
            return;
        }

        console.log('Getting recommendations...');
        // In a real app, collect form data and send to your AI backend
        const formData = new FormData(recommendationForm);
        const data = Object.fromEntries(formData.entries());

        // Simulate AI response
        const simulatedRecommendations = [
            { crop: 'Rice', suitability: 'High' },
            { crop: 'Wheat', suitability: 'Medium' },
            { crop: 'Maize', suitability: 'High' },
            { crop: 'Pulses', suitability: 'Low' }
        ];

        // Display results
        cropList.innerHTML = ''; // Clear previous results
        simulatedRecommendations.forEach(rec => {
            const li = document.createElement('li');
            li.textContent = `${rec.crop} (Suitability: ${rec.suitability})`;
            cropList.appendChild(li);
        });

        recommendationResults.classList.remove('hidden');
        // recommendationForm.reset(); // Optional: clear form after submission
    });

    // Initial state: show login form
    switchTab('login');
});