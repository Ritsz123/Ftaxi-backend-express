const express = require('express')
const router = express.Router();
const verifyAuthenticationToken = require('../middleware/verify_auth_token')
const upsertController = require('../controller/upsert_controller')


router.get('/', (req, res) => res.json({ type: 'upsert routes..' }))

router.put('/rider/name/:email', verifyAuthenticationToken, upsertController.updateRiderName)
router.put('/rider/address/:email', verifyAuthenticationToken, upsertController.addRiderAddress)
router.put('/driver/name/:email', verifyAuthenticationToken, upsertController.updateDriverName)
router.put('/driver/status/:email', verifyAuthenticationToken, upsertController.updateDriverAvailability)
router.put('/driver/vehicle', verifyAuthenticationToken, upsertController.updateDriverVehicleDetails)
router.put('/driver/fcmtoken', verifyAuthenticationToken, upsertController.updateFcmToken)

module.exports = router