// Sample user data (in-memory storage)
let users = [
    { username: 'admin', password: 'admin123', role: 'admin' },
    { username: 'student1', password: 'student123', role: 'student' },
    { username: 'student2', password: 'student456', role: 'student' }
];

document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const signupForm = document.getElementById('signupForm');
    const logoutButton = document.getElementById('logoutButton');

    // Handle login form submission
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from reloading the page
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Validate user credentials
            const user = users.find(u => u.username === username && u.password === password);

            if (user) {
                // Successful login
                localStorage.setItem('username', username);
                localStorage.setItem('role', user.role);

                // Redirect to the appropriate dashboard based on the role
                if (user.role === 'admin') {
                    window.location.href = 'admin_dashboard.html';
                } else {
                    window.location.href = 'student_dashboard.html';
                }
            } else {
                // Show error message if login fails
                document.getElementById('error-message').textContent = 'Invalid username or password.';
            }
        });
    }

    // Handle signup form submission
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent form from reloading the page

            const username = document.getElementById('signupUsername').value;
            const password = document.getElementById('signupPassword').value;
            const role = 'student'; // Always 'student'
            const errorMessage = document.getElementById('signup-error-message');

            // Check if user already exists
            const userExists = users.some(u => u.username === username);

            if (!userExists) {
                // Add the new user
                users.push({ username, password, role });
                
                // Automatically log the user in after signup
                localStorage.setItem('username', username);
                localStorage.setItem('role', role);

                // Redirect to the student dashboard
                window.location.href = 'student_dashboard.html';
            } else {
                // Show error message if user already exists
                errorMessage.textContent = 'Username already exists. Please choose a different one.';
            }
        });
    }

    // Handle logout button click
    if (logoutButton) {
        logoutButton.addEventListener('click', function(event) {
            event.preventDefault(); // Prevent default link behavior

            // Clear the user's session from localStorage
            localStorage.removeItem('username');
            localStorage.removeItem('role');

            // Redirect to login page
            window.location.href = 'index.html';
        });
    }
});
