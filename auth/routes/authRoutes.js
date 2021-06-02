
const express = require('express')
const router = express.Router()
const verifyAuthenticationToken = require('../middleware/verify_auth_token')
const authController = require('../controller/auth_controller')


router.get('/allusers', verifyAuthenticationToken, authController.getAllusers);

router.post('/register', authController.registerUser);

router.post('/login', authController.loginUser);


module.exports = router;