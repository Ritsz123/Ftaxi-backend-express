const mongoose = require('mongoose')

const driverSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true,
        unique: true
    },
    profile_verified: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    vehicle_details: {
        reg_number: String,
        model: String,
        vehicle_verified: {
            type: Boolean,
            default: true
        }
    }
})


const DriverModel = mongoose.model('Driver', driverSchema)

module.exports = DriverModel