const express = require('express');
const { group, message } = require('../controller/chat.controller');
const chats = require('../data');
const router = express.Router();
const requiresUser = require('../middleware');

router.get('/group/:groupId', requiresUser, message.findAll)
router.post('/', requiresUser, message.create)
router.post('/group', requiresUser, group.create)
router.patch('/group/join', requiresUser, group.update)
router.get('/group', requiresUser, group.findAll)
router.get('/details/:groupId', group.find)

module.exports = router