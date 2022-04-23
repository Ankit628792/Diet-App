const express = require('express')
const router = express.Router();
const diet = require("../controller/diet.controller");
const requiresUser = require('../middleware');

router.get('/', requiresUser, diet.find)
router.post('/', requiresUser, diet.create)
router.delete('/', requiresUser, diet.delete)

module.exports = router