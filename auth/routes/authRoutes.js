
const express = require('express')
const router = express.Router()
const verifyAuthenticationToken = require('../middleware/verify_auth_token')
const authController = require('../controller/auth_controller')

router.get('/getUserProfile', verifyAuthenticationToken, authController.getUserDetails)

router.get('/getUserProfile/:id', verifyAuthenticationToken, authController.getUserDetails)

router.get('/fcmtoken', verifyAuthenticationToken, authController.getFcmToken)

router.post('/rider/register', authController.registerRider)

router.post('/rider/login', authController.loginRider)

router.post('/driver/register', authController.registerDriver)

router.post('/driver/login', authController.loginDriver)

module.exports = router