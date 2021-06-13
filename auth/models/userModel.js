const mongoose = require('mongoose')

const riderSchema = mongoose.Schema({
    name: String,
    email: String,
    phone: Number,
    password: String,
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
