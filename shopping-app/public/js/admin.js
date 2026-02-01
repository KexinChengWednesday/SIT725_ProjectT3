document.addEventListener('DOMContentLoaded', function() {
  const logoutBtn = document.getElementById('logoutBtn');
  const logoutModal = document.getElementById('logoutModal');
  const cancelBtn = document.getElementById('cancelBtn');
  const confirmLogoutBtn = document.getElementById('confirmLogoutBtn');

  // Open logout confirmation modal
  logoutBtn.addEventListener('click', function() {
    logoutModal.classList.remove('hidden');
  });

  // Close modal when cancel is clicked
  cancelBtn.addEventListener('click', function() {
    logoutModal.classList.add('hidden');
  });

  // Close modal when clicking outside
  logoutModal.addEventListener('click', function(e) {
    if (e.target === logoutModal) {
      logoutModal.classList.add('hidden');
    }
  });

  // Handle logout confirmation
  confirmLogoutBtn.addEventListener('click', async function() {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'GET',
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data.message);
        // Redirect to homepage
        window.location.href = '/';
      } else {
        console.error(data.message);
        alert('Error logging out');
        logoutModal.classList.add('hidden');
      }
    } catch (err) {
      console.error('Logout error:', err);
      alert('Error logging out');
      logoutModal.classList.add('hidden');
    }
  });
});
