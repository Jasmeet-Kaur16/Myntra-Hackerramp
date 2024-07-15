const express = require("express");
const router = express.Router();

const { combined } = require("../controllers/trends");

router.get("/", combined);

module.exports = router;
