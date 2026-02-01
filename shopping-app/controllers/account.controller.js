// shopping-app/controllers/account.controller.js

function renderProfilePage(req, res) {
  return res.render("account", {
    title: "My Account",
    activePage: "profile",
    user: req.session?.user || null  ,
    bannerError: null,
    fieldErrors: null,
    form: null,
    successMsg: null,
  });
}

function renderAddressPage(req, res) {
  return res.render("account-address", {
    title: "Address Book",
    activePage: "address",
    user: req.session?.user || null
  });
}

function renderPaymentPage(req, res) {
  return res.render("account-payment", {
    title: "My Payment Options",
    activePage: "payment",
    user: req.session?.user || null
  });
}

function isValidEmail(email) {
  // simple robust email check
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email || "").trim());
}

function updateProfile(req, res) {
  const { firstName, lastName, email, address, currentPassword, newPassword, confirmNewPassword } = req.body;

  const fieldErrors = {};
  const trimmedFirstName = String(firstName || "").trim();
  const trimmedLastName = String(lastName || "").trim();
  const trimmedEmail = String(email || "").trim();
  const trimmedAddress = String(address || "").trim();

  // ===== Required fields =====
  if (!trimmedFirstName) fieldErrors.firstName = "First name is required.";
  if (!trimmedLastName) fieldErrors.lastName = "Last name is required.";

  if (!trimmedEmail) fieldErrors.email = "Email is required.";
  else if (!isValidEmail(trimmedEmail)) fieldErrors.email = "Please enter a valid email address.";

  if (!trimmedAddress) fieldErrors.address = "Address is required.";
  else if (trimmedAddress.length < 5) fieldErrors.address = "Address must be at least 5 characters.";

  // ===== Password validation (only if user tries to change) =====
  const wantsPasswordChange = (currentPassword || newPassword || confirmNewPassword);

  if (wantsPasswordChange) {
    if (!currentPassword) fieldErrors.currentPassword = "Current password is required.";
    if (!newPassword) fieldErrors.newPassword = "New password is required.";
    if (!confirmNewPassword) fieldErrors.confirmNewPassword = "Please confirm your new password.";

    if (newPassword && String(newPassword).length < 6) {
      fieldErrors.newPassword = "New password must be at least 6 characters.";
    }

    if (newPassword && confirmNewPassword && newPassword !== confirmNewPassword) {
      fieldErrors.confirmNewPassword = "Passwords do not match.";
    }

    // MOCK current password check (demo)
    // Later you will validate against DB hashed password.
    if (currentPassword && currentPassword !== "123") {
      fieldErrors.currentPassword = "Your password is incorrect.";
    }
  }

  // ===== If any error -> re-render with banner like screenshot =====
  if (Object.keys(fieldErrors).length > 0) {
    const bannerError = "Please check the highlighted fields and try again.";

    return res.render("account", {
      title: "My Account",
      activePage: "profile",
      user: getMockUser(),
      bannerError,
      fieldErrors,
      form: {
        firstName: trimmedFirstName,
        lastName: trimmedLastName,
        email: trimmedEmail,
        address: trimmedAddress,
      },
      successMsg: null,
    });
  }

  // ===== Success (demo only) =====
  return res.render("account", {
    title: "My Account",
    activePage: "profile",
    user: {
      firstName: trimmedFirstName,
      lastName: trimmedLastName,
      email: trimmedEmail,
      address: trimmedAddress,
    },
    bannerError: null,
    fieldErrors: null,
    form: null,
    successMsg: "Profile updated successfully.",
  });
}

function deleteAccount(req, res) {
  // Demo only. Later: update DB user status = "deleted"
  return res.render("account", {
    title: "My Account",
    activePage: "profile",
    user: getMockUser(),
    bannerError: null,
    fieldErrors: null,
    form: null,
    successMsg: "Account deleted (mock).",
  });
}

module.exports = {
  renderProfilePage,
  updateProfile,
  renderAddressPage,
  renderPaymentPage,
  deleteAccount,
};
