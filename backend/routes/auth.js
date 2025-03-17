const { register, login } = require("../controllers/user");

const router = require("express").Router();

router.post("/register", register).post("/login", login);

module.exports = router;
