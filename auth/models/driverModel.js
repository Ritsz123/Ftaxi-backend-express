const mongoose = require('mongoose')
const addressModel = require('./addressModel')

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
    fcmToken: {
        type: String,
    },
    ride_history: [{
        rider: mongoose.Types.ObjectId,
        source_address: addressModel,
        destination_address: addressModel,
    }],
    vehicle_details: {
        reg_number: String,
        model: String,
        color: String,
        vehicle_verified: {
            type: Boolean,
            default: true
        }
    }
})


const DriverModel = mongoose.model('Driver', driverSchema)

module.exports = DriverModel