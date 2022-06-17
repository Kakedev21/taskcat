const express = require("express");
const router = express.Router();
const { register, login, getUser } = require("../controllers/userController");
const protect = require("../middleware/authMiddleWare");

router.post("/register", register);
router.post("/login", login);
router.get("/getme", protect, getUser);

module.exports = router;
