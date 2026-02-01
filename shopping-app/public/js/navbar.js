document.addEventListener('DOMContentLoaded', function() {
  // ===== USER PROFILE DROPDOWN =====
  const userProfile = document.getElementById('userProfile');
  const dropdownMenu = document.getElementById('dropdownMenu');
  const logoutBtn = document.getElementById('logoutBtn');

  // Toggle dropdown when clicking on profile
  if (userProfile) {
    userProfile.addEventListener('click', function(e) {
      e.stopPropagation();
      dropdownMenu.classList.toggle('active');
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', function(e) {
    if (dropdownMenu && !e.target.closest('.user-profile-wrapper')) {
      dropdownMenu.classList.remove('active');
    }
  });

  // Handle logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async function(e) {
      e.preventDefault();
      
      try {
        const response = await fetch('/api/auth/logout', {
          method: 'GET',
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.message);
          window.location.href = '/'; // Redirect to homepage
        } else {
          console.error(data.message);
          alert('Error logging out');
        }
      } catch (err) {
        console.error('Logout error:', err);
        alert('Error logging out');
      }
    });
  }

  // ===== CART BADGE =====
  refreshCartBadge();
});

// Refresh cart badge function
async function refreshCartBadge() {
  const cartBadge = document.getElementById("cartBadge");
  if (!cartBadge) return;

  try {
    const res = await fetch("/api/cart", { cache: "no-store" });
    if (!res.ok) {
      cartBadge.style.display = "none";
      return;
    }

    const cart = await res.json();
    const items = Array.isArray(cart.items) ? cart.items : [];

    const count = items.reduce(
      (sum, it) => sum + Number(it.quantity || 0),
      0
    );

    if (count > 0) {
      cartBadge.textContent = String(count);
      cartBadge.style.display = "flex";
    } else {
      cartBadge.style.display = "none";
    }
  } catch (err) {
    console.error("Failed to refresh cart badge:", err);
    cartBadge.style.display = "none";
  }
}

// Listen for add to cart button clicks
document.addEventListener("click", (e) => {
  // ① homepage button
  const homeBtn = e.target.closest(".btn-add-cart");

  // ② product page button
  const productBtn = e.target.closest(".btn");

  const isProductAddBtn =
    productBtn &&
    productBtn.type === "button" &&
    productBtn.textContent.trim().toLowerCase() === "add to cart";

  if (!homeBtn && !isProductAddBtn) return;

  setTimeout(refreshCartBadge, 300);
});
