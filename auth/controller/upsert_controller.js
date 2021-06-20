const { invalidToken } = require('../../errors/errors')
const { failure, success } = require('../../response')
const RiderModel = require('../models/riderModel')
const DriverModel = require('../models/driverModel')


upsertRiderData = async (req, res) => {
    const resp = await RiderModel.findOne({ email: req.userEmail })
    if (resp == null) {
        return res.json(failure(invalidToken))
    }

    const body = {
        name: req.body.name,
    };

    const done = await RiderModel.updateOne(
        { email: req.userEmail },
        body
    )

    console.log('update success', done)

    return res.status(200).json(success('update success'))
}

upsertDriverData = async (req, res) => {
    const resp = DriverModel.findOne({ email: req.userEmail })
    if (resp == null) {
        return res.json(failure(invalidToken))
    }

    const body = {
        name: req.body.name,
    };

    const done = await DriverModel.updateOne(
        { email: req.userEmail },
        body
    )

    console.log('update success', done);

    res.status(200).json(success('update Success'))
}

module.exports = { upsertRiderData, upsertDriverData }