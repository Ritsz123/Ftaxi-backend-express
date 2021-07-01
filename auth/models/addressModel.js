module.exports = {
    placeName: {
        type: String,
        required: true
    },
    placeId: {
        type: String,
        required: true
    },
    latlng: {
        lat: {
            type: Number,
            required: true
        },
        lng: {
            type: Number,
            required: true
        },
    },
    formattedPlaceAddress: {
        type: String,
        required: true
    },
};
