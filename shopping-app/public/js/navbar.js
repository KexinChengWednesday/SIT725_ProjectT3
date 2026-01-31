// Fetch cart count on page load
document.addEventListener("DOMContentLoaded", async () => {
  //   try {
  //     const response = await fetch('/api/cart/count');

  //     if (!response.ok) {
  //       // User not logged in or error
  //       return;
  //     }

  //     const data = await response.json();
  //     const cartBadge = document.getElementById('cartBadge');

  //     if (data.count > 0) {
  //       cartBadge.textContent = data.count;
  //       cartBadge.style.display = 'flex';
  //     }
  //   } catch (error) {
  //     console.error('Error fetching cart count:', error);
  //   }

  const cartBadge = document.getElementById("cartBadge");
  cartBadge.textContent = '12';
  cartBadge.style.display = "flex";
});
