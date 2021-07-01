const express = require('express')
const router = express.Router()
const verifyAuthenticationToken = require('../middleware/verify_auth_token')
const tripController = require('../controller/trip_controller')


router.get('/driver', verifyAuthenticationToken, tripController.getDriverTrips)

router.get('/rider', verifyAuthenticationToken, tripController.getRiderTrips)

router.put('/addTrip', verifyAuthenticationToken, tripController.addTripDetails)

module.exports = router