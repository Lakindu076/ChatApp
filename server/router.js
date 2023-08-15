// Express.js router configuration for defining various routes in a Node.js application

const express = require('express');
const router = new express.Router();
const auth = require('./middlewares/auth')
const AuthController = require('./controllers/auth');
const ChatController = require('./controllers/chat');

router.post('/api/login',AuthController.login)
router.post('/api/refresh',AuthController.refresh)
router.post('/api/logout',auth,AuthController.logout)
router.post('/api/update-avatar',auth,AuthController.updateAvatar)
router.post('/api/update-name',auth,AuthController.updateName)
router.post('/api/all-users',AuthController.getAllUsers)
router.post('/api/send-msg',auth,ChatController.sendMsg)
router.post('/api/get-msgs',auth,ChatController.getMsgs)

module.exports = router