const express = require('express');
const session = require('../controller/session.controller');
const router = express.Router();

router.post('/', session.create)

module.exports = router