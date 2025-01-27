const express = require("express");
const { register, login, me } = require("../controllers/auth-controller");
const authenticate = require("../middlewares/authenticate");
const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authenticate, me);

module.exports = router;
