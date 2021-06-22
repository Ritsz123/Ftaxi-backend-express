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

module.exports = { updateRiderName, updateDriverName, addRiderAddress }