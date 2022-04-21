const express = require('express')
const router = express.Router();
const user = require("../controller/user.controller");
const requiresUser = require('../middleware');

router.get('/', requiresUser, user.find)
router.patch('/', requiresUser, user.update)
router.post('/', user.create)
router.delete('/', requiresUser, user.delete)

module.exports = router