const mongoose = require('mongoose')
const addressModel = require('./addressModel')

const tripSchema = mongoose.Schema({
    riderId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    driverId: {
        type: mongoose.Schema.Types.ObjectId,
    },
    sourceAddress: {
        type: addressModel,
        required: true
    },
    destinationAddress: {
        type: addressModel,
        required: true
    }
})

const tripModel = mongoose.model('trips', tripSchema)

module.exports = tripModel