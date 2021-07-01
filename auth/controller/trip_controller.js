const RiderModel = require('../models/riderModel')
const DriverModel = require('../models/driverModel')
const { invalidParameters } = require('../../errors/errors')
const { success, failure } = require('../../response')


getDriverTrips = async (req, res) => {

    const email = req.userEmail

    if (email == null || queryEmail != dbEmail) {
        return res.status(400).json(failure(invalidParameters))
    }

    const rideHistory = await DriverModel.findOne({ email: email }, { ride_history: 1 })

    return res.json(success(200, rideHistory))
}

getRiderTrips = async (req, res) => {

    const email = req.userEmail

    if (email == null) {
        return res.status(400).json(failure(invalidParameters))
    }

    const rideHistory = await RiderModel.findOne({ email: email }, { ride_history: 1 })

    res.json(rideHistory)
}

module.exports = { getDriverTrips, getRiderTrips }