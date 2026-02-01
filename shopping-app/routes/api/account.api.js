const express = require("express");
const router = express.Router();
const accountController = require("../../controllers/account.controller");

router.post("/update", accountController.updateProfile);
router.post("/delete", accountController.deleteAccount);

module.exports = router;