const express = require('express')
const router = express.Router();

const {registerUser, userLogin, logout} = require('../controllers/user')

router.post("/signup", registerUser);
router.post("/login", userLogin);
router.get("/logout", logout);

module.exports = router;