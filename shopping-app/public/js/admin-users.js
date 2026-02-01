const API_BASE_URL = "http://localhost:5000/api/resource";

// DOM Elements
const modal = document.getElementById("addUserModal");
const confirmDeleteModal = document.getElementById("confirmDeleteModal");
const addUserBtn = document.getElementById("addUserBtn");
const deleteUserBtn = document.getElementById("deleteUserBtn");
const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");
const closeModalBtn = document.getElementById("closeModalBtn");
const closeConfirmBtn = document.getElementById("closeConfirmBtn");
const cancelBtn = document.getElementById("cancelBtn");
const confirmCancelBtn = document.getElementById("confirmCancelBtn");
const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
const addUserForm = document.getElementById("addUserForm");
const successMessage = document.getElementById("successMessage");
const deleteSuccessMessage = document.getElementById("deleteSuccessMessage");
const deleteErrorMessage = document.getElementById("deleteErrorMessage");
const roleFilter = document.getElementById("roleFilter");
const resetFilterBtn = document.getElementById("resetFilterBtn");
const selectAllCheckbox = document.getElementById("selectAllCheckbox");
const checkboxHeader = document.getElementById("checkboxHeader");
const selectedCount = document.getElementById("selectedCount");
const countNumber = document.getElementById("countNumber");

// Store all users globally
let allUsers = [];
let isDeleteMode = false;
let selectedEmails = [];
let currentUserEmail = ""; // Will be fetched from API

// ============================================
// Fetch Current User Email from Session
// ============================================
async function fetchCurrentUserEmail() {
  try {
    const response = await fetch("http://localhost:5000/api/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (response.ok && result.user && result.user.email) {
      currentUserEmail = result.user.email;
      console.log("✅ Current User Email:", currentUserEmail);
    } else {
      console.warn("⚠️ Could not fetch current user email");
      currentUserEmail = "";
    }
  } catch (err) {
    console.error("❌ Error fetching session:", err);
    currentUserEmail = "";
  }
}

// ============================================
// Fetch and Display Users
// ============================================
async function fetchUsers(role = "all") {
  try {
    const response = await fetch(`${API_BASE_URL}/users?role=${role}`);
    const result = await response.json();

    if (result.statusCode === 200) {
      allUsers = result.data;
      displayUsers(allUsers);
    } else {
      showEmptyState();
    }
  } catch (err) {
    console.error("Error fetching users:", err);
    showEmptyState();
  }
}

// Display users in table
function displayUsers(users) {
  const tableContainer = document.getElementById("tableContainer");
  const emptyState = document.getElementById("emptyState");
  const loadingState = document.getElementById("loadingState");
  const usersTableBody = document.getElementById("usersTableBody");

  if (!users || users.length === 0) {
    showEmptyState();
    return;
  }

  usersTableBody.innerHTML = users
    .map(
      (user) => `
    <tr class="user-row" data-email="${user.email}">
      ${
        isDeleteMode
          ? `<td class="checkbox-col"><input type="checkbox" class="user-checkbox" value="${user.email}" ${
              user.email === currentUserEmail ? "disabled" : ""
            } title="${user.email === currentUserEmail ? "Cannot delete your own account" : ""}"></td>`
          : ""
      }
      <td>${user.name || "-"}</td>
      <td>${user.email || "-"}</td>
      <td>${user.phone || "-"}</td>
      <td>${formatDate(user.dob) || "-"}</td>
      <td>${user.address?.addressLine || "-"}</td>
      <td>${user.address?.city || "-"}</td>
      <td>${user.address?.state || "-"}</td>
      <td>${user.address?.postcode || "-"}</td>
      <td>${user.address?.country || "-"}</td>
      <td><strong>${user.role || "-"}</strong></td>
    </tr>
  `,
    )
    .join("");

  // Add event listeners to checkboxes if in delete mode
  if (isDeleteMode) {
    document.querySelectorAll(".user-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", updateSelectedCount);
    });
  }

  loadingState.style.display = "none";
  emptyState.style.display = "none";
  tableContainer.style.display = "block";
}

// Show empty state
function showEmptyState() {
  document.getElementById("loadingState").style.display = "none";
  document.getElementById("tableContainer").style.display = "none";
  document.getElementById("emptyState").style.display = "block";
}

// Format date
function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ============================================
// Delete Mode Functions
// ============================================
function enterDeleteMode() {
  isDeleteMode = true;
  addUserBtn.style.display = "none";
  deleteUserBtn.style.display = "inline-block";
  cancelDeleteBtn.style.display = "inline-block";
  checkboxHeader.style.display = "table-cell";
  selectAllCheckbox.style.display = "inline-block";
  selectedCount.style.display = "inline-block";
  selectedEmails = [];
  countNumber.textContent = "0";
  displayUsers(allUsers);
}

function exitDeleteMode() {
  isDeleteMode = false;
  addUserBtn.style.display = "inline-block";
  deleteUserBtn.style.display = "inline-block";
  cancelDeleteBtn.style.display = "none";
  checkboxHeader.style.display = "none";
  selectAllCheckbox.style.display = "none";
  selectAllCheckbox.checked = false;
  selectedCount.style.display = "none";
  selectedEmails = [];
  countNumber.textContent = "0";
  displayUsers(allUsers);
}

function updateSelectedCount() {
  const checkboxes = document.querySelectorAll(".user-checkbox:checked");
  selectedEmails = Array.from(checkboxes).map((cb) => cb.value);
  countNumber.textContent = selectedEmails.length;
}

function toggleSelectAll() {
  const checkboxes = document.querySelectorAll(".user-checkbox:not(:disabled)");
  const isChecked = selectAllCheckbox.checked;

  checkboxes.forEach((checkbox) => {
    checkbox.checked = isChecked;
  });

  updateSelectedCount();
}

// ============================================
// Delete Users
// ============================================
async function deleteSelectedUsers() {
  if (!isDeleteMode) {
    enterDeleteMode();
    return;
  }

  // Check if users are selected
  if (selectedEmails.length === 0) {
    alert("Please select at least one user to delete");
    return;
  }

  // Check if current user email is in selected emails
  if (selectedEmails.includes(currentUserEmail)) {
    alert(
      `⚠️ You cannot delete your own account (${currentUserEmail}).\n\nPlease uncheck this email and try again.`
    );
    return;
  }

  // Show confirmation modal
  document.getElementById("deleteCount").textContent = selectedEmails.length;
  confirmDeleteModal.classList.add("show");
}

async function confirmDelete() {
  confirmDeleteModal.classList.remove("show");
  const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
  confirmDeleteBtn.disabled = true;
  confirmDeleteBtn.textContent = "Deleting...";

  let successCount = 0;
  let failureCount = 0;
  const failedEmails = [];

  try {
    // Delete users one by one
    for (const email of selectedEmails) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/admin/user?email=${encodeURIComponent(email)}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          successCount++;
        } else {
          failureCount++;
          failedEmails.push(email);
        }
      } catch (err) {
        failureCount++;
        failedEmails.push(email);
      }
    }

    // Show result message
    if (failureCount === 0) {
      showDeleteSuccessMessage(
        `Successfully deleted ${successCount} user(s)!`
      );
    } else if (successCount > 0) {
      showDeleteErrorMessage(
        `Deleted ${successCount} user(s), but failed to delete ${failureCount} user(s): ${failedEmails.join(", ")}`
      );
    } else {
      showDeleteErrorMessage(
        `Failed to delete all selected users: ${failedEmails.join(", ")}`
      );
    }

    // Refresh user list and exit delete mode
    exitDeleteMode();
    fetchUsers(roleFilter.value);
  } finally {
    confirmDeleteBtn.disabled = false;
    confirmDeleteBtn.textContent = "Delete";
  }
}

function showDeleteSuccessMessage(message) {
  deleteSuccessMessage.textContent = message;
  deleteSuccessMessage.classList.add("show");
  setTimeout(() => {
    deleteSuccessMessage.classList.remove("show");
  }, 4000);
}

function showDeleteErrorMessage(message) {
  deleteErrorMessage.textContent = message;
  deleteErrorMessage.classList.add("show");
  setTimeout(() => {
    deleteErrorMessage.classList.remove("show");
  }, 4000);
}

// ============================================
// Filter Functions
// ============================================
function filterUsersByRole(role) {
  if (role === "all") {
    displayUsers(allUsers);
  } else {
    const filteredUsers = allUsers.filter((user) => user.role === role);
    displayUsers(filteredUsers);
  }
}

function resetFilter() {
  roleFilter.value = "all";
  displayUsers(allUsers);
}

// ============================================
// Modal Functions
// ============================================
function openModal() {
  modal.classList.add("show");
}

function closeModal() {
  modal.classList.remove("show");
  addUserForm.reset();
  clearErrors();
}

function closeConfirmDeleteModal() {
  confirmDeleteModal.classList.remove("show");
}

// ============================================
// Form Validation
// ============================================
function clearErrors() {
  document.querySelectorAll(".error-message").forEach((el) => {
    el.textContent = "";
  });
}

function showError(fieldName, message) {
  const errorEl = document.getElementById(`${fieldName}Error`);
  if (errorEl) {
    errorEl.textContent = message;
  }
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function validateForm() {
  clearErrors();
  let isValid = true;

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const dob = document.getElementById("dob").value;
  const addressLine = document.getElementById("addressLine").value.trim();
  const city = document.getElementById("city").value.trim();
  const state = document.getElementById("state").value.trim();
  const postcode = document.getElementById("postcode").value.trim();
  const country = document.getElementById("country").value.trim();
  const role = document.getElementById("role").value;
  const password = document.getElementById("password").value;

  if (!name) {
    showError("name", "Name is required");
    isValid = false;
  }

  if (!email) {
    showError("email", "Email is required");
    isValid = false;
  } else if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email");
    isValid = false;
  }

  if (!dob) {
    showError("dob", "Date of Birth is required");
    isValid = false;
  }

  if (!addressLine) {
    showError("addressLine", "Address Line is required");
    isValid = false;
  }

  if (!city) {
    showError("city", "City is required");
    isValid = false;
  }

  if (!state) {
    showError("state", "State is required");
    isValid = false;
  }

  if (!postcode) {
    showError("postcode", "Postcode is required");
    isValid = false;
  }

  if (!country) {
    showError("country", "Country is required");
    isValid = false;
  }

  if (!role) {
    showError("role", "Role is required");
    isValid = false;
  }

  if (!password) {
    showError("password", "Password is required");
    isValid = false;
  } else if (password.length < 6) {
    showError("password", "Password must be at least 6 characters");
    isValid = false;
  }

  return isValid;
}

// ============================================
// Form Submission
// ============================================
async function submitForm(e) {
  e.preventDefault();

  if (!validateForm()) {
    return;
  }

  const submitBtn = document.getElementById("submitBtn");
  submitBtn.disabled = true;
  submitBtn.textContent = "Creating...";

  const formData = {
    name: document.getElementById("name").value.trim(),
    email: document.getElementById("email").value.trim(),
    phone: document.getElementById("phone").value.trim() || null,
    dob: document.getElementById("dob").value,
    addressLine: document.getElementById("addressLine").value.trim(),
    city: document.getElementById("city").value.trim(),
    state: document.getElementById("state").value.trim(),
    postcode: document.getElementById("postcode").value.trim(),
    country: document.getElementById("country").value.trim(),
    role: document.getElementById("role").value,
    password: document.getElementById("password").value,
  };

  console.log(formData);
  try {
    const response = await fetch(`http://localhost:5000/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      closeModal();
      showSuccessMessage();
      fetchUsers(roleFilter.value);
    } else {
      showError("email", result.message || "Error creating user");
    }
  } catch (err) {
    console.error("Error creating user:", err);
    showError("email", "Error creating user. Please try again.");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Create User";
  }
}

// Show success message
function showSuccessMessage() {
  successMessage.classList.add("show");
  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 3000);
}

// ============================================
// Event Listeners
// ============================================
addUserBtn.addEventListener("click", () => {
  if (isDeleteMode) {
    exitDeleteMode();
  }
  openModal();
});

closeModalBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);
addUserForm.addEventListener("submit", submitForm);

// Delete mode event listeners
deleteUserBtn.addEventListener("click", deleteSelectedUsers);
cancelDeleteBtn.addEventListener("click", exitDeleteMode);
selectAllCheckbox.addEventListener("change", toggleSelectAll);

// Delete confirmation event listeners
confirmDeleteBtn.addEventListener("click", confirmDelete);
closeConfirmBtn.addEventListener("click", closeConfirmDeleteModal);
confirmCancelBtn.addEventListener("click", closeConfirmDeleteModal);

// Filter event listener
roleFilter.addEventListener("change", (e) => {
  filterUsersByRole(e.target.value);
});

// Reset filter event listener
resetFilterBtn.addEventListener("click", resetFilter);

// Close modal when clicking outside
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

confirmDeleteModal.addEventListener("click", (e) => {
  if (e.target === confirmDeleteModal) {
    closeConfirmDeleteModal();
  }
});

// ============================================
// Initialize on Page Load
// ============================================
document.addEventListener("DOMContentLoaded", async () => {
  // First, fetch current user email from session
  await fetchCurrentUserEmail();
  // Then fetch all users
  fetchUsers("all");
});