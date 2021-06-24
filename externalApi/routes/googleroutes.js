const express = require('express');
const router = express.Router();
const verifyAuthenticationToken = require('../../auth/middleware/verify_auth_token');
const googleApiController = require('../controller/googleApiController')


router.get('/searchplace', verifyAuthenticationToken, googleApiController.searchPlace)
router.get('/placedetails', verifyAuthenticationToken, googleApiController.placeDetails)

module.exports = router