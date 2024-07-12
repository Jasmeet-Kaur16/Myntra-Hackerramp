const express = require('express')
const router = express.Router();

const {trend} = require('../controllers/trends')

router.get("/", trend);

module.exports = router;