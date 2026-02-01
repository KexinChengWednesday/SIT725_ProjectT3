let allProducts = []; // Cache all products

document.addEventListener("DOMContentLoaded", function () {
  // ===== USER PROFILE DROPDOWN =====
  const userProfile = document.getElementById("userProfile");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const logoutBtn = document.getElementById("logoutBtn");

  // Toggle dropdown when clicking on profile
  if (userProfile) {
    userProfile.addEventListener("click", function (e) {
      e.stopPropagation();
      dropdownMenu.classList.toggle("active");
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener("click", function (e) {
    if (dropdownMenu && !e.target.closest(".user-profile-wrapper")) {
      dropdownMenu.classList.remove("active");
    }
  });

  // Handle logout
  if (logoutBtn) {
    logoutBtn.addEventListener("click", async function (e) {
      e.preventDefault();

      try {
        const response = await fetch("/api/auth/logout", {
          method: "GET",
        });

        const data = await response.json();

        if (response.ok) {
          console.log(data.message);
          window.location.href = "/"; // Redirect to homepage
        } else {
          console.error(data.message);
          alert("Error logging out");
        }
      } catch (err) {
        console.error("Logout error:", err);
        alert("Error logging out");
      }
    });
  }

  // ===== CART BADGE =====
  checkSessionAndRefreshCart();

  // ===== SEARCH BAR =====
  initializeSearch();
});

// Check if user is logged in
async function checkSessionAndRefreshCart() {
  const cartBadge = document.getElementById("cartBadge");
  if (!cartBadge) return;

  try {
    const sessionRes = await fetch("/api/session", {
      method: "GET",
      cache: "no-store",
    });

    const sessionData = await sessionRes.json();

    if (!sessionRes.ok || !sessionData.isLoggedIn) {
      console.log("User not logged in");
      cartBadge.style.display = "none";
      return;
    }

    console.log("User logged in, fetching cart...");
    await refreshCartBadge();
  } catch (err) {
    console.error("Session check error:", err);
    cartBadge.style.display = "none";
  }
}

// Refresh cart badge function
async function refreshCartBadge() {
  const cartBadge = document.getElementById("cartBadge");
  if (!cartBadge) return;

  try {
    const res = await fetch("/api/cart", {
      method: "GET",
      cache: "no-store",
    });

    if (res.status === 401) {
      console.log("User not authenticated");
      cartBadge.style.display = "none";
      return;
    }

    if (!res.ok) {
      cartBadge.style.display = "none";
      return;
    }

    const cart = await res.json();
    const items = Array.isArray(cart.items) ? cart.items : [];

    const count = items.reduce((sum, it) => sum + Number(it.quantity || 0), 0);

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
  const homeBtn = e.target.closest(".btn-add-cart");
  const productBtn = e.target.closest(".btn");

  const isProductAddBtn =
    productBtn &&
    productBtn.type === "button" &&
    productBtn.textContent.trim().toLowerCase() === "add to cart";

  if (!homeBtn && !isProductAddBtn) return;

  setTimeout(refreshCartBadge, 300);
});

// ===== SEARCH FUNCTIONALITY =====

// Initialize search
async function initializeSearch() {
  const searchBar = document.getElementById("searchBar");
  if (!searchBar) return;

  // Fetch all products on page load
  await fetchAllProducts();

  // Add event listener for typing
  searchBar.addEventListener("input", handleSearchInput);

  // Close search results when clicking outside
  document.addEventListener("click", (e) => {
    const searchContainer = document.querySelector(".search-container");
    if (searchContainer && !searchContainer.contains(e.target)) {
      hideSearchResults();
    }
  });
}

// Fetch all products from API
async function fetchAllProducts() {
  try {
    const res = await fetch("/api/product", {
      method: "GET",
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Failed to fetch products");
      return;
    }

    const data = await res.json();
    allProducts = Array.isArray(data) ? data : data.products || [];
    console.log(`Loaded ${allProducts.length} products`);
  } catch (err) {
    console.error("Error fetching products:", err);
  }
}

// Handle search input
function handleSearchInput(e) {
  const query = e.target.value.trim().toLowerCase();

  if (query.length === 0) {
    hideSearchResults();
    return;
  }

  // Filter products matching query
  const results = filterProducts(query);

  // Display results
  displaySearchResults(results, query);
}

// Filter products by query
function filterProducts(query) {
  return allProducts.filter((product) => {
    const name = (product.name || "").toLowerCase();
    const categoryId = (product.categoryId || "").toLowerCase();
    const fullDesc = (product.fullDescription || "").toLowerCase();
    const shortDesc = (product.shortDescription || "").toLowerCase();

    return (
      name.includes(query) ||
      categoryId.includes(query) ||
      fullDesc.includes(query) ||
      shortDesc.includes(query)
    );
  });
}

// Display search results
function displaySearchResults(results, query) {
  const searchResults = document.getElementById("searchResults");
  if (!searchResults) return;

  // Limit to 8 results
  const limited = results.slice(0, 100);

  if (limited.length === 0) {
    searchResults.innerHTML = `
      <div class="search-result-item no-results">
        No products found for "${query}"
      </div>
    `;
    searchResults.style.display = "block";
    return;
  }

  searchResults.innerHTML = limited
    .map(
      (product) => `
    <a href="/product/${product.product_id}" class="search-result-item">
      <div class="result-image">
        <img src="${product.image || '/images/placeholder.png'}" alt="${product.name}" />
      </div>
      <div class="result-info">
        <div class="result-name">${highlightMatch(product.name, query)}</div>
        <div class="result-category">${capitalizeFirstLetter(product.categoryId || "N/A")}</div>
        <div class="result-price">$${(product.price.$numberDecimal ? parseFloat(product.price.$numberDecimal.toString()) : 0).toFixed(2)}</div>
      </div>
    </a>
  `
    )
    .join("");

  searchResults.style.display = "block";
}

// Capitalize first letter
function capitalizeFirstLetter(str) {
  if (!str) return "N/A";
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

// Highlight matching text
function highlightMatch(text, query) {
  const regex = new RegExp(`(${query})`, "gi");
  return text.replace(regex, "<strong>$1</strong>");
}

// Hide search results
function hideSearchResults() {
  const searchResults = document.getElementById("searchResults");
  if (searchResults) {
    searchResults.style.display = "none";
    searchResults.innerHTML = "";
  }
}
