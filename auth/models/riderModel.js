const mongoose = require('mongoose')

const addressModel = {
    placeName: String,
    placeId: String,
    latlng: {
        lat: Number,
        lng: Number,
    },
    formatted_place_address: String
};

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
    ride_history: [{
        source_address: addressModel,
        destination_address: addressModel,
    }],
    saved_addresses: [
        addressModel
    ],
})

const RiderModel = mongoose.model('Rider', riderSchema)

module.exports = RiderModel
