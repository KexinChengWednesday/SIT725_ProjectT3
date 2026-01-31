// public/js/login.js

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector('form[action="/login"]');

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = loginForm.username.value.trim();
    const password = loginForm.password.value.trim();

    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.status === 200) {
        // Login successful
        window.location.href = '/homepage'; // Redirect to homepage
      } else if (response.status === 404) {
        // User not found
        alert(data.message);
        window.location.href = '/sign-up'; // Redirect to sign-up
      } else if (response.status === 401) {
        // Invalid credentials
        alert(data.message);
        // Stay on login page
      } else if (response.status === 500) {
        // Server error
        alert(data.message);
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Network error. Please try again.');
    }
  });
});
