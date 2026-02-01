window.showCartModal = function () {
  document.getElementById("cartModal")?.classList.remove("hidden");
};

window.hideCartModal = function () {
  document.getElementById("cartModal")?.classList.add("hidden");
};

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("continueShoppingBtn")?.addEventListener("click", () => {
    window.hideCartModal();
  });

  document.getElementById("checkoutNowBtn")?.addEventListener("click", () => {
    window.location.href = "/cart";
  });
});