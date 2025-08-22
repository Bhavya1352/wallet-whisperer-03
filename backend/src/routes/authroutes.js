// backend/src/routes/authRoutes.js
// backend/src/routes/authRoutes.js
const express = require("express");
const { registerUser, loginUser } = require("..src/controllers/authController.js");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

