const { invalidToken } = require('../../errors/errors')
const { failure, success } = require('../../response')
const RiderModel = require('../models/riderModel')
const DriverModel = require('../models/driverModel')


updateRiderName = async (req, res) => {
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

addRiderAddress = async (req, res) => {
    const rider = await RiderModel.findOne({ email: req.userEmail })
    if (rider == null) {
        return res.json(failure(invalidToken))
    }

    const address = {
        placeName: req.body.placeName,
        placeId: req.body.placeId,
        latlng: {
            lat: req.body.latlng.lat,
            lng: req.body.latlng.lng,
        },
        formattedPlaceAddress: req.body.formattedPlaceAddress
    }

    const update = await RiderModel.updateOne(
        { email: req.userEmail },
        { $push: { saved_addresses: address } }
    )

    console.log('Added address to saved addresses', update)

    return res.status(201).json(success('Update Success'))
}

updateDriverName = async (req, res) => {
    const resp = await DriverModel.findOne({ email: req.userEmail })
    if (resp == null) {
        return res.json(failure(invalidToken))
    }

    if (req.body.name != null) {
        const done = await DriverModel.updateOne(
            { email: req.userEmail },
            { name: req.body.name }
        )

        console.log('update success', done);

        return res.status(200).json(success('update Success'))
    }

    return res.json(failure('Invalid request data'))
}

updateDriverAvailability = async (req, res) => {
    const driver = await DriverModel.findOne({ email: req.userEmail })
    if (driver == null) {
        return res.json(failure(invalidToken))
    }

    const status = req.body.available
    if (status != null) {
        const update = await DriverModel.updateOne(
            { email: req.userEmail },
            { available: req.body.available }
        )

        console.log('update driver status success', update)

        return res.json(success('success'))
    }

    return res.json(failure('Invalid request data'))
}

updateDriverVehicleDetails = async (req, res) => {
    var driver = await DriverModel.findOne({ email: req.userEmail })
    if (driver == null) {
        return res.json(failure(invalidToken))
    }

    const vehicle = {
        "reg_number": req.body.reg_number,
        "model": req.body.model,
        "color": req.body.color
    }

    console.log(vehicle)

    const update = await DriverModel.updateOne(
        { email: req.userEmail },
        { vehicle_details: vehicle }
    )

    console.log('update vehicle success', update)

    driver = await DriverModel.findOne({ email: req.userEmail }, { password: 0 })
    res.status(201).json(success('ok', driver))
}

module.exports = { updateRiderName, updateDriverName, addRiderAddress, updateDriverAvailability, updateDriverVehicleDetails }