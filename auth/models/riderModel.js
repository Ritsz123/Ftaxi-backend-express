const mongoose = require('mongoose')

const riderSchema = mongoose.Schema({
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
    password: {
        type: String,
        required: true
    },
    profile_verified: {
        type: Boolean,
        default: false
    },
    saved_addresses: [{
        placeName: String,
        placeId: String,
        latlng: {
            lat: Number,
            lng: Number,
        },
        formattedPlaceAddress: String
    }],
})

const RiderModel = mongoose.model('Rider', riderSchema)

module.exports = RiderModel
