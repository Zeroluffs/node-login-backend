const express = require("express");
const router = express.Router();
const user = require('../controllers/user.controller')
const verifyToken = require("../middleware/verifyToken");

router.get("/",verifyToken, user.getAllUsers);
router.post("/", user.registerUser);
router.post("/login", user.login);

module.exports = router;