const got = require('got')
const { success, failure } = require('../../response');

const billingMapKey = process.env.GOOGLE_MAP_KEY;

searchPlace = async (req, res) => {
    try {
        const searchQuery = req.query.place;
        if (searchQuery == null) {
            return res.status(400).json(failure('search query not provided'))
        }
        const response = await got(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${searchQuery}&key=${billingMapKey}&sessiontoken=123254251&components=country:in`)
        return res.json(success('ok', JSON.parse(response.body)))
    } catch (err) {
        console.log(err)
        return res.status(500).json(failure(err))
    }
}

placeDetails = async (req, res) => {
    try {
        const placeId = req.query.placeId
        if (placeId == null) {
            return res.status(400).json(failure('Invalid placeId'))
        }

        const response = await got(`https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&key=${billingMapKey}`)
        return res.json(success('ok', JSON.parse(response.body)))
    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

latlngDetails = async (req, res) => {
    try {
        const lat = req.query.lat
        const lng = req.query.lng

        if (lat == null || lng == null) {
            return res.status(400).json(failure('Invalid lat, lng values'));
        }

        const response = await got(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${billingMapKey}`)

        return res.json(success('ok', JSON.parse(response.body)))

    } catch (err) {
        console.log(err)
        return res.status(500).json(err)
    }
}

module.exports = { searchPlace, placeDetails, latlngDetails }