const express = require("express");
const router = express.Router();

const {
  registerUser,
  userLogin,
  logout,
  searchHistory,
} = require("../controllers/user");

router.post("/signup", registerUser);
router.post("/login", userLogin);
router.get("/logout", logout);
router.patch("/search", searchHistory);

module.exports = router;
