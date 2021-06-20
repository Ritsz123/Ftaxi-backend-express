const RiderModel = require('../models/riderModel')
const { invalidToken } = require('../../errors/errors')
const { failure } = require('../../response')


upsertRiderData = async (req, res) => {
    const resp = await RiderModel.findOne({ email: req.userEmail })
    if (resp == null) {
        return res.json(failure(invalidToken))
    }
    return res.json(resp)
}

module.exports = { upsertRiderData }