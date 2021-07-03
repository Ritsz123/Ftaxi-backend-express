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

// * only called by driver
addTripDetails = async (req, res) => {

    const user = DriverModel.findOne({ email: req.userEmail })

    if (user == null) {
        return res.status(401).json(failure('Unauthorised'))
    }

    const riderId = req.body.riderId
    const driverId = req.body.driverId
    const source_address = req.body.source_address
    const destination_address = req.body.destination_address

    const updated = await RiderModel.updateOne(
        { _id: riderId },
        {
            $push: {
                ride_history: {
                    driver: driverId,
                    source_address: source_address,
                    destination_address: destination_address
                }
            }
        }
    )

    console.log('pushed data to rider ', updated)

    const updatedDriver = await DriverModel.updateOne(
        { _id: driverId },
        {
            $push: {
                ride_history: {
                    rider: riderId,
                    source_address: source_address,
                    destination_address: destination_address
                }
            }
        }
    )

    console.log('pushed data to driver', updatedDriver)

    res.json(success('ok'))

}

module.exports = { getDriverTrips, getRiderTrips, addTripDetails }