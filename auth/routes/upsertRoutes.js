const express = require('express')
const router = express.Router();
const verifyAuthenticationToken = require('../middleware/verify_auth_token')
const upsertController = require('../controller/upsert_controller')


router.get('/', (req, res) => res.json({ type: 'upsert routes..' }))

router.put('/rider/:email', verifyAuthenticationToken, upsertController.upsertRiderData)
router.put('/driver/:email', verifyAuthenticationToken, upsertController.upsertDriverData)

module.exports = router