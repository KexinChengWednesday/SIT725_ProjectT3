// public/js/homepage.js

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', async () => {
  const container = document.getElementById('category-container');

  try {
    // Fetch categories from API
    const response = await fetch('/api/resource/product-category');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const data = result.data;

    // Create cards for each category
    data.forEach(category => {
      const cardHTML = `
        <div class="card" data-category-id="${category.category_id}">
          <div class="card-icon">
            <img src="${category.icon}" alt="${category.name}" class="icon-image">
          </div>
          <div class="card-name">${category.name}</div>
          <div class="card-description">${category.description}</div>
        </div>
      `;

      // Append card to container
      container.innerHTML += cardHTML;
    });

  } catch (error) {
    console.error('Error fetching categories:', error);
    container.innerHTML = '<p>Error loading categories. Please try again later.</p>';
  }
});
